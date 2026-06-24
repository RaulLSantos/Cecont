import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readProjectFile(filePath) {
  return readFileSync(path.join(rootDir, filePath), "utf8");
}

function getBlock(source, declarationName) {
  const match = source.match(new RegExp(`export const ${declarationName} = \\[([\\s\\S]*?)\\];`));
  assert.ok(match, `Bloco ${declarationName} nao encontrado`);
  return match[1];
}

function parseJsonLd(indexHtml) {
  const match = indexHtml.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(match, "JSON-LD nao encontrado no index.html");
  return JSON.parse(match[1]);
}

function assertInOrder(source, snippets) {
  let lastIndex = -1;

  snippets.forEach((snippet) => {
    const index = source.indexOf(snippet);
    assert.ok(index > lastIndex, `${snippet} deveria aparecer na ordem correta`);
    lastIndex = index;
  });
}

const app = readProjectFile("src/App.tsx");
const appWithoutJsxComments = app.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");
const data = readProjectFile("src/data.ts");
const header = readProjectFile("src/components/Header.tsx");
const clientsMarquee = readProjectFile("src/components/ClientsMarquee.tsx");
const location = readProjectFile("src/components/Location.tsx");
const reviews = readProjectFile("src/components/Reviews.tsx");
const siteImages = readProjectFile("src/assets/siteImages.ts");
const indexHtml = readProjectFile("index.html");
const robotsTxt = readProjectFile("public/robots.txt");
const sitemapXml = readProjectFile("public/sitemap.xml");
const navBlock = getBlock(data, "navItems");
const servicesBlock = getBlock(data, "services");
const jsonLd = parseJsonLd(indexHtml);

const removedServiceCards = [
  "Abertura de empresas",
  "Encerramento de empresa",
  "Alteração contratual",
  "Regularização de CNPJ",
  "Lucro Presumido",
  "Lucro Real",
  "Simples Nacional",
  "Folha de pagamento"
];

const tests = [
  {
    type: "positivo",
    name: "home renderiza hero, clientes, sobre, servicos, avaliacoes e localizacao nessa ordem",
    run() {
      assertInOrder(app, ["<Hero />", "<ClientsMarquee />", "<About />", "<Services />", "<Reviews />", "<Location />"]);
    }
  },
  {
    type: "positivo",
    name: "sessao Nossos Clientes esta importada e configurada como parte da home",
    run() {
      assert.match(app, /import ClientsMarquee from "\.\/components\/ClientsMarquee";/);
      assert.match(clientsMarquee, /id="clientes"/);
      assert.match(clientsMarquee, /Nossos clientes/);
      assert.match(siteImages, /clientLogoModules/);
      assert.match(siteImages, /src\/assets\/clients|\.\/clients/);
    }
  },
  {
    type: "positivo",
    name: "menu principal possui apenas as secoes aprovadas",
    run() {
      ["Início", "Sobre a Cecont", "Serviços", "Avaliações", "Localização"].forEach((label) => {
        assert.ok(navBlock.includes(label), `Menu deveria conter ${label}`);
      });
    }
  },
  {
    type: "positivo",
    name: "servicos ativos contem Societario/Legalizacao e os servicos mantidos",
    run() {
      [
        "Societário/Legalização",
        "Contabilidade mensal",
        "Departamento fiscal",
        "Departamento pessoal",
        "MEI",
        "Imposto de Renda Pessoa Física",
        "Certificado Digital",
        "Consultoria contábil"
      ].forEach((title) => {
        assert.ok(servicesBlock.includes(title), `Servico esperado ausente: ${title}`);
      });
    }
  },
  {
    type: "positivo",
    name: "avaliacoes e mapa direcionam para o perfil/localizacao real",
    run() {
      assert.match(reviews, /Ver avaliações reais/);
      assert.match(reviews, /mapsUrl/);
      assert.match(location, /output=embed/);
      assert.match(location, /mapa do dispositivo/);
      assert.match(location, /target="_blank"/);
      assert.match(location, /rel="noopener noreferrer"/);
    }
  },
  {
    type: "positivo",
    name: "SEO tecnico possui robots, sitemap, canonical e JSON-LD valido",
    run() {
      assert.ok(existsSync(path.join(rootDir, "public/robots.txt")), "robots.txt deveria existir");
      assert.ok(existsSync(path.join(rootDir, "public/sitemap.xml")), "sitemap.xml deveria existir");
      assert.match(robotsTxt, /Sitemap: https:\/\/www\.cecont\.cnt\.br\/sitemap\.xml/);
      assert.match(sitemapXml, /https:\/\/www\.cecont\.cnt\.br\//);
      assert.match(indexHtml, /<link rel="canonical" href="https:\/\/www\.cecont\.cnt\.br\/" \/>/);
      assert.equal(jsonLd["@context"], "https://schema.org");
      assert.ok(Array.isArray(jsonLd["@graph"]), "JSON-LD deveria conter @graph");
    }
  },
  {
    type: "negativo",
    name: "menu nao deve exibir Para Empresas nem Contato",
    run() {
      assert.ok(!navBlock.includes("Para Empresas"), "Menu nao deveria conter Para Empresas");
      assert.ok(!navBlock.includes("Contato"), "Menu nao deveria conter Contato");
    }
  },
  {
    type: "negativo",
    name: "cards removidos nao devem existir na lista ativa de servicos",
    run() {
      removedServiceCards.forEach((title) => {
        assert.ok(!servicesBlock.includes(title), `Servico removido ainda aparece: ${title}`);
      });
    }
  },
  {
    type: "negativo",
    name: "FAQ e contato nao devem voltar para a home renderizada",
    run() {
      assert.ok(!appWithoutJsxComments.includes("<FAQ />"), "FAQ nao deveria estar renderizada");
      assert.ok(!appWithoutJsxComments.includes("<LeadForm />"), "Formulario de contato nao deveria estar renderizado");
    }
  },
  {
    type: "negativo",
    name: "header nao deve renderizar nome textual ao lado da logo",
    run() {
      assert.match(header, /homeImages\.logo/);
      assert.ok(!header.includes("Contabilidade Empresarial</"), "Header nao deve renderizar texto da empresa ao lado da logo");
    }
  },
  {
    type: "negativo",
    name: "Schema nao deve anunciar FAQPage nem ofertas removidas",
    run() {
      const jsonLdText = JSON.stringify(jsonLd);
      assert.ok(!jsonLdText.includes("FAQPage"), "Schema nao deveria conter FAQPage sem FAQ visivel");
      removedServiceCards.forEach((title) => {
        assert.ok(!jsonLdText.includes(title), `Schema ainda contem oferta removida: ${title}`);
      });
    }
  }
];

let passed = 0;

for (const test of tests) {
  try {
    test.run();
    passed += 1;
    console.log(`PASS [${test.type}] ${test.name}`);
  } catch (error) {
    console.error(`FAIL [${test.type}] ${test.name}`);
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

console.log(`\n${passed}/${tests.length} cenarios executados com sucesso.`);
