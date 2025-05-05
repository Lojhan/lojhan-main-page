import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";

const locales = ["en-US", "pt-BR"];
const defaultLocale = "pt-BR";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers }).languages();
  const language = match(languages, locales, defaultLocale);
  return language;
}

function isFilePath(pathname: string) {
  return (
    pathname.includes(".svg") ||
    pathname.includes(".png") ||
    pathname.includes(".jpg")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isFilePath(pathname)) {
    // Skip if the pathname is a file
    return;
  }

  const pathnameHasLocale = locales.some((locale) => pathname.includes(locale));

  if (pathnameHasLocale) return;

  const languageCookie = request.cookies.get("language");

  if (languageCookie) {
    const locale = languageCookie.value;
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config: MiddlewareConfig = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // skip all files
    "/((?!.*\\..*))",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
