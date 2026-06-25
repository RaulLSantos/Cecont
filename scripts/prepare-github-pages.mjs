import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const docsDir = path.join(rootDir, "docs");

if (!existsSync(path.join(distDir, "index.html"))) {
  throw new Error("dist/index.html nao encontrado. Rode npm run build antes de preparar o GitHub Pages.");
}

rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });
cpSync(distDir, docsDir, { recursive: true });

const pagesIndex = path.join(docsDir, "index.html");
const indexHtml = readFileSync(pagesIndex, "utf8").replace(
  /<meta name="robots" content="[^"]*" \/>/,
  '<meta name="robots" content="noindex, nofollow" />'
);

writeFileSync(pagesIndex, indexHtml);
writeFileSync(path.join(docsDir, "404.html"), indexHtml);
writeFileSync(path.join(docsDir, ".nojekyll"), "");
writeFileSync(path.join(docsDir, "robots.txt"), "User-agent: *\nDisallow: /\n");

console.log("GitHub Pages pronto em docs/. Configure Pages para main / docs.");
