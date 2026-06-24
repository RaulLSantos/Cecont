import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ClientsMarquee from "./components/ClientsMarquee";
import Services from "./components/Services";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
// import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import SEO from "./components/SEO";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const routes = {
  home: "/",
  privacy: "/politica-de-privacidade"
};

function normalizePath(pathname: string) {
  const cleanedPath = pathname.replace(/\/+$/, "") || "/";
  const segments = cleanedPath.split("/").filter(Boolean);

  if (segments[0]?.toLowerCase() === "cecont") {
    const nestedPath = `/${segments.slice(1).join("/")}`;
    return nestedPath === "/" ? routes.home : nestedPath;
  }

  return cleanedPath;
}

function HomePage() {
  return (
    <>
      <SEO />
      <main>
        <Hero />
        <ClientsMarquee />
        <About />
        <Services />
        <Reviews />
        {/* FAQ removido da sessão de contato a pedido. Para reativar, descomente o import acima e a linha abaixo. */}
        {/* <FAQ /> */}
        <Location />
      </main>
    </>
  );
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  const content = useMemo(() => {
    if (path === routes.home) return <HomePage />;
    if (path === routes.privacy) return <PrivacyPolicy />;
    return <NotFound />;
  }, [path]);

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <Header />
      {content}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
