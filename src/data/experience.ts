import type { Locale } from '../i18n/routes';

export const experience = [
  {
    company: 'Agência Catus',
    start: '2026-07',
    end: null,
    role: { 'pt-BR': 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    summary: {
      'pt-BR':
        'Aplicações web, WordPress e Wake. Site institucional, blogs, customização, performance e investigação de problemas em produção.',
      en: 'Web applications, WordPress, and Wake. Institutional website, blogs, customization, performance, and production troubleshooting.',
    },
  },
  {
    company: 'EVAG',
    start: '2024-04',
    end: null,
    role: { 'pt-BR': 'Desenvolvedor', en: 'Developer' },
    summary: {
      'pt-BR':
        'Sistemas, sites e automação. Google Drive → WordPress, geração de páginas de abaixo-assinados e solução de atendimento integrada ao GitLab.',
      en: 'Systems, websites, and automation. Google Drive → WordPress, petition page generation, and a support solution integrated with GitLab.',
    },
  },
  {
    company: 'EVAG',
    start: '2023-04',
    end: '2024-03',
    role: { 'pt-BR': 'Product Owner', en: 'Product Owner' },
    summary: {
      'pt-BR':
        'Ciclo de entrega de websites: clientes, briefing, requisitos, design, desenvolvimento, priorização e melhoria de processos.',
      en: 'Website delivery lifecycle: clients, briefs, requirements, design, development, prioritization, and process improvement.',
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
