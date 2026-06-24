import assert from "node:assert/strict";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const simRoot = path.join(rootDir, ".deploy-sim");
const publicHtmlDir = path.join(simRoot, "public_html");
const cecontDir = path.join(publicHtmlDir, "cecont");
const neighborDirs = ["maypam", "sharkgym", "outroprojeto"];

function readProjectFile(filePath) {
  return readFileSync(path.join(rootDir, filePath), "utf8");
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(absolutePath);
    return absolutePath;
  });
}

function assertInsideRoot(targetPath, expectedRoot) {
  const relative = path.relative(expectedRoot, targetPath);
  assert.ok(relative && !relative.startsWith("..") && !path.isAbsolute(relative), `${targetPath} fora da area segura`);
}

function clearOnlyCecontDeployDir() {
  assertInsideRoot(cecontDir, simRoot);
  assert.equal(path.basename(cecontDir), "cecont", "A simulacao so pode limpar a pasta cecont");
  mkdirSync(cecontDir, { recursive: true });

  for (const child of readdirSync(cecontDir)) {
    const childPath = path.join(cecontDir, child);
    assertInsideRoot(childPath, cecontDir);
    rmSync(childPath, { recursive: true, force: true });
  }
}

function copyDistToDeployDir() {
  for (const child of readdirSync(distDir)) {
    cpSync(path.join(distDir, child), path.join(cecontDir, child), { recursive: true });
  }
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
  const forbiddenExtensions = [".pem", ".key", ".p12", ".pfx", ".crt", ".ts", ".tsx"];

  for (const filePath of walk(targetDir)) {
    const relative = path.relative(targetDir, filePath);
    const parts = relative.split(path.sep);
    parts.forEach((part) => assert.ok(!forbiddenSegments.has(part), `Arquivo interno publicado: ${relative}`));
    assert.ok(!forbiddenExtensions.some((extension) => relative.endsWith(extension)), `Arquivo sensivel publicado: ${relative}`);
    assert.ok(!relative.endsWith(".map"), `Source map nao deve ser publicado: ${relative}`);
  }
}

function assertRelativeBuildPaths() {
  const indexHtml = readFileSync(path.join(distDir, "index.html"), "utf8");
  const rootAbsoluteAssetRefs = [...indexHtml.matchAll(/\b(?:src|href)=["']\/(?!\/)/g)];
  assert.equal(rootAbsoluteAssetRefs.length, 0, "Build contem src/href absoluto iniciado por /");

  const cssFiles = walk(path.join(distDir, "assets")).filter((filePath) => filePath.endsWith(".css"));
  cssFiles.forEach((filePath) => {
    const css = readFileSync(filePath, "utf8");
    assert.equal([...css.matchAll(/url\(\s*\/(?!\/)/g)].length, 0, `CSS contem url absoluto: ${path.basename(filePath)}`);
  });
}

function assertAssetPerformance() {
  const files = walk(distDir)
    .map((filePath) => ({
      relative: path.relative(distDir, filePath).replaceAll(path.sep, "/"),
      size: statSync(filePath).size
    }))
    .sort((a, b) => b.size - a.size);

  const largeImages = files.filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file.relative) && file.size > 500 * 1024);
  const largeScripts = files.filter((file) => /\.js$/i.test(file.relative) && file.size > 400 * 1024);

  assert.deepEqual(largeImages, [], `Imagens acima de 500 KB: ${largeImages.map((file) => file.relative).join(", ")}`);
  assert.deepEqual(largeScripts, [], `Scripts acima de 400 KB: ${largeScripts.map((file) => file.relative).join(", ")}`);

  console.log("Maiores assets do build:");
  files.slice(0, 8).forEach((file) => {
    console.log(`- ${file.relative}: ${(file.size / 1024).toFixed(1)} KB`);
  });
}

const cpanelYml = readProjectFile(".cpanel.yml");
const viteConfig = readProjectFile("vite.config.ts");
const gitignore = readProjectFile(".gitignore");

assert.match(viteConfig, /base:\s*["']\.\/["']/, "vite.config.ts deve usar base './'");
assert.match(cpanelYml, /\$HOME\/public_html\/cecont/, ".cpanel.yml deve publicar em public_html/cecont");
assert.doesNotMatch(cpanelYml, /DEPLOYPATH=["']?\$HOME\/public_html["']?(\s|$)/, ".cpanel.yml nao pode publicar direto em public_html");
assert.match(cpanelYml, /dist\/index\.html/, ".cpanel.yml deve exigir dist/index.html");
assert.match(cpanelYml, /find "\$DEPLOYPATH" -mindepth 1 -maxdepth 1/, ".cpanel.yml deve limpar apenas filhos diretos do DEPLOYPATH");
assert.match(cpanelYml, /cp -a dist\/\./, ".cpanel.yml deve copiar somente dist/");
assert.match(gitignore, /node_modules\//, ".gitignore deve ignorar node_modules");
assert.match(gitignore, /\.env/, ".gitignore deve ignorar .env");
assert.match(gitignore, /\*\.pem/, ".gitignore deve proteger chaves privadas");

assert.ok(existsSync(path.join(distDir, "index.html")), "dist/index.html nao existe. Rode npm run build antes.");
assert.ok(existsSync(path.join(distDir, ".htaccess")), "dist/.htaccess nao existe");
assert.ok(existsSync(path.join(distDir, "robots.txt")), "dist/robots.txt nao existe");
assert.ok(existsSync(path.join(distDir, "sitemap.xml")), "dist/sitemap.xml nao existe");

rmSync(simRoot, { recursive: true, force: true });
mkdirSync(publicHtmlDir, { recursive: true });

neighborDirs.forEach((dirName) => {
  const dirPath = path.join(publicHtmlDir, dirName);
  mkdirSync(dirPath, { recursive: true });
  writeFileSync(path.join(dirPath, "keep.txt"), `preserve ${dirName}`);
});

mkdirSync(cecontDir, { recursive: true });
writeFileSync(path.join(cecontDir, "old-file.txt"), "old cecont deploy file");

clearOnlyCecontDeployDir();
copyDistToDeployDir();

assert.ok(existsSync(path.join(cecontDir, "index.html")), "index.html nao foi publicado na simulacao");
assert.ok(existsSync(path.join(cecontDir, "assets")), "assets nao foram publicados na simulacao");
assert.ok(!existsSync(path.join(cecontDir, "old-file.txt")), "arquivo antigo de cecont deveria ser removido");

neighborDirs.forEach((dirName) => {
  assert.ok(existsSync(path.join(publicHtmlDir, dirName, "keep.txt")), `pasta vizinha ${dirName} foi alterada`);
});

assertNoForbiddenFiles(cecontDir);
assertRelativeBuildPaths();
assertAssetPerformance();

console.log("\nDeploy simulado OK: somente dist/ seria publicado em public_html/cecont/.");
console.log("Pastas vizinhas preservadas: maypam, sharkgym, outroprojeto.");
