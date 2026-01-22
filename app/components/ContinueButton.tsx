"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LastRead = { book: string; chapter: number };

export default function ContinueButton() {
  const [last, setLast] = useState<LastRead | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lastRead");
      if (!raw) return;
      const parsed = JSON.parse(raw) as LastRead;
      if (!parsed?.book || !parsed?.chapter) return;
      setLast(parsed);
    } catch {}
  }, []);

  if (!last) return null;

  return (
    <Link className="btn" href={`/book/${last.book}/${last.chapter}`} style={{ textDecoration: "none" }}>
      Continue
    </Link>
  );
}
