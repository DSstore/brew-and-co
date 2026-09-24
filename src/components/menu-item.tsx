import Image from "next/image";
import { Badge } from "@/components/badge";
import { formatPrice, type MenuItem } from "@/lib/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-cream-line">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p className="font-display text-xl font-semibold tabular-nums">{formatPrice(item.price)}</p>
      </div>
      <p className="mt-1.5 line-clamp-2 text-body text-espresso-soft">{item.description}</p>
    </article>
  );
}

export function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex gap-4 border-b border-cream-line py-5 lg:gap-5">
      <div className="relative size-18 shrink-0 overflow-hidden rounded-thumb bg-cream-line lg:size-22">
        <Image src={item.image} alt={item.imageAlt} fill sizes="88px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-4px] border-b-2 border-dotted border-espresso-soft/30" />
          <p className="font-display text-lg font-semibold tabular-nums">{formatPrice(item.price)}</p>
        </div>
        <p className="mt-1 text-body text-espresso-soft">{item.description}</p>
        {item.badge && (
          <div className="mt-2">
            <Badge value={item.badge} />
          </div>
        )}
      </div>
    </li>
  );
}
