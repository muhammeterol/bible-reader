import fs from "node:fs";
import path from "node:path";

export function readChapter(book: string, chapter: number): string | null {
  const filePath = path.join(process.cwd(), "content", "kjv", book, `${chapter}.md`);

  console.log("[readChapter] cwd =", process.cwd());
  console.log("[readChapter] filePath =", filePath);
  console.log("[readChapter] exists =", fs.existsSync(filePath));

  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}
