#!/usr/bin/env node
// Download images from URLs, resize them for the web, and save them as WebP
// under public/ so the site can serve them locally.
//
// Usage:
//   node .claude/skills/optimize-image/scripts/optimize-image.mjs [name=]<url> [...more]
//     [--width 1600] [--quality 80] [--out public/images] [--force]

import { existsSync } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const USAGE = `Usage: optimize-image.mjs [name=]<url> [...more] [options]

Options:
  --width <px>     Max output width; smaller images are never upscaled (default 1600)
  --quality <n>    WebP quality, 1-100 (default 80)
  --out <dir>      Output directory, must be inside public/ (default public/images)
  --force          Overwrite files that already exist
  --help           Show this message

A name may include subfolders (e.g. "menu/latte=https://…"). Without one, Pexels URLs
become "pexels-<id>" and other URLs use their slugified file name.`;

const CONCURRENCY = 4;
// Project root, four levels up from .claude/skills/optimize-image/scripts/.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const PUBLIC_DIR = path.join(ROOT, "public");

function parseArgs(argv) {
  const opts = { width: 1600, quality: 80, out: "public/images", force: false, jobs: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const value = () => {
      const next = argv[++i];
      if (next === undefined) throw new Error(`${arg} needs a value`);
      return next;
    };
    switch (arg) {
      case "--width":
        opts.width = Number(value());
        break;
      case "--quality":
        opts.quality = Number(value());
        break;
      case "--out":
        opts.out = value();
        break;
      case "--force":
        opts.force = true;
        break;
      case "--help":
      case "-h":
        opts.help = true;
        break;
      default:
        if (arg.startsWith("--")) throw new Error(`Unknown option ${arg}`);
        opts.jobs.push(parseJob(arg));
    }
  }
  if (!Number.isInteger(opts.width) || opts.width < 1) throw new Error("--width must be a positive integer");
  if (!Number.isInteger(opts.quality) || opts.quality < 1 || opts.quality > 100) {
    throw new Error("--quality must be an integer from 1 to 100");
  }
  return opts;
}

// "menu/latte=https://…" → { url, name: "menu/latte" }. The name goes first
// because URLs can contain "=" in their query string.
function parseJob(arg) {
  const match = arg.match(/^([\w-]+(?:\/[\w-]+)*)=(https?:\/\/.+)$/);
  const url = match ? match[2] : arg;
  try {
    new URL(url);
  } catch {
    throw new Error(`Not a valid URL: ${url}`);
  }
  return { url, name: match ? match[1] : defaultName(url) };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function defaultName(url) {
  const { hostname, pathname } = new URL(url);
  const pexelsId = hostname.endsWith("pexels.com") && pathname.match(/\/photos\/(\d+)\//);
  if (pexelsId) return `pexels-${pexelsId[1]}`;
  const base = path.posix.basename(pathname).replace(/\.[a-z0-9]+$/i, "");
  return slugify(base) || "image";
}

function resolveOutput(outDir, name) {
  const file = path.resolve(ROOT, outDir, `${name}.webp`);
  const rel = path.relative(PUBLIC_DIR, file);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`Output ${file} is outside public/`);
  }
  return { file, publicPath: "/" + rel.split(path.sep).join("/") };
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function processJob(job, opts) {
  const { file, publicPath } = resolveOutput(opts.out, job.name);
  const display = path.relative(ROOT, file).split(path.sep).join("/");

  if (!opts.force && existsSync(file)) {
    return `skip  ${display} already exists (use --force to overwrite) → ${publicPath}`;
  }

  const res = await fetch(job.url, { headers: { "User-Agent": "Mozilla/5.0 (optimize-image)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) throw new Error(`Not an image (content-type: ${type || "none"})`);
  const input = Buffer.from(await res.arrayBuffer());

  await mkdir(path.dirname(file), { recursive: true });
  const info = await sharp(input)
    .rotate()
    .resize({ width: opts.width, withoutEnlargement: true })
    .webp({ quality: opts.quality, effort: 5 })
    .toFile(file);
  const { size } = await stat(file);

  return `ok    ${display}  (${info.width}×${info.height}, ${kb(input.length)} → ${kb(size)}) → ${publicPath}`;
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`Error: ${err.message}\n\n${USAGE}`);
    process.exit(2);
  }
  if (opts.help || opts.jobs.length === 0) {
    console.log(USAGE);
    process.exit(opts.help ? 0 : 2);
  }

  let failures = 0;
  const queue = [...opts.jobs];
  const worker = async () => {
    for (let job = queue.shift(); job; job = queue.shift()) {
      try {
        console.log(await processJob(job, opts));
      } catch (err) {
        failures++;
        console.error(`fail  ${job.url}: ${err.message}`);
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, opts.jobs.length) }, worker));

  const done = opts.jobs.length - failures;
  console.log(`\n${done}/${opts.jobs.length} image(s) ready.`);
  if (failures) process.exit(1);
}

main();
