# Brew & Co

Website for Brew & Co, a neighbourhood coffee shop in Crown Heights, Brooklyn:
home, menu, about, and table reservations. Built with [Next.js](https://nextjs.org)
(App Router) and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other scripts: `npm run build`,
`npm run start`, `npm run lint`.

## Project layout

| Path | What's there |
| --- | --- |
| `src/app/` | Routes: `/` (home), `/menu`, `/about`, plus the reservation server action in `actions/` |
| `src/components/` | Shared UI: header, footer, menu items and tabs, reservation form |
| `src/lib/site.ts` | Shop details, opening hours, and the site photos (`PHOTOS`) |
| `src/lib/menu.ts` | Loads and parses the menu from `docs/menu-items.csv` |
| `docs/menu-items.csv` | The menu: one row per item, including its image and photo credit |
| `docs/design/` | Design system: style guide, tokens, and component specs |
| `public/images/` | Self-hosted, optimised WebP photos |

## Images

All photos are stock images from [Pexels](https://www.pexels.com), downloaded and
served from `public/images/` as WebP. The site doesn't hot-link external images.
The 32 current photos total about 4.2 MB, down from about 62 MB of originals.
`next/image` still generates responsive sizes from these files.

`next.config.ts` only allows local images under `/images/` (`images.localPatterns`),
and no remote hosts are configured.

### Adding or replacing a photo

Use the `optimize-image` script. It lives in `.claude/skills/optimize-image/` as a
Claude Code skill, so you can also ask Claude to "add this photo" and it will run
the script for you. The script downloads the image, fixes its orientation, strips
metadata, resizes it (never upscaling), and writes WebP:

```bash
node .claude/skills/optimize-image/scripts/optimize-image.mjs [name=]<url> [...more] \
  [--width 1600] [--quality 80] [--out public/images] [--force]
```

- Pexels URLs are saved as `pexels-<id>.webp` by default. To choose a name, put
  it before the URL: `menu/latte=https://…`.
- Pick `--width` by how the image is displayed: `2400` for the full-bleed hero,
  `1600` (the default) for half-width photos, and `1200` for menu cards.
- Existing files are skipped unless you pass `--force`. Output outside `public/`
  is refused.

Then reference the file by its public path:

- **Site photos:** add an entry to `PHOTOS` in `src/lib/site.ts`. The
  `pexels(id, slug, alt, subject)` helper builds `/images/pexels-<id>.webp` and
  the credit link.
- **Menu items:** set the `image` column in `docs/menu-items.csv` to
  `/images/pexels-<id>.webp`, and put the Pexels photo page in `image_page`.

Every photo is credited on the About page with a link to its Pexels page, so
always keep that link. See `docs/design/style-guide.md` for the photography
guidelines.

## Deploy

The app deploys to [Vercel](https://vercel.com/new) with no extra configuration.
See the [Next.js deployment docs](https://nextjs.org/docs/app/getting-started/deploying).
