import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret || !token) {
      return NextResponse.json({ ok: true, score: 1, skipped: true });
    }
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = await res.json();
    const score = typeof data.score === "number" ? data.score : 1;
    const ok = !!data.success && score >= 0.5;
    return NextResponse.json({ ok, score });
  } catch {
    return NextResponse.json({ ok: true, score: 1, skipped: true });
  }
}
