import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clientLogos } from "../assets/siteImages";

const placeholderClients = [
  "Cliente parceiro",
  "Empresa atendida",
  "Negócio local",
  "Cliente Cecont",
  "Pequena empresa",
  "Pessoa física"
];

export default function ClientsMarquee() {
  const [isManual, setIsManual] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const logos =
    clientLogos.length > 0
      ? clientLogos
      : placeholderClients.map((name, index) => ({
          name: `${name} ${index + 1}`,
          src: ""
        }));

  const loopItems = [...logos, ...logos];

  function move(direction: "previous" | "next") {
    setIsManual(true);
    setActiveIndex((current) => {
      if (direction === "previous") {
        return current === 0 ? logos.length - 1 : current - 1;
      }

      return (current + 1) % logos.length;
    });
  }

  return (
    <section id="clientes" className="bg-white py-8 sm:py-10" aria-labelledby="clientes-title">
      <div className="container-site">
        <div className="text-center">
          <span className="eyebrow justify-center">Relacionamentos de confiança</span>
          <h2 id="clientes-title" className="mt-2 font-heading text-3xl font-bold text-brand-blue sm:text-4xl">
            Nossos clientes
          </h2>
        </div>

        <div className="relative mt-5 overflow-hidden py-2">
          <button
            type="button"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-brand-blue transition hover:bg-blue-50 lg:flex"
            aria-label="Clientes anteriores"
            onClick={() => move("previous")}
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-brand-blue transition hover:bg-blue-50 lg:flex"
            aria-label="Próximos clientes"
            onClick={() => move("next")}
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </button>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-20 bg-gradient-to-l from-white to-transparent" />

          <div
            className={`flex w-max items-center gap-12 px-14 transition-transform duration-500 ${
              isManual ? "" : "logo-marquee"
            }`}
            style={isManual ? { transform: `translateX(-${activeIndex * 224}px)` } : undefined}
          >
            {loopItems.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex h-20 w-44 shrink-0 items-center justify-center grayscale transition duration-300 hover:grayscale-0"
              >
                {client.src ? (
                  <img
                    src={client.src}
                    alt={`Logo ${client.name}`}
                    className="max-h-16 max-w-40 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-16 w-40 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 text-center font-heading text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
