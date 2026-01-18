"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

export default function ReaderToolbar() {
  const [theme, setTheme] = useState<Theme>("light");
  const [fontScale, setFontScale] = useState<number>(1);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme | null) ?? "light";
    const savedScale = Number(localStorage.getItem("fontScale") ?? "1");

    setTheme(savedTheme);
    setFontScale(Number.isFinite(savedScale) ? savedScale : 1);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontScale", String(fontScale));
  }, [theme, fontScale]);

  const isDark = theme === "dark";
  const scaleLabel = useMemo(() => `${Math.round(fontScale * 100)}%`, [fontScale]);

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <Link className="brand" href="/" style={{ textDecoration: "none" }}>
          KJV Reader
        </Link>
      </div>

      <div className="toolbar-right">
        <Link className="btn" href="/search" style={{ textDecoration: "none" }}>
          Search
        </Link>

        <button
          className="btn"
          onClick={() => setFontScale((s) => Math.max(0.85, Math.round((s - 0.1) * 100) / 100))}
          aria-label="Decrease font size"
          type="button"
        >
          A-
        </button>

        <span className="pill" aria-label="Font scale">
          {scaleLabel}
        </span>

        <button
          className="btn"
          onClick={() => setFontScale((s) => Math.min(1.6, Math.round((s + 0.1) * 100) / 100))}
          aria-label="Increase font size"
          type="button"
        >
          A+
        </button>

        <button className="btn" onClick={() => setTheme(isDark ? "light" : "dark")} type="button">
          {isDark ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
}
