import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { getHomeSlides } from "../assets/siteImages";
import { whatsappUrl } from "../data";

const slideCopy = [
  {
    label: "Atendimento",
    title: "Contabilidade empresarial em Cascavel",
    emphasis: "para crescer com segurança",
    description:
      "A Cecont oferece assessoria contábil próxima para micro e pequenas empresas que precisam de clareza, organização e regularidade."
  },
  {
    label: "Empresas",
    title: "Escritório contábil para rotinas",
    emphasis: "mais organizadas",
    description:
      "Acompanhamento para obrigações contábeis, fiscais e trabalhistas com uma comunicação simples e consultiva."
  },
  {
    label: "Abertura",
    title: "Abra sua empresa com orientação",
    emphasis: "desde o primeiro passo",
    description:
      "Suporte para enquadramento, documentação e início das atividades com menos burocracia e mais segurança."
  },
  {
    label: "Fiscal",
    title: "Assessoria contábil e fiscal",
    emphasis: "dentro dos prazos",
    description:
      "Organização de apurações, guias e obrigações para que o empresário tenha mais tranquilidade no dia a dia."
  },
  {
    label: "Pessoal",
    title: "Departamento pessoal para empresas",
    emphasis: "com atenção trabalhista",
    description:
      "Apoio em folha de pagamento, admissões, férias, rescisões e rotinas essenciais de equipe."
  },
  {
    label: "IRPF",
    title: "Imposto de Renda em Cascavel",
    emphasis: "com cuidado nos detalhes",
    description:
      "Atendimento para pessoas físicas com análise de documentos e segurança nas informações declaradas."
  },
  {
    label: "Proximidade",
    title: "Um contador em Cascavel PR",
    emphasis: "para caminhar junto",
    description:
      "Relacionamento próximo, atendimento humanizado e orientação objetiva para decisões melhores."
  }
];

export default function Hero() {
  const slides = useMemo(() => getHomeSlides(), []);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeCopy = slideCopy[activeSlide] ?? slideCopy[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % 7);
    }, 6200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative isolate min-h-screen overflow-hidden bg-ds-dark text-white">
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, index) => (
          <img
            key={`${slide.src}-${index}`}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition duration-[1500ms] ease-out ${
              index === activeSlide ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-[#061a32]/88 to-[#0a0a0a]/50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_18%,rgba(40,108,205,0.26),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.68))]" />

      <nav
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex lg:left-12"
        aria-label="Fotos da home"
      >
        {slides.map((slide, index) => (
          <button
            key={`${slide.src}-nav-${index}`}
            type="button"
            onClick={() => setActiveSlide(index)}
            className="group relative flex h-9 w-14 items-center justify-center text-lg font-black text-white transition hover:text-blue-200"
            aria-label={`Abrir foto ${index + 1} da home`}
            aria-current={index === activeSlide ? "true" : undefined}
          >
            {index === activeSlide && (
              <span className="absolute right-full mr-4 h-px w-16 bg-gradient-to-r from-transparent to-brand-blue" />
            )}
            <span className={index === activeSlide ? "text-brand-blue" : "text-white"}>
              {index + 1}
            </span>
          </button>
        ))}
      </nav>

      <div className="container-site flex min-h-screen items-center pb-24 pt-28">
        <div className="max-w-5xl pl-0 md:pl-20 lg:pl-32">
          <span className="font-accent text-2xl italic text-blue-200">{activeCopy.label}</span>
          <h1 className="mt-8 max-w-5xl font-heading text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {activeCopy.title}
            <br />
            {" "}
            <em className="font-accent font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-brand-blue to-white">
              {activeCopy.emphasis}
            </em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{activeCopy.description}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Falar com a Cecont
            </a>
            <a href="#servicos" className="group inline-flex items-center gap-5 text-lg font-bold text-white">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/12 backdrop-blur transition group-hover:bg-brand-blue">
                <ArrowRight className="h-8 w-8" aria-hidden="true" />
              </span>
              Conhecer serviços
            </a>
          </div>
        </div>
      </div>

      <a
        href="#clientes"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/80 transition hover:text-blue-200 md:block"
        aria-label="Ir para a seção de clientes atendidos"
      >
        <ArrowDown className="h-16 w-16" aria-hidden="true" />
      </a>
    </section>
  );
}
