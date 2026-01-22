"use client";

import { useEffect } from "react";

export default function MarkLastRead({ book, chapter }: { book: string; chapter: number }) {
  useEffect(() => {
    try {
      localStorage.setItem("lastRead", JSON.stringify({ book, chapter }));
    } catch {
      // ignore
    }
  }, [book, chapter]);

  return null;
}
