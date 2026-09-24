export const SHOP = {
  name: "Brew & Co",
  street: "412 Franklin Avenue",
  neighbourhood: "Crown Heights",
  city: "Brooklyn, NY 11238",
  phoneDisplay: "(718) 555-0142",
  phoneHref: "tel:+17185550142",
  timeZone: "America/New_York",
  founded: 2017,
} as const;

// Minutes after midnight, shop-local time. Index 0 = Sunday.
export type DayHours = { open: number; close: number };

export const HOURS: readonly DayHours[] = [
  { open: 8 * 60, close: 16 * 60 },
  { open: 7 * 60, close: 18 * 60 },
  { open: 7 * 60, close: 18 * 60 },
  { open: 7 * 60, close: 18 * 60 },
  { open: 7 * 60, close: 18 * 60 },
  { open: 7 * 60, close: 22 * 60 },
  { open: 8 * 60, close: 18 * 60 },
];

export const HOURS_SUMMARY = [
  { days: "Monday–Thursday", hours: "7:00am–6:00pm" },
  { days: "Friday", hours: "7:00am–10:00pm" },
  { days: "Saturday", hours: "8:00am–6:00pm" },
  { days: "Sunday", hours: "8:00am–4:00pm" },
] as const;

export type Photo = {
  src: string;
  alt: string;
  page: string;
  subject: string;
};

function pexels(id: number, slug: string, alt: string, subject: string): Photo {
  return {
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`,
    alt,
    page: `https://www.pexels.com/photo/${slug}-${id}/`,
    subject,
  };
}

export const PHOTOS = {
  hero: pexels(
    34896773,
    "bright-cafe-interior-with-large-windows-and-plants",
    "A café with tall black-framed windows, wooden chairs and trailing plants in soft daylight",
    "Café interior",
  ),
  counter: pexels(
    6208924,
    "woman-in-a-fast-food-restaurant",
    "A barista in a denim apron points to the chalkboard menu while a customer orders at a brick-walled counter",
    "The counter",
  ),
  espresso: pexels(
    302898,
    "person-using-espresso-machine",
    "A barista's hand on the portafilter as espresso pours into a white cup",
    "Pulling a shot",
  ),
  roasting: pexels(
    4264047,
    "photo-of-coffee-roasting",
    "Freshly roasted coffee beans tumbling out of a drum roaster into the cooling tray",
    "Roasting",
  ),
  openMic: pexels(
    6670752,
    "photo-of-a-man-singing-while-playing-an-acoustic-guitar",
    "A musician in a mustard sweater sings into a microphone while playing acoustic guitar",
    "Open mic",
  ),
  tasting: pexels(
    34505585,
    "coffee-tasting-setup-with-cups-and-spoons",
    "Cupping bowls of coffee and tasting spoons laid out on a wooden table",
    "Coffee tasting",
  ),
} satisfies Record<string, Photo>;
