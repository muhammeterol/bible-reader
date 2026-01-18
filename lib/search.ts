import fs from "node:fs";
import path from "node:path";

type SearchResult = {
  book: string;
  chapter: number;
  snippet: string;
};

function listAllChapters(): { book: string; chapter: number; text: string }[] {
  const base = path.join(process.cwd(), "content", "kjv");
  if (!fs.existsSync(base)) return [];

  const docs: { book: string; chapter: number; text: string }[] = [];

  for (const book of fs.readdirSync(base)) {
    const bookDir = path.join(base, book);
    if (!fs.statSync(bookDir).isDirectory()) continue;

    for (const file of fs.readdirSync(bookDir)) {
      if (!file.endsWith(".md")) continue;
      const chapter = Number(file.replace(".md", ""));
      if (!Number.isFinite(chapter)) continue;

      const text = fs.readFileSync(path.join(bookDir, file), "utf8");
      docs.push({ book, chapter, text });
    }
  }

  return docs;
}

export function searchBible(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const doc of listAllChapters()) {
    const hay = doc.text.toLowerCase();
    const idx = hay.indexOf(q);
    if (idx === -1) continue;

    const start = Math.max(0, idx - 70);
    const end = Math.min(doc.text.length, idx + q.length + 70);
    const snippet = doc.text.slice(start, end).replace(/\s+/g, " ").trim();

    results.push({
      book: doc.book,
      chapter: doc.chapter,
      snippet,
    });
  }

  return results.slice(0, 50);
}
