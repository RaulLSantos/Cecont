import { differentials } from "../data";

export default function Differentials() {
  return (
    <section className="section-dark py-20 sm:py-24">
      <div className="container-site">
        <div className="max-w-3xl" data-reveal>
          <span className="eyebrow">Diferenciais</span>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Por que escolher a Cecont?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            Na Cecont, o atendimento é pensado para que o cliente entenda suas obrigações e tenha mais segurança no dia a
            dia da empresa.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="card-dark" data-reveal>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-brand-blue to-ds-blueLight text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
