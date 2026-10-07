"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  localeLabels,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";

type LanguagePillProps = {
  locale: Locale;
  solid: boolean;
};

export default function LanguagePill({ locale, solid }: LanguagePillProps) {
  const router = useRouter();
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [ready, setReady] = useState(false);

  const activeIndex = Math.max(0, locales.indexOf(locale));

  useLayoutEffect(() => {
    const button = btnRefs.current[activeIndex];
    const list = listRef.current;
    if (!button || !list) return;

    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setIndicator({
      left: buttonRect.left - listRect.left,
      width: buttonRect.width,
    });
    setReady(true);
  }, [activeIndex, solid]);

  useEffect(() => {
    const onResize = () => {
      const button = btnRefs.current[activeIndex];
      const list = listRef.current;
      if (!button || !list) return;
      const listRect = list.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      setIndicator({
        left: buttonRect.left - listRect.left,
        width: buttonRect.width,
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  function switchLocale(next: Locale) {
    if (next === locale) return;

    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = next;
    }
    const nextPath = segments.join("/") || `/${next}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(nextPath);
  }

  return (
    <div
      ref={listRef}
      role="group"
      aria-label="Language"
      className={`lang-pill relative inline-flex items-center rounded-full p-1 ${
        solid
          ? "border border-green-deep/12 bg-green-deep/5"
          : "border border-white/25 bg-white/10 backdrop-blur-md"
      }`}
    >
      <span
        aria-hidden
        className={`lang-pill-indicator absolute top-1 bottom-1 rounded-full shadow-sm ${
          solid ? "bg-green-deep" : "bg-white"
        } ${ready ? "opacity-100" : "opacity-0"}`}
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.left}px)`,
        }}
      />

      {locales.map((code, index) => {
        const active = code === locale;
        return (
          <button
            key={code}
            ref={(node) => {
              btnRefs.current[index] = node;
            }}
            type="button"
            onClick={() => switchLocale(code)}
            aria-pressed={active}
            aria-label={localeNames[code]}
            title={localeNames[code]}
            className={`relative z-10 min-w-9 rounded-full px-2.5 py-1.5 text-[0.7rem] font-bold tracking-[0.08em] transition-colors duration-300 ${
              active
                ? solid
                  ? "text-white"
                  : "text-green-deep"
                : solid
                  ? "text-green-deep/55 hover:text-green-deep"
                  : "text-white/70 hover:text-white"
            }`}
          >
            {localeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
