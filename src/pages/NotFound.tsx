import { ArrowLeft, MessageCircle } from "lucide-react";
import SEO from "../components/SEO";
import { whatsappUrl } from "../data";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Página não encontrada | CECONT Contabilidade Empresarial"
        description="A página que você tentou acessar não existe ou foi movida."
        canonical="https://www.cecont.cnt.br/404"
        noIndex
      />
      <main className="bg-brand-mist pt-28">
        <section className="container-site flex min-h-[68vh] items-center py-16">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-md bg-brand-blue text-2xl font-black text-white shadow-card">
              404
            </span>
            <h1 className="mt-8 text-4xl font-black text-brand-navy sm:text-5xl">Página não encontrada</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A página que você tentou acessar não existe ou foi movida.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="./#inicio" className="btn-outline">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                Voltar para o início
              </a>
              <a href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Falar com a Cecont
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
