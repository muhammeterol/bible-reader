import { NextResponse } from "next/server";
import { searchBible } from "@/lib/search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const results = searchBible(q);

  return NextResponse.json({ q, results });
}
