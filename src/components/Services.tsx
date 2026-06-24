import { ArrowRight } from "lucide-react";
import { services, whatsappUrl } from "../data";

export default function Services() {
  return (
    <section id="servicos" className="section-dark py-20 sm:py-24">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end" data-reveal>
          <div>
            <span className="eyebrow">Serviços contábeis</span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Soluções de contabilidade e assessoria contábil para empresas e pessoas físicas
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              Serviços completos de escritório contábil para manter sua empresa organizada, regular e preparada para
              tomar melhores decisões.
            </p>
          </div>
          <a href={whatsappUrl} className="btn-outline shrink-0" target="_blank" rel="noopener noreferrer">
            Solicitar orientação
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`card-hover rounded-xl border p-6 ${
                  service.featured
                    ? "border-brand-blue/50 bg-ds-card shadow-[0_0_28px_rgba(40,108,205,0.22)]"
                    : "border-ds-surface bg-ds-card"
                }`}
                data-reveal
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-md ${
                    service.featured ? "bg-gradient-to-br from-brand-blue to-ds-blueLight text-white" : "bg-white/10 text-blue-200"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  {service.featured && (
                    <span className="rounded-full bg-brand-blue/15 px-3 py-1 text-xs font-bold text-blue-200">
                      Destaque
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
