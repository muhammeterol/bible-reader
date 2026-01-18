import Link from "next/link";
import { getBookBySlug } from "@/lib/bible";
import { readChapter } from "@/lib/content";
import { notFound } from "next/navigation";
import ReaderToolbar from "@/app/components/ReaderToolbar";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book: bookSlug, chapter } = await params;

  const book = getBookBySlug(bookSlug);
  if (!book) return notFound();

  const chapNum = Number(chapter);
  if (!Number.isFinite(chapNum) || chapNum < 1 || chapNum > book.chapters) return notFound();

  const text = readChapter(book.slug, chapNum);
  if (!text) return notFound();

  const prev = chapNum > 1 ? chapNum - 1 : null;
  const next = chapNum < book.chapters ? chapNum + 1 : null;

  return (
    <>
      <ReaderToolbar />
      <main className="reader">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <Link href={`/book/${book.slug}`}>← {book.name}</Link>
          <div style={{ display: "flex", gap: 14 }}>
            {prev && <Link href={`/book/${book.slug}/${prev}`}>← Prev</Link>}
            {next && <Link href={`/book/${book.slug}/${next}`}>Next →</Link>}
          </div>
        </div>

        <h1 style={{ fontSize: 26, marginBottom: 12 }}>
          {book.name} {chapNum}
        </h1>

        <article style={{ whiteSpace: "pre-wrap" }}>{text}</article>
      </main>
    </>
  );
}
