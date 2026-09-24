import { readFileSync } from "node:fs";
import path from "node:path";

export type Badge = "Popular" | "House Favorite";

export type MenuItem = {
  category: string;
  name: string;
  description: string;
  price: number;
  badge?: Badge;
  image: string;
  imageAlt: string;
  imagePage: string;
};

export type MenuCategory = {
  name: string;
  label: string;
  slug: string;
  items: MenuItem[];
};

const CSV_PATH = path.join(process.cwd(), "docs", "menu-items.csv");
const COLUMNS = [
  "category",
  "name",
  "description",
  "price",
  "badge",
  "image",
  "image_alt",
  "image_page",
] as const;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  row.push(field);
  if (row.some((value) => value !== "")) rows.push(row);
  return rows;
}

function toBadge(value: string, line: number): Badge | undefined {
  if (value === "") return undefined;
  if (value === "Popular" || value === "House Favorite") return value;
  throw new Error(`menu-items.csv line ${line}: unknown badge "${value}"`);
}

let cache: MenuItem[] | undefined;

export function getMenu(): MenuItem[] {
  if (cache) return cache;

  const [header, ...rows] = parseCsv(readFileSync(CSV_PATH, "utf8"));
  if (header.join(",") !== COLUMNS.join(",")) {
    throw new Error(`menu-items.csv header must be: ${COLUMNS.join(",")}`);
  }

  cache = rows.map((cells, index) => {
    const line = index + 2;
    if (cells.length !== COLUMNS.length) {
      throw new Error(
        `menu-items.csv line ${line}: expected ${COLUMNS.length} columns, got ${cells.length}. Quote any field that contains a comma.`,
      );
    }
    const [category, name, description, price, badge, image, imageAlt, imagePage] =
      cells.map((cell) => cell.trim());
    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice)) {
      throw new Error(`menu-items.csv line ${line}: invalid price "${price}"`);
    }
    return {
      category,
      name,
      description,
      price: parsedPrice,
      badge: toBadge(badge, line),
      image,
      imageAlt,
      imagePage,
    };
  });
  return cache;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getMenuByCategory(): MenuCategory[] {
  const categories = new Map<string, MenuItem[]>();
  for (const item of getMenu()) {
    const items = categories.get(item.category) ?? [];
    items.push(item);
    categories.set(item.category, items);
  }
  return [...categories].map(([name, items]) => ({
    name,
    label: name.charAt(0) + name.slice(1).toLowerCase(),
    slug: slugify(name),
    items,
  }));
}

export function getPopularItems(): MenuItem[] {
  return getMenu().filter((item) => item.badge === "Popular");
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
