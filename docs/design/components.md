# Brew & Co — Component Specs

Token names refer to `tokens.css`. The class names below are illustrative
Tailwind groupings, not required literal class names.

---

## Nav (site header)

**Structure:** wordmark (left), page links (Home, Menu, About), and a
"Reserve a table" button (right). Single row.

- Height `72px`.
  - **Home:** the header sits over the hero photo, with a transparent background
    and oat text.
  - **Other pages:** `--color-oat` background, espresso text, and a
    `--color-cream-line` bottom hairline.
- Links: `--text-label`, weight 500, sentence case.
  - The active link gets a `2px` amber underline offset `6px` below the text,
    not a bolder weight.
  - Set `aria-current="page"` on the active link.
- Reserve button: the Accent button variant, compact height `44px`.
- Mobile (`< 768px`):
  - The header shows the wordmark plus an "Explore" text button. The button
    toggles a sheet that opens under the header, with no animation (style-guide
    §6 keeps motion to buttons and the dialog). The sheet holds the three links
    plus the Reserve button. It's separated by a hairline, not a shadow.
  - The active link in the sheet is underlined in amber, the same as on desktop.
    Colour alone isn't enough.
  - The sheet closes on link tap and on Esc.
  - Don't use an icon-only hamburger. The button says "Explore", or "Close"
    while the sheet is open. Don't label it "Menu": on a café site that means
    the food menu, and it would sit right beside the Menu page link and heading.

---

## Photo hero (home)

- Full-bleed `next/image` with `fill`, `preload`, and `sizes="100vw"`. Height is
  `min(85vh, 760px)`, with a `560px` minimum on mobile.
- `--overlay-hero` gradient on top.
- Content is left-aligned inside the standard max-width container and
  vertically centred slightly below the middle.
  - Headline: `--text-display` / `--text-display-mobile`, weight 600,
    `max-width: 12ch`.
  - Paragraph: `--text-body-lg`, oat text at 90% opacity, `max-width: 40ch`.
  - Buttons: Accent ("Reserve a table") and Ghost-on-dark ("View menu"), `12px`
    gap, wrapping on narrow screens.
- Load motion follows style-guide §6.

---

## Button

All variants are pill-shaped (`--radius-pill`) and use `--font-display` weight
600 at `--text-label` size. Horizontal padding is `24px`. Height is `48px`
(default) or `44px` (compact).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--color-espresso` | `--color-oat` | none | Main action on light backgrounds ("Request table") |
| Accent | `--color-amber` | `--color-espresso` | none | Brand CTA ("Reserve a table") |
| Ghost | transparent | `--color-espresso` | `1px --color-espresso` | Secondary action on light backgrounds |
| Ghost-on-dark | transparent | `--color-oat` | `1px --color-oat` at 60% | Secondary action on photo/espresso backgrounds |

- Accent uses espresso text, not oat. Oat on amber fails WCAG AA at 14px.
- Hover: background shifts one step. Accent goes to `--color-amber-dark` with oat
  text. Primary goes to `--color-espresso-soft`. Ghost fills with
  `--color-cream-line`.
- Press: `transform: scale(0.97)`, `--duration-tap`. No hover-lift.
- Disabled or pending: 60% opacity and `cursor: not-allowed`. The label changes
  to show what's happening ("Requesting…").
- No trailing `→` icons.

---

## Badge

Small pill: `--text-caption`, weight 600, `4px 10px` padding, sentence case.

| Badge | Background | Text |
|---|---|---|
| Popular | `--color-amber` | `--color-espresso` (≈5.2:1) |
| House favourite | `--color-matcha` | `--color-oat` (≈5.3:1) |

Badges use solid fills. Tinted fills (such as amber at 20% with amber-dark text)
drop to about 3.8:1, which fails WCAG AA at caption size.

The CSV value "House Favorite" displays as "House favourite" (sentence case,
UK spelling to match the site copy).

---

## Popular item card (home)

- `4:3` photo with `--radius-card`, name below (`--font-display`, 1.25rem, 600),
  and price on the same line, right-aligned (tabular-nums).
- Description (`--color-espresso-soft`, clamped to 2 lines). No badge. Every
  item in this section is Popular, and the section heading already says so.
- No card background, border, or shadow. The photo carries the card, and the
  text sits on oat.
- Grid: 3 columns on `lg`, 2 on `sm`, 1 on mobile. `32px` column gap, `48px`
  row gap.

---

## Menu category tab bar (menu page)

- `position: sticky; top: 0`, with `--color-oat` background at 95% and
  `backdrop-filter: blur(8px)`.
- It gains `--shadow-float` and a bottom hairline once it's stuck (toggled by an
  IntersectionObserver sentinel).
- Horizontal list of anchor links, one per category. Each has pill padding and
  `--text-label`. The active category gets an espresso background with oat text.
- Scrolls horizontally on mobile with no visible scrollbar. The active tab is
  scrolled into view.
- Sections set `scroll-margin-top` equal to the bar height plus `16px`, so the
  headings aren't hidden under the bar.

---

## Menu item row (menu page)

```
[72×72 img]  Name ·························· $4.75
             One-sentence description…
             [Popular]
