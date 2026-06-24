import heroOffice from "./cecont-hero.jpg";
import cecontLogo from "./logo-cecont.svg";

const assetPhotoModules = import.meta.glob("./home/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
  query: "?url"
}) as Record<string, string>;

const homeSlideModules = import.meta.glob("./home/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
  query: "?url"
}) as Record<string, string>;

const clientLogoModules = import.meta.glob("./clients/*.{svg,png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
  query: "?url"
}) as Record<string, string>;

export const homeImages = {
  hero: heroOffice,
  about: heroOffice,
  og: "/og-cecont.jpg",
  logo: cecontLogo
};

// Metodo para buscar fotos por nome dentro de src/assets/home.
// Exemplos: getAssetPhoto("fachada.jpg") ou getAssetPhoto("home/reuniao.webp").
export function getAssetPhoto(fileName: string) {
  const normalizedName = fileName.replace(/^home\//, "");
  return assetPhotoModules[`./home/${normalizedName}`] ?? homeImages.hero;
}

// Variavel usada pela home: coloque as fotos finais em src/assets/home.
// O slideshow usa automaticamente todos os arquivos de imagem dessa pasta.
export const homeSlides = Object.entries(homeSlideModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], index) => ({
    src,
    alt: `Foto institucional da Cecont Contabilidade Empresarial ${index + 1}`
  }));

export function getHomeSlides() {
  return Array.from({ length: 7 }, (_, index) => {
    const uploadedSlide = homeSlides[index];

    return {
      src: uploadedSlide?.src ?? homeImages.hero,
      alt:
        uploadedSlide?.alt ??
        `Foto ${index + 1} da Cecont Contabilidade Empresarial para a home em slideshow`
    };
  });
}

// Variavel usada pela faixa de clientes: coloque as logos em src/assets/clients.
export const clientLogos = Object.entries(clientLogoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    name: path
      .replace("./clients/", "")
      .replace(/\.(svg|png|jpg|jpeg|webp|avif)$/i, "")
      .replace(/[-_]/g, " ")
  }));
