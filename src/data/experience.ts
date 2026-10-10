import type { Locale } from '../i18n/routes';

export const experience = [
  {
    company: 'Agência Catus',
    start: '2026-10',
    end: null,
    role: { 'pt-BR': 'Engenheiro de IA', en: 'AI Engineer' },
    summary: {
      'pt-BR':
        'Pesquisa de IA para automação de processos e entrega de produtos. Desenvolvimento agêntico de lojas integradas a plataformas de e-commerce e de sites WordPress, com temas, funcionalidades, deploy, testes, validação e documentação.',
      en: 'AI research for process automation and product delivery. Agentic development of stores integrated with e-commerce platforms and WordPress sites, including themes, features, deployment, testing, validation, and documentation.',
    },
  },
  {
    company: 'EVAG',
    start: '2026-10',
    end: null,
    role: {
      'pt-BR': 'Engenheiro de Software e IA',
      en: 'Software & AI Engineer',
    },
    summary: {
      'pt-BR':
        'Pesquisa, análise e desenvolvimento de automações com IA para apoiar a operação. Desenvolvimento agêntico e manutenção de sistemas, com boas práticas de software, testes e segurança.',
      en: 'Research, analysis, and development of AI-powered automation to support operations. Agentic development and system maintenance, following software best practices, testing, and security.',
    },
  },
  {
    company: 'Agência Catus',
    start: '2026-06',
    end: '2026-09',
    role: { 'pt-BR': 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    summary: {
      'pt-BR':
        'Desenvolvimento e manutenção de plataformas de e-commerce e sites WordPress.',
      en: 'Development and maintenance of e-commerce platforms and WordPress sites.',
    },
  },
  {
    company: 'EVAG',
    start: '2024-04',
    end: '2026-09',
    role: { 'pt-BR': 'Desenvolvedor', en: 'Developer' },
    summary: {
      'pt-BR':
        'Automação Google Drive/WordPress para abaixo-assinados e atendimento integrado ao GitLab. Sistemas com Laravel, Python, JavaScript, WordPress e Tailwind, incluindo funcionalidades e correções em produção.',
      en: 'Petition automation via Google Drive/WordPress and request management integrated with GitLab. Systems with Laravel, Python, JavaScript, WordPress, and Tailwind, including features and production fixes.',
    },
  },
  {
    company: 'EVAG',
    start: '2023-04',
    end: '2024-03',
    role: { 'pt-BR': 'Product Owner', en: 'Product Owner' },
    summary: {
      'pt-BR':
        'Entrega de websites do levantamento ao deploy, conectando clientes, design e desenvolvimento. Requisitos, briefings, fluxos e priorização por negócio, UX e capacidade técnica.',
      en: 'Website delivery from discovery to deployment, connecting clients, design, and development. Requirements, briefs, workflows, and prioritization across business, UX, and technical capacity.',
    },
  },
];

export function period(start: string, end: string | null, locale: Locale) {
  const format = (date: string) =>
    new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
      .format(new Date(`${date}-01T00:00:00Z`))
      .replace('.', '');
  return `${format(start)} — ${end ? format(end) : locale === 'en' ? 'Present' : 'Presente'}`;
}
