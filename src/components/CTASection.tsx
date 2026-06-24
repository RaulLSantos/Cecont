import { Mail, MessageCircle } from "lucide-react";
import { whatsappUrl } from "../data";

export default function CTASection() {
  return (
    <section className="bg-ds-dark py-16 text-white sm:py-20">
      <div className="container-site">
        <div className="grid gap-8 border-y border-ds-gold/25 py-10 lg:grid-cols-[1fr_auto] lg:items-center" data-reveal>
          <div>
            <span className="eyebrow text-blue-200">Atendimento consultivo</span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Precisa de uma contabilidade mais próxima da sua empresa?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-blue-50 sm:text-lg">
              Fale com a Cecont e veja como podemos ajudar sua empresa a ficar mais organizada, regular e segura.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chamar no WhatsApp
            </a>
            <a href="#contato" className="btn-secondary">
              <Mail className="h-5 w-5" aria-hidden="true" />
              Enviar mensagem
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
