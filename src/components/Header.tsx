import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { homeImages } from "../assets/siteImages";
import { navItems, whatsappUrl } from "../data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        isScrolled
          ? "border-ds-surface bg-ds-dark/90 shadow-sm backdrop-blur-xl"
          : "border-white/10 bg-ds-dark/75 backdrop-blur-lg"
      }`}
    >
      <div className="container-site flex min-h-[76px] items-center justify-between gap-6">
        <a href="./#inicio" className="flex items-center" aria-label="Ir para o início">
          <img
            src={homeImages.logo}
            alt="Logo da CECONT Contabilidade Empresarial"
            className="h-14 w-40 object-contain object-left"
            loading="eager"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/80 transition hover:text-blue-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Falar com a Cecont
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white shadow-sm lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="fixed inset-x-0 top-[76px] h-[calc(100dvh-76px)] bg-black/55 backdrop-blur-sm" onClick={closeMenu}>
          <nav
            className={`ml-auto flex h-full w-full max-w-sm flex-col gap-2 border-l border-white/10 bg-ds-dark p-6 shadow-soft transition duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Menu mobile"
            onClick={(event) => event.stopPropagation()}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-base font-semibold text-white transition hover:bg-white/10 hover:text-blue-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsappUrl}
              onClick={closeMenu}
              className="btn-primary mt-4 w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Falar com a Cecont
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
