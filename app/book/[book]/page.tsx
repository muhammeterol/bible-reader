import Link from "next/link";
import { getBookBySlug } from "@/lib/bible";
import { notFound } from "next/navigation";
import ReaderToolbar from "@/app/components/ReaderToolbar";

export default async function BookPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book: bookSlug } = await params;

  const book = getBookBySlug(bookSlug);
  if (!book) return notFound();

  return (
    <>
      <ReaderToolbar />
      <main className="reader">
        <h1 style={{ fontSize: 28 }}>{book.name}</h1>
        <p style={{ opacity: 0.8 }}>Chapters: {book.chapters}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          {Array.from({ length: book.chapters }).map((_, i) => {
            const chap = i + 1;
            return (
              <Link
                key={chap}
                href={`/book/${book.slug}/${chap}`}
                style={{
                  padding: "6px 10px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  textDecoration: "none",
                }}
              >
                {chap}
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
