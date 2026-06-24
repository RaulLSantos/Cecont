import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { emailUrl, instagramUrl, navItems, phoneUrl, services, whatsappUrl } from "../data";

const mainServices = services
  .filter((service) => service.featured)
  .map((service) => service.title);

const legalSections = [
  {
    title: "LGPD e Política de Cookies",
    content:
      "Esta Política de Cookies explica o que são cookies e como os usamos. Você deve ler esta política para entender os tipos de cookies utilizados, as informações coletadas por meio deles, como essas informações são usadas e como controlar suas preferências. Coletamos dados fornecidos pelo usuário de forma direta ou indireta no acesso e uso do site, incluindo informações enviadas em formulários de contato. Utilizamos cookies e identificadores anônimos para controle de audiência, navegação, segurança e publicidade, sempre observando as finalidades informadas e as boas práticas de proteção de dados. O consentimento ocorre quando o usuário fornece informações pessoais, como nome, telefone e e-mail, para enviar uma solicitação ou entrar em contato com a empresa. O usuário pode retirar seu consentimento a qualquer momento entrando em contato com a Cecont. Podemos divulgar informações pessoais quando exigido por lei ou em caso de violação dos Termos de Uso. Para proteger as informações pessoais, adotamos precauções razoáveis e boas práticas de segurança para evitar perda, acesso indevido, divulgação, alteração ou destruição inadequada dos dados."
  },
  {
    title: "Termos de Uso",
    content:
      "Ao navegar neste site, o usuário concorda em utilizar as informações de forma lícita, ética e compatível com a finalidade institucional da Cecont Contabilidade Empresarial. O conteúdo publicado tem caráter informativo e não substitui uma análise contábil individualizada. A Cecont pode atualizar textos, serviços, páginas, políticas e informações de contato a qualquer momento para manter o site correto e seguro."
  },
  {
    title: "Política de Privacidade",
    content:
      "O site pode coletar nome, telefone, e-mail, tipo de atendimento desejado e mensagem enviada voluntariamente pelo usuário. Esses dados são utilizados apenas para responder solicitações e dar continuidade ao atendimento solicitado. A Cecont não vende dados pessoais e não compartilha informações indevidamente. O titular pode solicitar alteração, atualização ou remoção de seus dados pelo e-mail contato@cecont.cnt.br."
  }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ds-dark text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1fr]">
        <div>
          <a href="./#inicio" className="flex items-center gap-3" aria-label="Ir para o início">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-brand-blue to-ds-blueLight text-lg font-black text-white">
              C
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black tracking-wide">CECONT</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                Contabilidade Empresarial
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">
            Escritório de contabilidade em Cascavel - PR, com atendimento consultivo para micro e pequenas empresas e
            serviços para pessoas físicas.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">Menu rápido</h2>
          <nav className="mt-5 grid gap-3" aria-label="Menu do rodapé">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-blue-100 transition hover:text-white">
                {item.label}
              </a>
            ))}
            <a href="./politica-de-privacidade" className="text-sm text-blue-100 transition hover:text-white">
              Política de Privacidade
            </a>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">Serviços principais</h2>
          <ul className="mt-5 grid gap-3">
            {mainServices.map((service) => (
              <li key={service} className="text-sm text-blue-100">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">Contato</h2>
          <div className="mt-5 grid gap-3 text-sm text-blue-100">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-blue-200" aria-hidden="true" />
              Rua Manaus, 3769, Cancelli, Cascavel - PR
            </p>
            <a href={phoneUrl} className="flex gap-3 transition hover:text-white">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-blue-200" aria-hidden="true" />
              45 3306-6567
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-white">
              <MessageCircle className="mt-0.5 h-4 w-4 flex-none text-blue-200" aria-hidden="true" />
              (45) 9993-3131
            </a>
            <a href={emailUrl} className="flex gap-3 transition hover:text-white">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-blue-200" aria-hidden="true" />
              contato@cecont.cnt.br
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 transition hover:text-white"
            >
              <Instagram className="mt-0.5 h-4 w-4 flex-none text-blue-200" aria-hidden="true" />
              @cecontcontabilidade
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site grid gap-3 py-8 lg:grid-cols-3">
          {legalSections.map((section) => (
            <details
              key={section.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-blue-100 open:bg-white/[0.05]"
            >
              <summary className="cursor-pointer font-heading font-bold text-white marker:text-brand-blue">
                {section.title}
              </summary>
              <p className="mt-4 text-xs leading-6 text-blue-100/80">{section.content}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-blue-100 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} CECONT Contabilidade Empresarial. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
