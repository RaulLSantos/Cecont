import { Instagram, Mail, Map, MapPin, MessageCircle, Phone } from "lucide-react";
import { emailUrl, instagramUrl, mapsUrl, phoneUrl, whatsappUrl } from "../data";

const mapEmbedUrl =
  "https://www.google.com/maps?q=Rua%20Manaus%203769%20Cancelli%20Cascavel%20PR&output=embed";

export default function Location() {
  return (
    <section id="localizacao" className="bg-white py-20 sm:py-24">
      <div className="container-site">
        <div className="max-w-3xl" data-reveal>
          <span className="eyebrow">Localização e contato</span>
          <h2 className="section-title">Escritório de contabilidade em Cascavel - PR</h2>
          <p className="section-subtitle">
            Atendimento local para empresas e pessoas físicas em Cascavel, com suporte próximo para rotinas contábeis,
            fiscais, trabalhistas e Imposto de Renda.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <address className="not-italic" data-reveal>
            <div className="rounded-xl border border-ds-gold/25 bg-ds-cream p-6 shadow-gold sm:p-8">
              <h3 className="font-heading text-2xl font-black text-ds-blueDark">CECONT Contabilidade Empresarial</h3>
              <div className="mt-6 grid gap-4 text-slate-700">
                <p className="flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-none text-brand-blue" aria-hidden="true" />
                  <span>Rua Manaus, 3769, Cancelli, Cascavel - PR</span>
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-1 h-5 w-5 flex-none text-brand-blue" aria-hidden="true" />
                  <a href={phoneUrl} className="hover:text-ds-blueDark">
                    Telefone fixo: 45 3306-6567
                  </a>
                </p>
                <p className="flex gap-3">
                  <MessageCircle className="mt-1 h-5 w-5 flex-none text-brand-blue" aria-hidden="true" />
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ds-blueDark">
                    WhatsApp: (45) 9993-3131
                  </a>
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-1 h-5 w-5 flex-none text-brand-blue" aria-hidden="true" />
                  <a href={emailUrl} className="hover:text-ds-blueDark">
                    E-mail: contato@cecont.cnt.br
                  </a>
                </p>
                <p className="flex gap-3">
                  <Instagram className="mt-1 h-5 w-5 flex-none text-brand-blue" aria-hidden="true" />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ds-blueDark">
                    Instagram: @cecontcontabilidade
                  </a>
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={mapsUrl} className="btn-outline" target="_blank" rel="noopener noreferrer">
                  <Map className="h-5 w-5" aria-hidden="true" />
                  Ver no mapa
                </a>
                <a href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Falar pelo WhatsApp
                </a>
                <a href={emailUrl} className="btn-outline">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  Enviar e-mail
                </a>
              </div>
            </div>
          </address>

          <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-brand-blue/20 bg-white shadow-[0_0_30px_rgba(40,108,205,0.18)]" data-reveal>
            <iframe
              title="Mapa com localização da CECONT Contabilidade Empresarial em Cascavel - PR"
              src={mapEmbedUrl}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label="Abrir localização da Cecont no mapa do dispositivo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
