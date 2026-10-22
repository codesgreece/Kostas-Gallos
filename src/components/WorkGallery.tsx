import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getPhotos, photoAltForLocale } from "@/lib/photos";

function GalleryPhoto({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const isRemote = src.startsWith("http");

  return (
    <figure className="group w-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-green-deep/10 shadow-[0_14px_36px_rgba(20,53,40,0.12)] transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 260px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority={priority}
          unoptimized={isRemote}
        />
      </div>
    </figure>
  );
}

type WorkGalleryProps = {
  locale: Locale;
};

export default async function WorkGallery({ locale }: WorkGalleryProps) {
  const dict = getDictionary(locale);
  const photos = await getPhotos();

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

        {photos.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {photos.map((photo, index) => (
              <GalleryPhoto
                key={photo.id}
                src={photo.src}
                alt={photoAltForLocale(
                  photo,
                  locale,
                  dict.gallery.photoFallback,
                )}
                priority={index < 2}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-muted">{dict.gallery.photoFallback}</p>
        )}
      </div>
    </section>
  );
}
