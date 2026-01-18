"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReaderToolbar from "@/app/components/ReaderToolbar";

type Result = {
  book: string;
  chapter: number;
  snippet: string;
};

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const canSearch = useMemo(() => q.trim().length >= 2, [q]);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!canSearch) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(t);
  }, [q, canSearch]);

  return (
    <>
      <ReaderToolbar />
      <main className="reader">
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Search</h1>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a word… (e.g., light)"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--fg)",
            outline: "none",
          }}
        />

        <div style={{ marginTop: 10, opacity: 0.8, fontSize: 14 }}>
          {loading ? "Searching…" : canSearch ? `${results.length} result(s)` : "Type at least 2 characters"}
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          {results.map((r, idx) => (
            <Link
              key={`${r.book}-${r.chapter}-${idx}`}
              href={`/book/${r.book}/${r.chapter}`}
              style={{
                textDecoration: "none",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 12,
                background: "var(--card)",
                display: "block",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {r.book.toUpperCase()} {r.chapter}
              </div>
              <div style={{ opacity: 0.85 }}>{r.snippet}</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
