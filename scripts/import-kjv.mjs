import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "content", "source", "kjv.txt");
const OUT = path.join(process.cwd(), "content", "kjv");

if (!fs.existsSync(SRC)) {
  console.error("Missing source file:", SRC);
  process.exit(1);
}

const raw = fs.readFileSync(SRC, "utf8");

// Expected line format example:
// "Genesis 1:1 In the beginning..."
// "Genesis 1:2 And the earth..."
// "Matthew 5:3 Blessed are..."
const lineRe = /^([1-3]?\s?[A-Za-z]+(?:\s[A-Za-z]+)*)\s+(\d+):(\d+)\s+(.*)$/;

function slugifyBook(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ /g, "_");
}

const map = new Map(); // key: bookSlug|chapter -> verse lines
let parsed = 0;

for (const line of raw.split(/\r?\n/)) {
  const m = line.match(lineRe);
  if (!m) continue;

  const bookName = m[1].trim();
  const chapter = Number(m[2]);
  const verse = Number(m[3]);
  const text = m[4].trim();

  const bookSlug = slugifyBook(bookName);
  const key = `${bookSlug}|${chapter}`;

  if (!map.has(key)) map.set(key, []);
  map.get(key).push(`${verse} ${text}`);
  parsed++;
}

if (parsed < 1000) {
  console.warn("Parsed lines seems low:", parsed);
  console.warn("Your txt format might differ. Share 10 sample lines and I’ll adapt the parser.");
}

fs.mkdirSync(OUT, { recursive: true });

for (const [key, verses] of map.entries()) {
  const [bookSlug, chStr] = key.split("|");
  const chapter = Number(chStr);

  const bookDir = path.join(OUT, bookSlug);
  fs.mkdirSync(bookDir, { recursive: true });

  const filePath = path.join(bookDir, `${chapter}.md`);
  fs.writeFileSync(filePath, verses.join("\n") + "\n", "utf8");
}

console.log("Done.");
console.log("Chapters created:", map.size);
