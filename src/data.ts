import {
  BriefcaseBusiness,
  Calculator,
  FileCheck2,
  Handshake,
  MapPin,
  ReceiptText,
  ScrollText,
  Signature,
  UsersRound
} from "lucide-react";

export const whatsappMessage =
  "Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Cecont%20e%20gostaria%20de%20atendimento%20cont%C3%A1bil.";

export const whatsappUrl = `https://wa.me/5545999933131?text=${whatsappMessage}`;
export const phoneUrl = "tel:+554533066567";
export const emailUrl = "mailto:contato@cecont.cnt.br";
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Rua%20Manaus%203769%20Cancelli%20Cascavel%20PR";
export const instagramUrl = "https://www.instagram.com/cecontcontabilidade/";

export const navItems = [
  { label: "Início", href: "./#inicio" },
  { label: "Sobre a Cecont", href: "./#sobre" },
  { label: "Serviços", href: "./#servicos" },
  { label: "Avaliações", href: "./#avaliacoes" },
  { label: "Localização", href: "./#localizacao" }
];

export const services = [
  {
    title: "Societário/Legalização",
    description:
      "Apoio para abertura, alterações, regularizações e encerramento de empresas, com orientação documental e encaminhamento dos atos legais necessários.",
    icon: FileCheck2,
    featured: true
  },
  {
    title: "Contabilidade mensal",
    description:
      "Acompanhamento contábil para manter sua empresa em dia com obrigações fiscais, contábeis e legais.",
    icon: Calculator,
    featured: true
  },
  {
    title: "Departamento fiscal",
    description:
      "Organização das rotinas fiscais, apuração de tributos e acompanhamento de obrigações dentro dos prazos.",
    icon: ReceiptText,
    featured: false
  },
  {
    title: "Departamento pessoal",
    description:
      "Suporte para admissões, férias, rescisões, documentos trabalhistas e rotinas de gestão de equipe.",
    icon: UsersRound,
    featured: true
  },
  {
    title: "MEI",
    description:
      "Orientação para microempreendedores individuais em rotinas, declarações e próximos passos de crescimento.",
    icon: BriefcaseBusiness,
    featured: false
  },
  {
    title: "Imposto de Renda Pessoa Física",
    description:
      "Atendimento para declaração de Imposto de Renda com atenção aos detalhes e segurança nas informações.",
    icon: ScrollText,
    featured: true
  },
  {
    title: "Certificado Digital",
    description:
      "Suporte para emissão e uso do certificado digital nas rotinas empresariais e obrigações eletrônicas.",
    icon: Signature,
    featured: false
  },
  {
    title: "Consultoria contábil",
    description:
      "Orientação consultiva para decisões empresariais com base em informações contábeis claras e confiáveis.",
    icon: Handshake,
    featured: false
  }
];

export const businessPains = [
  "Está abrindo uma empresa e não sabe por onde começar?",
  "Tem dúvidas sobre impostos e enquadramento?",
  "Precisa organizar obrigações trabalhistas?",
  "Quer trocar de contador e ter um atendimento mais próximo?"
];

export const differentials = [
  {
    title: "Atendimento humanizado",
    description: "Uma comunicação próxima, respeitosa e acessível para que você saiba o que precisa fazer.",
    icon: Handshake
  },
  {
    title: "Orientação clara e objetiva",
    description: "Explicações simples sobre obrigações contábeis, fiscais e trabalhistas, sem excesso de jargões.",
    icon: FileCheck2
  },
  {
    title: "Experiência com micro e pequenas empresas",
    description: "Rotinas pensadas para a realidade de quem empreende e precisa de apoio confiável no dia a dia.",
    icon: BriefcaseBusiness
  },
  {
    title: "Suporte contábil, fiscal e trabalhista",
    description: "Uma visão integrada das principais frentes que mantêm sua empresa organizada e regular.",
    icon: Calculator
  },
  {
    title: "Atendimento local em Cascavel",
    description: "Presença em Cascavel - PR para quem valoriza proximidade, contexto local e relacionamento.",
    icon: MapPin
  },
  {
    title: "Relacionamento próximo com o cliente",
    description: "Acompanhamento consultivo para apoiar melhores decisões com responsabilidade e segurança.",
    icon: UsersRound
  }
];
