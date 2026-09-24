import type { Metadata } from "next";
import { MenuItemRow } from "@/components/menu-item";
import { MenuTabs } from "@/components/menu-tabs";
import { getMenuByCategory } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Espresso drinks, cold drinks, pastries baked every morning and sandwiches until close at Brew & Co in Crown Heights, Brooklyn.",
};

export default function MenuPage() {
  const categories = getMenuByCategory();

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-14 lg:px-16 lg:pt-20">
        <h1 className="text-display-mobile font-semibold md:text-display">Menu</h1>
        <p className="mt-5 max-w-[52ch] text-body-lg text-espresso-soft">
          Coffee roasted in small batches, pastries out of the oven by 7am, and sandwiches made to
          order until close. Oat, almond and whole milk are all the same price.
        </p>
      </div>

      <MenuTabs tabs={categories.map(({ slug, label }) => ({ slug, label }))} />

      <div className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-16">
        {categories.map((category) => (
          <section
            key={category.slug}
            id={category.slug}
            aria-labelledby={`${category.slug}-heading`}
            className="scroll-mt-20 pt-14"
          >
            <h2 id={`${category.slug}-heading`} className="text-h1 font-semibold">
              {category.label}
            </h2>
            <ul className="mt-4 grid gap-x-12 lg:grid-cols-2">
              {category.items.map((item) => (
                <MenuItemRow key={item.name} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
