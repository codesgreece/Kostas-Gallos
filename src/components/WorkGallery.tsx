import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const WORK_PHOTOS = [
  "/gallery/work-01.jpg",
  "/gallery/work-02.jpg",
  "/gallery/work-03.jpg",
  "/gallery/work-04.jpg",
  "/gallery/work-05.jpg",
  "/gallery/work-06.jpg",
  "/gallery/work-07.jpg",
  "/gallery/work-08.jpg",
] as const;

function BushPhoto({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <figure className="group mx-auto w-full max-w-[14.75rem] sm:max-w-[13.75rem] lg:max-w-[14.25rem]">
      <div className="relative aspect-[4/3] transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1.5">
        <div
          className="absolute inset-[15%] overflow-hidden bg-green-deep/10 shadow-[inset_0_0_24px_rgba(20,53,40,0.12)]"
          style={{ borderRadius: "50%" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 26vw, 220px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            priority={priority}
          />
        </div>

        <Image
          src="/frames/bush-frame.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 48vw, 230px"
          className="pointer-events-none select-none object-contain drop-shadow-[0_12px_24px_rgba(20,53,40,0.16)]"
          aria-hidden
        />
      </div>
    </figure>
  );
}

type WorkGalleryProps = {
  locale: Locale;
};

export default function WorkGallery({ locale }: WorkGalleryProps) {
  const dict = getDictionary(locale);

  return (
    <section
      id="erga"
      className="section-pad relative overflow-hidden bg-cream"
      aria-labelledby="gallery-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 18% 8%, rgba(116,198,157,0.2), transparent 46%), radial-gradient(ellipse at 82% 92%, rgba(201,184,150,0.16), transparent 40%)",
        }}
        aria-hidden
      />

      <div className="container-narrow relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            {dict.gallery.eyebrow}
          </p>
          <h2
            id="gallery-heading"
            className="font-display text-3xl font-semibold text-green-deep sm:text-4xl md:text-[2.6rem]"
          >
            {dict.gallery.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {dict.gallery.intro}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-9">
          {WORK_PHOTOS.map((src, index) => (
            <BushPhoto
              key={src}
              src={src}
              alt={dict.gallery.photoAlts[index] ?? dict.gallery.photoFallback}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
