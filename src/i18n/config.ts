export const locales = ["el", "en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "el";

export const localeLabels: Record<Locale, string> = {
  el: "EL",
  en: "EN",
  de: "DE",
};

export const localeNames: Record<Locale, string> = {
  el: "Ελληνικά",
  en: "English",
  de: "Deutsch",
};

export const htmlLang: Record<Locale, string> = {
  el: "el",
  en: "en",
  de: "de",
};

export const ogLocale: Record<Locale, string> = {
  el: "el_GR",
  en: "en_US",
  de: "de_DE",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
