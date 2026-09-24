# Brew & Co — Style Guide

## 1. Subject & brief

Brew & Co is a cosy neighbourhood coffee shop in Brooklyn. It serves specialty
coffee, pastries baked each morning, and light lunches. It also hosts an open mic
every Friday evening and a coffee tasting every Saturday morning. The site has
three pages (Home, Menu, About) and a reserve-a-table form.

**Audience:** locals and visitors deciding whether to drop in, book a table, or
come to Friday's open mic. They want to know what the room feels like, what's on
the menu, when it's open, and what's happening this week.
**Primary job:** make the shop feel like a place you already know, then make
booking a table or finding the next event one tap away.

The original visual reference (`references/1.png`) was a product-launch page for
iced drinks. From it we kept the warm palette, pill buttons, generous rounded
shapes, and a confident left-aligned headline. We dropped the cut-out drinks on
coloured discs, because this brief calls for real photography of a real room.

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `--color-oat` | `#F6EEDD` | Page background: warm, yellowed cream, not pink-cream |
| `--color-cloud` | `#FFFDF8` | Card / surface fill on top of oat |
| `--color-espresso` | `#251811` | Primary text, dark sections, footer |
| `--color-espresso-soft` | `#4A392E` | Secondary text on oat/cloud |
| `--color-amber` | `#C97A2B` | Primary accent: primary CTA fill, active nav, "Popular" badge |
| `--color-amber-dark` | `#9C5C1D` | Amber hover/pressed state; amber used as small text |
| `--color-cherry` | `#A63A44` | Error state only |
| `--color-matcha` | `#55684A` | "House favourite" badge, success/confirmation state |
| `--color-cream-line` | `#E4D8BE` | Hairline borders/dividers on oat |

Rules:
- **Amber is the only brand accent.** It's the colour of roasted beans and
  caramel. It's deliberately more ochre than the common AI-generated terracotta.
- **Cherry and matcha are state colours, not decoration.** Cherry means
  something went wrong. Matcha means "house favourite" or "done". Neither
  appears as a background wash or a random accent.
- Espresso is a warm brown-black, never a tinted `#111`/`#0B0B0B` grey-black.
- No pure black, no pure white surface.

## 3. Type

| Role | Family | Source |
|---|---|---|
| Display (headlines, prices, buttons) | **Bricolage Grotesque** | `next/font/google`, weights 500/600/700 |
| Body / UI (nav, paragraphs, labels) | **Work Sans** | `next/font/google`, weights 400/500/600 |

Bricolage Grotesque has the slightly uneven, hand-painted warmth of a
neighbourhood shopfront sign. At large sizes its ink traps and tight curves give
headlines character without turning into a novelty face. Work Sans stays plain
and legible everywhere else, so the two never compete. Don't add a third family,
and don't use a monospace face for prices or labels. Prices use Bricolage with
`font-variant-numeric: tabular-nums`.

**Scale** (`rem`, 1rem = 16px):

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `--text-display` | 4rem / 2.75rem (mobile) | 0.95 | 600 | Hero headline and page titles (the one `h1` per page) |
| `--text-h1` | 2.5rem | 1.05 | 600 | Section headline, menu category name |
| `--text-h2` | 1.75rem | 1.15 | 600 | Sub-section, dialog title |
| `--text-price` | 1.75rem | 1 | 600 | Featured price |
| `--text-body-lg` | 1.125rem | 1.6 | 400 | Hero paragraph, About story |
| `--text-body` | 1rem | 1.5 | 400 | Default body |
| `--text-label` | 0.875rem | 1.3 | 500 | Nav, meta, buttons |
| `--text-caption` | 0.8125rem | 1.3 | 500 | Badges, fine print, photo credits |

Use sentence case everywhere. No tracked-out uppercase labels, no eyebrow text
above headings, and no meta strings joined with middle dots. Browser tab titles
use a pipe ("Menu | Brew & Co").

Body copy line length: cap paragraph containers at `60ch` (well under 80
characters).

## 4. Layout

Content is left-aligned throughout. Centre alignment is only for standalone
badges and the dialog's confirmation state. Left alignment reads like a menu you
scan top to bottom, and that's how people actually read a café site.

### Hero (home)

