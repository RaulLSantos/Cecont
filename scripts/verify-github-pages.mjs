import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(rootDir, "docs");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(absolutePath);
    return absolutePath;
  });
}

function assertNoForbiddenFiles(targetDir) {
  const forbiddenSegments = new Set([
    ".git",
    ".env",
    ".agents",
    ".codex",
    ".vs",
    "node_modules",
    "src",
    "components",
    "lib",
    "scripts",
    "private-keys",
    "deploy-keys"
  ]);
  const forbiddenExtensions = [".pem", ".key", ".p12", ".pfx", ".crt", ".ts", ".tsx", ".map"];

  for (const filePath of walk(targetDir)) {
    const relative = path.relative(targetDir, filePath);
    const parts = relative.split(path.sep);
    parts.forEach((part) => assert.ok(!forbiddenSegments.has(part), `Arquivo interno publicado em docs: ${relative}`));
    assert.ok(!forbiddenExtensions.some((extension) => relative.endsWith(extension)), `Arquivo sensivel em docs: ${relative}`);
  }
}

function assertRelativeBuildPaths() {
  const indexHtml = readFileSync(path.join(docsDir, "index.html"), "utf8");
  const rootAbsoluteRefs = [...indexHtml.matchAll(/\b(?:src|href)=["']\/(?!\/)/g)];
  assert.equal(rootAbsoluteRefs.length, 0, "docs/index.html contem src/href absoluto iniciado por /");

  const cssFiles = walk(path.join(docsDir, "assets")).filter((filePath) => filePath.endsWith(".css"));
  cssFiles.forEach((filePath) => {
    const css = readFileSync(filePath, "utf8");
    assert.equal([...css.matchAll(/url\(\s*\/(?!\/)/g)].length, 0, `CSS do Pages contem url absoluto: ${path.basename(filePath)}`);
  });
}

assert.ok(existsSync(path.join(docsDir, "index.html")), "docs/index.html nao existe");
assert.ok(existsSync(path.join(docsDir, "404.html")), "docs/404.html nao existe");
assert.ok(existsSync(path.join(docsDir, ".nojekyll")), "docs/.nojekyll nao existe");
assert.ok(existsSync(path.join(docsDir, "assets")), "docs/assets nao existe");
assert.ok(existsSync(path.join(docsDir, "robots.txt")), "docs/robots.txt nao existe");

const indexHtml = readFileSync(path.join(docsDir, "index.html"), "utf8");
const robotsTxt = readFileSync(path.join(docsDir, "robots.txt"), "utf8");

assert.match(indexHtml, /<meta name="robots" content="noindex, nofollow" \/>/, "GitHub Pages deve ser noindex");
assert.match(robotsTxt, /Disallow: \//, "robots.txt do Pages deve bloquear indexacao");

assertNoForbiddenFiles(docsDir);
assertRelativeBuildPaths();

const files = walk(docsDir)
  .map((filePath) => ({
    relative: path.relative(docsDir, filePath).replaceAll(path.sep, "/"),
    size: statSync(filePath).size
  }))
  .sort((a, b) => b.size - a.size);

console.log("GitHub Pages docs/ validado.");
console.log("Maiores arquivos em docs/:");
files.slice(0, 8).forEach((file) => {
  console.log(`- ${file.relative}: ${(file.size / 1024).toFixed(1)} KB`);
});