```

- Thumbnail: `72px` square (`88px` on `lg`), `12px` radius, `object-cover`.
- Name: `--font-display`, 1.125rem, 600.
- Dot leader: a flex spacer with a `2px` dotted bottom border in
  `--color-espresso-soft` at 30%, aligned to the text baseline. Cream-line
  dots disappear on oat.
- Price: `--font-display`, 600, tabular-nums.
- Description: `--text-body`, `--color-espresso-soft`, full text with no clamp.
- Optional badge below the description.
- Rows are separated by a `1px` `--color-cream-line` divider with `20px` vertical
  padding. Use two columns on `lg` with a `48px` gap, and one column below `lg`.

---

## Event row (home)

```
┌──────┐
│ Fri  │  Open mic night
│  2   │  7:00–10:00pm
│ Oct  │  Sign up at the counter from 6:30pm…
└──────┘
```

- Date block: `72px` wide, `--radius-date` (16px). Use `--color-oat` fill, because the
  events section sits on a cloud tint and a cloud block would disappear into it. Weekday on top
  (`--text-caption`), day number (`--font-display`, 1.75rem, 600), month
  below. Render it as `<time dateTime="YYYY-MM-DD">`.
- Title: `--font-display`, 1.25rem, 600. Time: `--text-label`,
  `--color-amber-dark`. Description: short (one or two sentences), not
  clamped, `--color-espresso-soft`, max `60ch`.
- The list is separated by hairlines. There are no cards.
- The date block uses real dates. That's information, not decoration.

---

## Reservation dialog

- Native `<dialog>` opened with `showModal()`, so it gets focus trapping, Esc to
  close, and inert background for free.
  - Width `min(92vw, 480px)`, `--color-cloud` background, `--radius-card`,
    `--shadow-float`, `24px` padding on mobile and `32px` from `sm`.
  - Backdrop: espresso at 55%.
- Header: title "Reserve a table" (`--text-h2`) and a "Close" text button in the
  top-right corner.
- Fields, stacked with `20px` gaps:
  - Name: text, `autocomplete="name"`.
  - Party size: select, 1–8. A hint below says "For 9 or more, call us at
    (718) 555-0142."
  - Date: `input type="date"`, with `min` set to today (New York time).
  - Time: a select of 30-minute slots within that day's opening hours. It
    updates when the date changes.
- Each input: `48px` tall, `--radius-input`, `1px` `--color-cream-line` border,
  and oat background. Focus shows a `2px` amber outline.
- Errors: cherry border on the field, and the message in `--color-cherry` at
  `--text-caption` directly beneath it. Link the two with `aria-describedby`.
  Include a form-level error summary with `aria-live="polite"`.
- Submit: Primary button, full width, labelled "Request table" ("Requesting…"
  while pending).
- Confirmation: replaces the form in place. It has a matcha check icon and the
  heading "Table requested", then a one-line summary ("Table for 4 on Saturday,
  3 October at 10:30am, under the name Sam."). A note says "We hold requested
  tables for 15 minutes past the time. To change or cancel, call us at …"
  with the phone link. There's a "Done" button that closes the dialog.
- Initial focus goes to the Name field when the dialog opens.
- After a successful request, closing the dialog by any route (Done, Esc, or a
  backdrop click) resets it to a fresh form for the next open.
- When the dialog closes, focus returns to the button that opened it (native
  `<dialog>` behaviour).

---

## Footer

- Full-bleed `--color-espresso` background with oat text. Three columns on
  desktop, stacked on mobile:
  1. Wordmark and a one-line description.
  2. Address and phone (as a `tel:` link).
  3. Opening hours as a definition list.
- Bottom row: "Photos from Pexels" (linking to the About page's credits
  section), plus copyright.

---

## Empty / error states

- Form errors: see Reservation dialog.
- If the menu CSV fails to parse at build time, the build fails loudly. There's
  no runtime empty state for the menu.

---

## Accessibility floor (applies to every component above)

- Every interactive element has a visible focus ring: `2px` `--color-amber`
  outline with `2px` offset. On amber buttons, use an espresso outline instead.
  Never use `outline: none` without a replacement.
- Colour is never the only signal. Badges carry text. Errors carry text. The
  active nav link has an underline plus `aria-current`.
- Contrast:
  - Body text on oat or cloud uses `--color-espresso` or
    `--color-espresso-soft`.
  - Text on the hero photo sits over `--overlay-hero`.
  - Amber is never used for small text on oat. Use `--color-amber-dark` for
    that.
- Respect `prefers-reduced-motion` per style-guide §6.
- Minimum tap target is `44×44px` for all buttons, tabs, and links in the nav.