```
┌───────────────────────────────────────────────────────────┐
│ [full-bleed photo of the room, espresso gradient from left] │
│  Brew & Co      Home  Menu  About        [Reserve a table]  │
│                                                              │
│  Your corner                                                 │
│  coffee shop.                                                │
│                                                              │
│  Specialty coffee, fresh pastries and                        │
│  light lunches on Franklin Avenue.                           │
│                                                              │
│  [ Reserve a table ]  [ View menu ]                          │
└───────────────────────────────────────────────────────────┘
```

The photo fills the viewport width and about 85vh. A left-to-right espresso
gradient (`--overlay-hero`) sits over it so oat-coloured text passes contrast,
while the right side of the photo stays warm and visible. The hero is the only
place text sits on a photograph.

### Menu page

The menu page is laid out like a printed café menu. A sticky tab bar holds the
category names. Each category has a heading, then rows of items. Each row shows
a small photo, the name, a dotted leader running to the price, and the
description beneath. Two columns on desktop, one on mobile.

```
Espresso drinks
 [img] Latte ·························· $4.75   [img] Mocha ·················· $5.25
       Espresso with steamed milk and…               Espresso, steamed milk and…
```

### Grid & spacing

- 12-column grid, 24px gutter, max content width `1200px`, side padding `24px`
  on mobile and `64px` on desktop.
- Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96` (px). Use the Tailwind
  default scale (`space-1..24`), and don't invent a parallel one.
- Breakpoints: Tailwind defaults (`sm 640` / `md 768` / `lg 1024` / `xl 1280`).

## 5. Shape & elevation

- Radius is **weighted by role**, not uniform:
  - Hero photo: no radius (full-bleed).
  - Content photos: `24px` (`--radius-card`).
  - Menu thumbnails: `12px`.
  - Event date blocks: `16px` (`--radius-date`).
  - Buttons and badges: fully rounded (`9999px`).
  - Inputs: `12px`.
  - Nothing defaults to one "card radius" applied everywhere.
- No generic `rgba(0,0,0,.1)` drop shadow on every card. Use only two shadows,
  both tinted with espresso at low opacity:
  - `--shadow-float`: the open dialog and the sticky tab bar once it's stuck.
  - `--shadow-press`: button active state, inset.
- Hairlines use `--color-cream-line`, `1px`. Only use them where things need
  separating (menu row dividers, nav bottom edge, input fields).

## 6. Motion

There is one orchestrated moment. When the hero loads:

1. The headline rises 12px and fades in (180ms).
2. The paragraph and buttons follow (120ms, 120ms delay).

That's it. No scroll-triggered fades on every section, and no hover-lift on
every card.

Interactive motion is limited to:
- Buttons: 120ms background change and `scale(0.97)` on press. No hover-lift.
- Reservation dialog: fades and scales in from 0.98 (150ms). The backdrop fades.
- `prefers-reduced-motion`: skip the hero sequence and the dialog scale. Keep
  only opacity changes.

## 7. Voice

Active, plain, warm. Say the ingredient, not an adjective. Write like the people
behind the counter.

- Buttons say the action: **Reserve a table**, **Request table**,
  **View menu**. Never "Submit" or "Learn more".
- Menu descriptions are one sentence built from real ingredients.
- Event copy says what happens and when: *"Sign up at the counter from 6:30pm.
  Two songs or five minutes each."*
- Errors say what's wrong and how to fix it: *"Pick a time between 8:00am and
  5:30pm on Saturdays."* No "Oops!"
- The About page is first-person plural ("we") and specific about names, places,
  and years.

## 8. Imagery

- Use real photography from Pexels with backgrounds kept. Warm, natural light,
  wood, ceramics, hands at work. Avoid cold studio shots, flat lays on white, and
  people staring into the camera.
- Every photo has meaningful `alt` text describing what's in it, not "coffee
  image".
- Credit every photo on the About page, linking each one to its Pexels page,
  where the photographer is named. Pexels doesn't require credit, but it's the
  right thing to do. Add the photographer's name next to each link once it's
  been confirmed from the Pexels page. Never guess a name.
- Menu thumbnails are square (`1:1`), cropped to the food or drink. Content
  photos are `4:3` or `3:4`.

## 9. What we deliberately did *not* do

- No tracked-out uppercase eyebrow labels above headings.
- No serif display face. Bricolage carries the personality instead.
- No single shared card-radius-plus-grey-shadow treatment on every surface.
- No monospace for prices or labels.
- No `→` appended to every link or button.
- The accent hex is intentionally not the common `#D97757` "AI coffee brand"
  tell.
- No scroll-reveal animation on every section.

See `tokens.css` for implementation tokens and `components.md` for per-component
specs.
