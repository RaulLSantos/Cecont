const faqs = [
  {
    question: "A Cecont é um escritório de contabilidade em Cascavel?",
    answer:
      "Sim. A Cecont Contabilidade Empresarial atende em Cascavel - PR com serviços de contabilidade, assessoria contábil, rotinas fiscais, departamento pessoal e abertura de empresas."
  },
  {
    question: "Quais empresas podem contratar a assessoria contábil da Cecont?",
    answer:
      "O atendimento é voltado principalmente para micro e pequenas empresas que precisam manter obrigações contábeis, fiscais e trabalhistas organizadas, com orientação próxima e linguagem clara."
  },
  {
    question: "A Cecont atende pessoas físicas para Imposto de Renda?",
    answer:
      "Sim. O escritório também atende pessoas físicas para declaração de Imposto de Renda, com atenção aos documentos, prazos e segurança das informações."
  }
];

export default function FAQ() {
  return (
    <section className="section-cream py-20 sm:py-24">
      <div className="container-site">
        <div className="max-w-3xl" data-reveal>
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="section-title">Perguntas sobre escritório contábil e contabilidade em Cascavel</h2>
          <p className="section-subtitle">
            Respostas objetivas para quem busca contabilidade em Cascavel, assessoria contábil para empresas e suporte
            para rotinas fiscais, contábeis e trabalhistas.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {faqs.map((item) => (
            <article key={item.question} className="card-light" data-reveal>
              <h3 className="font-heading text-xl font-bold leading-8 text-ds-blueDark">{item.question}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
