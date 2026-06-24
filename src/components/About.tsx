import { useState } from "react";
import { ArrowRight, BarChart3, Eye, HeartHandshake, Quote, Scale, Target } from "lucide-react";
import { homeImages } from "../assets/siteImages";
import { whatsappUrl } from "../data";

const principles = [
  {
    title: "Diagnóstico consultivo",
    label: "Diagnóstico",
    eyebrow: "Rotina orientada por dados",
    icon: BarChart3,
    description:
      "A Cecont analisa atividades e rotinas da empresa para identificar pontos de organização, regularidade e melhor desempenho na gestão contábil, fiscal e trabalhista.",
    detail:
      "Esse olhar ajuda o cliente a entender obrigações, prazos e oportunidades legais aplicáveis ao negócio com responsabilidade e segurança."
  },
  {
    title: "Nossos valores",
    label: "Valores",
    eyebrow: "Como conduzimos o atendimento",
    icon: HeartHandshake,
    description:
      "Prezamos pela ética, respeito e compromisso com nossos clientes, buscando humanizar nossos serviços e manter qualidade em cada ação.",
    detail:
      "A relação com cada cliente é construída com clareza, escuta e responsabilidade para que o atendimento seja próximo sem perder o rigor técnico."
  },
  {
    title: "Nossa missão",
    label: "Missão",
    eyebrow: "O que nos move",
    icon: Target,
    description:
      "Potencializar os negócios dos nossos clientes por meio de um serviço contábil de qualidade, com transparência, suporte e rapidez.",
    detail:
      "A contabilidade deve apoiar decisões melhores, reduzir dúvidas do dia a dia e dar mais previsibilidade para quem empreende."
  },
  {
    title: "Nossa visão",
    label: "Visão",
    eyebrow: "Onde queremos chegar",
    icon: Eye,
    description:
      "Ser reconhecida pela qualidade dos serviços contábeis prestados, sempre buscando melhoria contínua e responsabilidade no atendimento.",
    detail:
      "A Cecont busca evoluir continuamente seus processos para entregar uma experiência cada vez mais clara, segura e consultiva."
  }
];

export default function About() {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const selectedPrinciple = principles[activePrinciple];
  const SelectedIcon = selectedPrinciple.icon;
  const progressWidth = `${((activePrinciple + 1) / principles.length) * 100}%`;

  return (
    <section id="sobre" className="bg-ds-blueDark py-20 text-white sm:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <figure className="relative overflow-hidden rounded-xl border border-ds-gold/20 bg-white/10 shadow-gold" data-reveal>
          <img
            src={homeImages.about}
            alt="Atendimento consultivo em contabilidade empresarial com análise de documentos"
            className="aspect-[4/3] h-full w-full object-cover"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent p-6">
            <span className="text-sm font-semibold text-blue-200">CECONT Contabilidade Empresarial</span>
          </figcaption>
        </figure>

        <div data-reveal>
          <span className="eyebrow text-blue-200">Sobre a Cecont</span>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Conheça a Cecont Contabilidade Empresarial
          </h2>
          <p className="mt-6 text-base leading-8 text-blue-50 sm:text-lg">
            A Cecont Contabilidade Empresarial atua em Cascavel - PR oferecendo soluções contábeis para empresas que
            buscam organização, segurança e um atendimento próximo. Com foco em micro e pequenas empresas, o escritório
            auxilia negócios em sua constituição, administração, rotinas consultivas e, quando necessário, no
            encerramento das atividades.
          </p>
          <p className="mt-5 text-base leading-8 text-blue-50 sm:text-lg">
            A equipe reúne profissionais qualificados nas áreas contábil, fiscal, trabalhista e de assessoria. O trabalho
            parte de um diagnóstico das atividades e rotinas da empresa, buscando mais segurança, organização e melhor
            desempenho no uso correto dos instrumentos legais aplicáveis.
          </p>
          <div className="mt-8 rounded-xl border border-ds-gold/25 bg-white/10 p-6">
            <Quote className="mb-4 h-8 w-8 text-blue-200" aria-hidden="true" />
            <p className="font-accent text-xl italic leading-8 text-white">
              Contabilidade com clareza, proximidade e responsabilidade para apoiar melhores decisões.
            </p>
          </div>

          <a
            href={whatsappUrl}
            className="mt-8 inline-flex items-center gap-2 font-bold text-blue-200 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale com nossa equipe
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="container-site mt-16 border-t border-white/10 pt-12 sm:mt-20 sm:pt-16" data-reveal>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <span className="eyebrow text-blue-200">Conheça nossos princípios</span>
            <h3 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Princípios que orientam cada atendimento
            </h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-blue-50">
              A Cecont atua apoiando empresas desde a constituição até a administração das rotinas contábeis, fiscais e
              trabalhistas. Quando necessário, também orienta processos de encerramento com responsabilidade documental.
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-blue-50">
              Mais do que cumprir obrigações, o escritório busca compreender o contexto de cada negócio para oferecer um
              suporte mais claro, humano e alinhado à realidade do cliente.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/20">
            <div
              className="grid gap-2 rounded-xl bg-brand-navy/60 p-2 sm:grid-cols-4"
              role="tablist"
              aria-label="Princípios da Cecont"
            >
              {principles.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  id={`principle-tab-${index}`}
                  role="tab"
                  aria-selected={activePrinciple === index}
                  aria-controls="principle-panel"
                  className={`rounded-lg px-4 py-3 text-left text-sm font-bold transition ${
                    activePrinciple === index
                      ? "bg-white text-brand-blue shadow-lg shadow-black/10"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setActivePrinciple(index)}
                >
                  <span className="block text-xs uppercase tracking-[0.18em] opacity-70">0{index + 1}</span>
                  <span className="mt-1 block">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-300 via-brand-blue to-white transition-all duration-500"
                style={{ width: progressWidth }}
              />
            </div>

            <div
              id="principle-panel"
              role="tabpanel"
              aria-labelledby={`principle-tab-${activePrinciple}`}
              className="min-h-[300px] rounded-b-xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-transparent p-6 sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue">
                  <SelectedIcon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">
                    {selectedPrinciple.eyebrow}
                  </span>
                  <h4 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
                    {selectedPrinciple.title}
                  </h4>
                  <p className="mt-5 text-base leading-8 text-blue-50 sm:text-lg">{selectedPrinciple.description}</p>
                  <p className="mt-4 border-l-2 border-blue-200 pl-5 text-sm leading-7 text-blue-100">
                    {selectedPrinciple.detail}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-blue-100">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  Ética
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2">Transparência</span>
                <span className="rounded-full border border-white/10 px-4 py-2">Suporte próximo</span>
                <span className="rounded-full border border-white/10 px-4 py-2">Melhoria contínua</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
