import Link from "next/link";
import { BOOKS } from "@/lib/bible";
import ReaderToolbar from "@/app/components/ReaderToolbar";

export default function Home() {
  const ot = BOOKS.filter((b) => b.testament === "OT");
  const nt = BOOKS.filter((b) => b.testament === "NT");

  return (
    <>
      <ReaderToolbar />
      <main className="reader">
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>KJV Bible Reader</h1>
        <p style={{ opacity: 0.8, marginBottom: 18 }}>
          Simple public-domain Bible reading website.
        </p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <section style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ fontSize: 22 }}>Old Testament</h2>
            <ul>
              {ot.map((b) => (
                <li key={b.slug}>
                  <Link href={`/book/${b.slug}`}>{b.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ fontSize: 22 }}>New Testament</h2>
            <ul>
              {nt.map((b) => (
                <li key={b.slug}>
                  <Link href={`/book/${b.slug}`}>{b.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div style={{ marginTop: 28 }}>
          <Link href="/book/genesis/1">Start reading → Genesis 1</Link>
        </div>
      </main>
    </>
  );
}
