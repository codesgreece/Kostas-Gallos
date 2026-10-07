export const SITE = {
  phone: "6943070267",
  phoneDisplay: "694 307 0267",
  phoneHref: "tel:6943070267",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kostaskipoi.vercel.app",
} as const;

export const NAV_HREFS = [
  { href: "#ypiresies", key: "services" },
  { href: "#empeiria", key: "experience" },
  { href: "#giati-emas", key: "whyUs" },
  { href: "#diadikasia", key: "process" },
  { href: "#epikoinonia", key: "contact" },
] as const;
