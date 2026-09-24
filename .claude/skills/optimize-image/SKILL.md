---
name: optimize-image
description: Download an image from a URL, resize it for the web, convert it to WebP, and save it under public/ so the site serves it locally. Use when adding or replacing a photo on the site, when given a Pexels/Unsplash/stock image URL, or when asked to download, optimise, localise, self-host, compress, or convert an image to webp.
allowed-tools: Bash(node .claude/skills/optimize-image/scripts/optimize-image.mjs:*)
---

# Optimize image

Brew & Co serves all photography from `public/images/` as WebP instead of
hot-linking stock sites. This skill wraps a script that downloads each image,
fixes its orientation, strips metadata, resizes it (it never upscales), and
writes a WebP file.

## Run it

From the project root:

```bash
node .claude/skills/optimize-image/scripts/optimize-image.mjs [name=]<url> [...more] [options]
```

| Option            | Default         | Notes                                               |
| ----------------- | --------------- | --------------------------------------------------- |
| `--width <px>`    | `1600`          | Max output width. Height keeps the aspect ratio.    |
| `--quality <n>`   | `80`            | WebP quality, 1–100.                                |
| `--out <dir>`     | `public/images` | Must be inside `public/`. Others are refused.       |
| `--force`         |                 | Overwrite existing files. Without it they're skipped. |

Pass several URLs in one call to process them in parallel. Options apply to
every URL in that call, so group images by width.

### Naming

- Pexels URLs default to `pexels-<id>`, e.g.
  `https://images.pexels.com/photos/302898/pexels-photo-302898.jpeg` becomes
  `public/images/pexels-302898.webp`. Prefer this default for Pexels. It's
  stable and matches the `pexels()` helper in `src/lib/site.ts`.
- Other URLs default to their slugified file name.
- To set a name, put it before the URL: `menu/latte=https://…`. Subfolders are
  allowed.

### Choosing a width

Choose the width from how the image is displayed (its `sizes` prop).
`next/image` still generates smaller variants from this file, so it only needs
to be as large as the biggest one it will serve.

| Usage                                           | `--width` |
| ----------------------------------------------- | --------- |
| Full-bleed hero (`sizes="100vw"`)               | `2400`    |
| Half-width / story photos (`50vw`)              | `1600`    |
| Menu cards and thumbnails (≤ 360px)             | `1200`    |

## Output

Each image prints one line, e.g.:

```
ok    public/images/pexels-302898.webp  (1600×1068, 1244 KB → 57 KB) → /images/pexels-302898.webp
```

The last path is the `src` to use in code. Lines start with `skip` if the file
already exists and `fail` on errors: a non-2xx response, a response that isn't
an image, or an output path outside `public/`. The script exits with 1 if any
image failed. The rest are still written.

## After running

1. Point the code at the local path: `PHOTOS` in `src/lib/site.ts` (via the
   `pexels()` helper) or the `image` column of `docs/menu-items.csv`.
2. Keep the Pexels photo page link (`page` / `image_page`). The style guide
   requires crediting every photo on the About page, with the photographer's
   name confirmed from the Pexels page.
3. Don't add remote hosts to `images.remotePatterns` in `next.config.ts`.
   Local images must sit under `/images/`, which `images.localPatterns` allows.
4. Commit the generated `.webp` files. They are served straight from `public/`.
