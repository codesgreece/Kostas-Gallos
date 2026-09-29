import {
  Home,
  Leaf,
  Scissors,
  Shield,
  Sprout,
  TreeDeciduous,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  sprout: Sprout,
  scissors: Scissors,
  home: Home,
  leaf: Leaf,
  tree: TreeDeciduous,
  shield: Shield,
};

type ServiceCardProps = {
  title: string;
  description: string;
  icon: keyof typeof ICONS;
};

export default function ServiceCard({
  title,
  description,
  icon,
}: ServiceCardProps) {
  const Icon = ICONS[icon];

  return (
    <article className="group flex h-full flex-col rounded-[1.35rem] border border-green-deep/8 bg-white p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-green-natural/25 hover:shadow-[0_22px_55px_rgba(20,53,40,0.12)] sm:p-7">
      <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-green-mist text-green-deep transition group-hover:bg-green-deep group-hover:text-white">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="font-display text-xl font-semibold text-green-deep">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
        {description}
      </p>
    </article>
  );
}
