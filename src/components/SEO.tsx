import { useEffect } from "react";

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
};

const defaultTitle = "Cecont Contabilidade Empresarial | Contabilidade em Cascavel - PR";
const defaultDescription =
  "Cecont Contabilidade Empresarial: escritório de contabilidade em Cascavel - PR para empresas e pessoas físicas. Assessoria contábil, fiscal, pessoal, societário, legalização e imposto de renda.";
const defaultCanonical = "https://www.cecont.cnt.br/";

function setMeta(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

export default function SEO({
  title = defaultTitle,
  description = defaultDescription,
  canonical = defaultCanonical,
  noIndex = false
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", canonical);
    setMeta('meta[name="robots"]', "content", noIndex ? "noindex, follow" : "index, follow");
  }, [canonical, description, noIndex, title]);

  return null;
}
