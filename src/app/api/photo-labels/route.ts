import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LabelRow = {
  filename: string;
  label: string | null;
  skip: boolean;
};

function adminTokenMatches(request: Request) {
  const expected = process.env.PHOTO_LABEL_ADMIN_TOKEN || "";
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!expected || !supplied) return false;
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVER_KEY;
  return url && key ? { url, key } : null;
}

function serviceHeaders(key: string, extra: Record<string, string> = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function editingIsOpen() {
  return process.env.PHOTO_LABELS_OPEN_FOR_EDIT === "true";
}

export async function GET() {
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ error: "Photo labels are not configured." }, { status: 503 });

  try {
    const response = await fetch(
      `${config.url}/rest/v1/bakery_photo_labels?select=filename,label,skip,updated_at`,
      { headers: serviceHeaders(config.key), cache: "no-store" },
    );
    if (!response.ok) return NextResponse.json({ error: "Could not load saved photo labels." }, { status: 502 });

    const rows = (await response.json()) as LabelRow[];
    const labels = Object.fromEntries(
      rows.map((row) => [row.filename, row.skip ? "__skip__" : row.label || ""]),
    );
    return NextResponse.json(
      { labels, editingOpen: editingIsOpen() },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json({ error: "Could not load saved photo labels." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!editingIsOpen() && !adminTokenMatches(request)) {
    return NextResponse.json({ error: "Admin access token is incorrect." }, { status: 401 });
  }

  let body: { action?: string; filename?: string; label?: string | null; skip?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.action === "verify") return NextResponse.json({ ok: true, editingOpen: editingIsOpen() });

  const filename = body.filename || "";
  if (!/^repo-(0[1-9]|[1-4][0-9]|5[0-2])\.jpg$/.test(filename)) {
    return NextResponse.json({ error: "Unknown photo filename." }, { status: 400 });
  }

  const label = typeof body.label === "string" ? body.label.trim() : "";
  const skip = body.skip === true;
  if (!skip && label.length > 120) {
    return NextResponse.json({ error: "Labels must be 120 characters or fewer." }, { status: 400 });
  }

  const config = supabaseConfig();
  if (!config) return NextResponse.json({ error: "Photo labels are not configured." }, { status: 503 });

  try {
    if (!skip && !label) {
      const query = new URLSearchParams({ filename: `eq.${filename}` });
      const response = await fetch(`${config.url}/rest/v1/bakery_photo_labels?${query}`, {
        method: "DELETE",
        headers: serviceHeaders(config.key, { Prefer: "return=minimal" }),
        cache: "no-store",
      });
      if (!response.ok) return NextResponse.json({ error: "Could not clear this photo label." }, { status: 502 });
      return NextResponse.json({ ok: true });
    }

    const response = await fetch(`${config.url}/rest/v1/bakery_photo_labels?on_conflict=filename`, {
      method: "POST",
      headers: serviceHeaders(config.key, { Prefer: "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify({
        filename,
        label: skip ? null : label,
        skip,
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Could not save this photo label." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save this photo label." }, { status: 502 });
  }
}
