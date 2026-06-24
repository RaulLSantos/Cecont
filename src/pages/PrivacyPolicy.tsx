import { ArrowLeft, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { emailUrl } from "../data";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Política de Privacidade | CECONT Contabilidade Empresarial"
        description="Política de Privacidade do site da CECONT Contabilidade Empresarial, escritório de contabilidade em Cascavel - PR."
        canonical="https://www.cecont.cnt.br/politica-de-privacidade"
      />
      <main className="bg-white pt-28">
        <section className="container-site py-16 sm:py-20">
          <a href="./#inicio" className="inline-flex items-center gap-2 font-bold text-brand-blue hover:text-brand-navy">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Voltar para o início
          </a>
          <div className="mt-8 max-w-4xl" data-reveal>
            <span className="eyebrow">LGPD</span>
            <h1 className="mt-4 text-4xl font-black leading-tight text-brand-navy sm:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Esta política explica como o site da CECONT Contabilidade Empresarial pode coletar e tratar dados enviados
              por visitantes por meio do formulário de contato.
            </p>
          </div>

          <div className="mt-10 grid gap-6 text-base leading-8 text-slate-700" data-reveal>
            <section className="rounded-lg border border-slate-200 bg-brand-mist p-6">
              <h2 className="text-xl font-bold text-brand-navy">Dados coletados</h2>
              <p className="mt-3">
                O site pode coletar nome, telefone, e-mail, tipo de atendimento desejado e mensagem enviada
                voluntariamente pelo usuário no formulário de contato.
              </p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-brand-navy">Finalidade</h2>
              <p className="mt-3">
                Os dados são utilizados apenas para responder solicitações, prestar atendimento inicial e dar continuidade
                ao contato solicitado pelo próprio usuário.
              </p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-brand-navy">Compartilhamento</h2>
              <p className="mt-3">
                A Cecont não vende dados pessoais e não compartilha informações indevidamente. O compartilhamento poderá
                ocorrer apenas quando necessário para cumprir obrigações legais ou mediante solicitação do titular.
              </p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-brand-navy">Solicitações do titular</h2>
              <p className="mt-3">
                O usuário pode solicitar alteração, atualização ou remoção de seus dados entrando em contato pelo e-mail{" "}
                <a href={emailUrl} className="font-bold text-brand-blue hover:underline">
                  contato@cecont.cnt.br
                </a>
                .
              </p>
            </section>

            <section className="rounded-lg border border-brand-blue/20 bg-blue-50 p-6">
              <h2 className="text-xl font-bold text-brand-navy">Contato</h2>
              <p className="mt-3">
                Para dúvidas sobre esta política, fale com a CECONT Contabilidade Empresarial pelo e-mail de contato.
              </p>
              <a href={emailUrl} className="btn-outline mt-5">
                <Mail className="h-5 w-5" aria-hidden="true" />
                Enviar e-mail
              </a>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
