import { NextResponse } from "next/server";

function normalizeName(input: unknown) {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (trimmed.length < 2) return null;
  return trimmed;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | { name?: unknown };
  const name = normalizeName(body?.name);

  if (!name) {
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("wealthup_name", name, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("wealthup_name", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
