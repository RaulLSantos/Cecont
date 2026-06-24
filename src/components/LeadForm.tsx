import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { whatsappUrl } from "../data";

const attendanceTypes = [
  "Abertura de empresa",
  "Contabilidade para empresa",
  "Departamento pessoal",
  "Imposto de Renda",
  "Regularização de CNPJ",
  "Outro"
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
  companyWebsite: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  type: "",
  message: "",
  companyWebsite: ""
};

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState("");
  const startedAt = useMemo(() => Date.now(), []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.companyWebsite || Date.now() - startedAt < 1800) {
      setStatus("Não foi possível enviar a solicitação agora. Tente novamente em alguns instantes.");
      return;
    }

    const missingRequired = !form.name || !form.phone || !form.email || !form.type;
    if (missingRequired) {
      setStatus("Preencha os campos obrigatórios para continuar.");
      return;
    }

    const message = [
      "Olá, vim pelo site da Cecont e gostaria de atendimento contábil.",
      `Nome: ${form.name}`,
      `Telefone/WhatsApp: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Tipo de atendimento: ${form.type}`,
      form.message ? `Mensagem: ${form.message}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/5545999933131?text=${encodeURIComponent(message)}`;
    window.open(url || whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus("Sua solicitação foi preparada para envio pelo WhatsApp.");
  }

  return (
    <section id="contato" className="section-cream py-20 sm:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
        <div data-reveal>
          <span className="eyebrow">Contato</span>
          <h2 className="section-title">Envie uma mensagem para a Cecont</h2>
          <p className="section-subtitle">
            Conte rapidamente o que você precisa. A equipe retornará para entender seu momento e orientar o melhor
            encaminhamento para sua empresa ou declaração de Imposto de Renda.
          </p>
          <div className="mt-8 rounded-xl border border-ds-gold/25 bg-white p-6">
            <h3 className="text-lg font-bold text-ds-blueDark">Atendimento local e consultivo</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Fale com um escritório de contabilidade em Cascavel que entende a rotina de micro e pequenas empresas e
              orienta cada solicitação com clareza.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-ds-gold/25 bg-white p-5 shadow-gold sm:p-7"
          data-reveal
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-ds-blueDark">Nome</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="mt-2 w-full rounded-md border border-ds-gold/40 bg-white px-4 py-3 text-ds-blueDark shadow-sm"
                placeholder="Seu nome"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-ds-blueDark">Telefone/WhatsApp</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="mt-2 w-full rounded-md border border-ds-gold/40 bg-white px-4 py-3 text-ds-blueDark shadow-sm"
                placeholder="(45) 99999-9999"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-ds-blueDark">E-mail</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="mt-2 w-full rounded-md border border-ds-gold/40 bg-white px-4 py-3 text-ds-blueDark shadow-sm"
                placeholder="voce@email.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-ds-blueDark">Tipo de atendimento desejado</span>
              <select
                name="attendanceType"
                required
                value={form.type}
                onChange={(event) => updateField("type", event.target.value)}
                className="mt-2 w-full rounded-md border border-ds-gold/40 bg-white px-4 py-3 text-ds-blueDark shadow-sm"
              >
                <option value="">Selecione</option>
                {attendanceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-ds-blueDark">Mensagem</span>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="mt-2 w-full resize-y rounded-md border border-ds-gold/40 bg-white px-4 py-3 text-ds-blueDark shadow-sm"
              placeholder="Conte em poucas palavras como podemos ajudar."
            />
          </label>

          <label className="hidden" aria-hidden="true">
            Empresa/site
            <input
              type="text"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={form.companyWebsite}
              onChange={(event) => updateField("companyWebsite", event.target.value)}
            />
          </label>

          <p className="mt-5 text-xs leading-6 text-slate-600">
            Ao enviar seus dados, você concorda que a Cecont entre em contato para responder sua solicitação. Seus dados
            serão tratados conforme nossa{" "}
            <a href="/politica-de-privacidade" className="font-bold text-ds-blueDark hover:underline">
              Política de Privacidade
            </a>
            .
          </p>

          {status && (
            <p className="mt-4 rounded-md bg-ds-cream px-4 py-3 text-sm font-semibold text-ds-blueDark" role="status">
              {status}
            </p>
          )}

          <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
            <Send className="h-5 w-5" aria-hidden="true" />
            Enviar mensagem
          </button>
        </form>
      </div>
    </section>
  );
}
