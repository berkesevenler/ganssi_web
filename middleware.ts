import { NextRequest, NextResponse } from 'next/server';
import { countryToLanguage, DEFAULT_LANGUAGE } from './utils/location';

// List of supported languages
const supportedLanguages = ['en', 'tr', 'de', 'es', 'ar', 'zh'];

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameHasLocale = supportedLanguages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Get the country code from the request headers
  const country = request.geo?.country || 'US';
  
  // Get the preferred language from the country
  const preferredLanguage = countryToLanguage[country] || DEFAULT_LANGUAGE;

  // Create the new URL with the preferred language
  const newUrl = new URL(`/${preferredLanguage}${pathname}`, request.url);
  
  // Copy over the search params
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}; 