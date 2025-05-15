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
  const regex = /\.(svg|png|jpg|webp)$/;
  return regex.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isFilePath(pathname)) {
    // Skip if the pathname is a file
    return NextResponse.next();
  }

  addLocaleToPath(request);
  addDefaultPathToContent(request);

  if (request.nextUrl.pathname === pathname) {
    // nothing changed
    return NextResponse.next();
  }

  return NextResponse.redirect(request.nextUrl);
}

function addLocaleToPath(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some((locale) => pathname.includes(locale));
  if (pathnameHasLocale) return;

  const languageCookie = request.cookies.get("language");

  if (languageCookie) {
    const locale = languageCookie.value;
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
}

function addDefaultPathToContent(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.includes("/content")) {
    // Skip if the pathname is not a content path
    return;
  }

  const pathParts = pathname.split("/");

  if (pathParts.length <= 0) {
    // Skip if the pathname is empty, this should not happen anyway
    return;
  }

  if (!pathParts.at(-1)?.includes(".md")) {
    // Fallback to README.md if no file is specified
    pathParts.push("README.md");
    request.nextUrl.pathname = `${pathParts.join("/")}`;
  }
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
