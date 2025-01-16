import "server-only";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest } from "next/server";

export const defaultLocale = "de";
export const locales = ["en", "de"] as const;
export type ValidLocale = (typeof locales)[number];

export const dictionaries = {
  en: () => import("./dictionaries/en").then((module) => module.dict),
  de: () => import("./dictionaries/de").then((module) => module.dict),
};

export const getDictionary = async (locale: ValidLocale) => {
  return dictionaries[locale]();
};

export function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Negotiator.Headers = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const localeMatch = matchLocale(languages, locales, defaultLocale);

  return localeMatch;
}

export type Dictionary = Awaited<ReturnType<typeof dictionaries.de>>;

export type LangParam = Promise<{ lang: ValidLocale }>;
