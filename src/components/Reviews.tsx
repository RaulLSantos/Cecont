import { ArrowUpRight, ExternalLink, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { mapsUrl } from "../data";

const reviewCards = [
  {
    title: "Perfil público da Cecont",
    text:
      "Acesse o perfil público no Google para consultar as avaliações reais disponíveis diretamente na fonte.",
    meta: "Fonte: Google Maps",
    icon: ExternalLink
  },
  {
    title: "Depoimentos verificados",
    text:
      "A seção está preparada para receber depoimentos autorizados com nome, data, nota e link de origem, mantendo transparência.",
    meta: "Sem depoimentos inventados",
    icon: ShieldCheck
  },
  {
    title: "Avalie a Cecont",
    text:
      "Clientes atendidos podem registrar sua experiência no perfil público e ajudar outras empresas a conhecerem o atendimento.",
    meta: "Redirecionamento externo",
    icon: MessageSquareQuote
  }
];

export default function Reviews() {
  return (
    <section id="avaliacoes" className="section-cream py-20 sm:py-24">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end" data-reveal>
          <div>
            <span className="eyebrow">Avaliações</span>
            <h2 className="section-title">O que dizem sobre a Cecont</h2>
            <p className="section-subtitle">
              Depoimentos e avaliações públicas ajudam novos clientes a entenderem a experiência de atendimento antes de
              falar com o escritório.
            </p>
          </div>
          <a href={mapsUrl} className="btn-primary shrink-0" target="_blank" rel="noopener noreferrer">
            Ver avaliações reais
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviewCards.map((review) => (
            <article key={review.title} className="card-light" data-reveal>
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-ds-blueLight text-white">
                  <review.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-blue">
                  Google
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ds-blueDark">{review.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">{review.text}</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">{review.meta}</p>
                <a
                  href={mapsUrl}
                  className="text-sm font-bold text-ds-blueDark transition hover:text-brand-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${review.title} no Google Maps`}
                >
                  Abrir
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
