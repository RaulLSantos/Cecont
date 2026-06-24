import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../data";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ds-dark shadow-[0_4px_15px_rgba(37,211,102,0.4)] transition hover:-translate-y-1 hover:bg-[#1fc15b] sm:h-16 sm:w-16"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Cecont pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
