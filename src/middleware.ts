import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const name = req.cookies.get("wealthup_name")?.value;
  if (name) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", `${req.nextUrl.pathname}${req.nextUrl.search}`);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/roadmap/:path*"],
};
