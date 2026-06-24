import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { businessPains, whatsappUrl } from "../data";

export default function BusinessSection() {
  return (
    <section id="empresas" className="section-cream py-20 sm:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div data-reveal>
          <span className="eyebrow">Para micro e pequenas empresas</span>
          <h2 className="section-title">Mais do que cumprir obrigações: contabilidade para apoiar sua empresa</h2>
          <p className="section-subtitle">
            Micro e pequenas empresas precisam de uma contabilidade que vá além da emissão de guias. A Cecont atua com
            atendimento próximo e orientação clara para ajudar empresários a manterem suas rotinas fiscais, contábeis e
            trabalhistas em ordem.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Solicitar atendimento contábil
            </a>
            <a href="#contato" className="btn-outline">
              Enviar mensagem
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-4" data-reveal>
          {businessPains.map((pain) => (
            <div key={pain} className="card-light flex items-start gap-4 p-5">
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-md bg-ds-gold/20 text-ds-blueDark">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-base font-semibold leading-7 text-ds-blueDark">{pain}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
