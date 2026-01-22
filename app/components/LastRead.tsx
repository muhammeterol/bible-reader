"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBookNameBySlug } from "@/lib/bible";

type LastRead = { book: string; chapter: number };

export default function LastRead() {
  const [last, setLast] = useState<LastRead | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lastRead");
      if (!raw) return;
      const parsed = JSON.parse(raw) as LastRead;
      if (!parsed?.book || !parsed?.chapter) return;
      setLast(parsed);
    } catch {
      // ignore
    }
  }, []);

  if (!last) return null;

  return (
    <div
      style={{
        marginTop: 18,
        padding: 14,
        border: "1px solid var(--border)",
        borderRadius: 14,
        background: "var(--card)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Continue reading</div>
      <div style={{ opacity: 0.85, marginBottom: 10 }}>
        {getBookNameBySlug(last.book)} {last.chapter}
      </div>
      <Link
        className="btn"
        href={`/book/${last.book}/${last.chapter}`}
        style={{ textDecoration: "none", display: "inline-block" }}
      >
        Open
      </Link>
    </div>
  );
}
