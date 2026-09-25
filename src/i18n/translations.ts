import type { Locale } from './routes';

const pt = {
  nav: {
    projects: 'Projetos',
    about: 'Sobre',
    articles: 'Artigos',
    contact: 'Contato',
  },
  skip: 'Pular para o conteúdo',
  menu: 'Menu',
  navigation: 'Navegação principal',
  language: 'Selecionar idioma',
  readCase: 'Explorar case',
  allProjects: 'Todos os projetos',
  allArticles: 'Todos os artigos',
  readArticle: 'Ler artigo',
  cv: 'Baixar currículo',
  backProjects: 'Voltar aos projetos',
  backArticles: 'Voltar aos artigos',
  external: 'Visitar site',
  externalAria: (title: string) => `Visitar site: ${title} — abre em nova aba`,
  role: 'Minha contribuição',
  context: 'Contexto',
  stack: 'Tecnologias confirmadas',
  contents: 'Neste artigo',
  minuteRead: 'min de leitura',
  updated: 'Atualizado em',
  footerNote: 'Problema primeiro. Tecnologia depois.',
  hero: {
    eyebrow: 'SOFTWARE ENGINEER',
    title: {
      first: 'DE PROBLEMAS',
      second: 'REAIS',
      third: 'A PRODUTOS',
      fourth: 'INTELIGENTES',
    },
    intro:
      'Transformo problemas reais em software confiável, seguro e eficiente. Estou aprofundando essa base em Engenharia de IA Aplicada para construir sistemas inteligentes com comportamento mensurável e foco em produção.',
    work: 'Ver projetos',
    contact: 'Vamos conversar',
    caption: 'Engenharia com perspectiva de produto.',
  },
  work: {
    eyebrow: '01 / TRABALHOS SELECIONADOS',
    title: 'Problemas reais.\nTrabalho concreto.',
    description:
      'Experiência com software em produção, automação e projetos autorais com evidências e limites explícitos.',
  },
  thinking: {
    eyebrow: '02 / COMO TOMO DECISÕES',
    title: 'O problema vem\nantes do código.',
    description:
      'Entender o que precisa mudar é parte do trabalho de engenharia.',
    items: [
      {
        title: 'Entender o contexto',
        text: 'Quem usa, o que precisa resolver e quais restrições importam. A solução começa nessas perguntas.',
      },
      {
        title: 'Escolher com critério',
        text: 'Complexidade precisa se justificar. Tecnologia, arquitetura e IA devem servir ao problema.',
      },
      {
        title: 'Examinar o resultado',
        text: 'Testar as regras críticas, observar falhas e latência, reconhecer os limites e medir o que importa.',
      },
    ],
  },
  experience: {
    eyebrow: '03 / EXPERIÊNCIA E COMPETÊNCIAS',
    title: 'Engenharia com\nvisão do todo.',
    description:
      'Uma trajetória que conecta produto, clientes, comunicação e desenvolvimento de software.',
    link: 'Mais sobre minha trajetória',
    current: 'Presente',
  },
  writing: {
    eyebrow: '04 / ARTIGOS',
    title: 'Decisões, por escrito.',
    description:
      'O raciocínio, os limites e as evidências por trás do trabalho.',
  },
  contact: {
    eyebrow: 'VAMOS CONVERSAR',
    title: 'Bons produtos começam\ncom uma boa conversa.',
    description:
      'Oportunidades profissionais, parcerias ou uma conversa sobre software, engenharia e IA aplicada.',
    email: 'Escreva para mim',
    linkedin: 'Conectar no LinkedIn',
  },
  projects: {
    eyebrow: 'PROJETOS',
    title: 'Do contexto\nà contribuição.',
    description:
      'Uma seleção de sistemas, aplicações web e automações. Cada case delimita minha contribuição e apresenta as evidências disponíveis.',
  },
  articles: {
    eyebrow: 'ARTIGOS',
    title: 'Como penso\nengenharia.',
    description:
      'Decisões técnicas, produto e aprendizado documentado. Com contexto, trade-offs e evidências.',
    empty: 'Novos artigos estão em preparação.',
  },
  about: {
    eyebrow: 'SOBRE',
    title: 'Software, produto\ne o problema humano.',
    intro:
      'Sou Marcelo Taparelli, engenheiro de software. Minha trajetória combina experiência prática em desenvolvimento de software e produto com formação em Análise e Desenvolvimento de Sistemas, concluída em 2026, complementada por estudos em Engenharia de Software pela Alura e aprofundamento atual em Engenharia de IA Aplicada.',
    body: 'Atuo com backend, APIs, aplicações web, automação e evolução de sistemas. Considero segurança parte do desenho: explicito limites de acesso, valido entradas, protejo segredos e testo regras críticas. Para confiabilidade e performance, uso limites de recursos, acesso a dados previsível e latência medida. Também uso AI coding agents para apoiar planejamento, implementação, debugging, testes e validação, sempre com revisão humana e quality gates.',
    journey: 'Uma trajetória de conexões',
    journeyText:
      'Antes e ao longo do trabalho com software, vendas, negociação e ensino de inglês ampliaram meu repertório de comunicação. Na atuação como Product Owner, trabalhei com briefing, requisitos, priorização e o ciclo de entrega de websites.',
    practice: 'Experiência profissional',
    capabilities: 'Competências em contexto',
    learning: 'Aprofundamento atual',
    learningText:
      'Meu aprofundamento está na interseção entre a Engenharia de Software performática, segura e confiável e a Engenharia de IA aplicada e mensurável. No Ops Triage AI, trabalho com baseline determinístico, Ollama, HybridPolicy, revisão humana e trilha de auditoria; Jev 1.13 foi avaliado depois, isoladamente, no mesmo benchmark held-out congelado e não entrou na HybridPolicy. Na Resilient Transaction API, exploro idempotência concorrente, PostgreSQL como fonte de verdade, degradação graciosa quando Redis fica indisponível, resiliência do provider e operação observável. Um laboratório temporário de validação na AWS, fora de produção, exercitou o ciclo com Terraform, migrations, testes funcionais e auditoria após a destruição dos recursos.',
    complementary: 'Formação complementar — Alura',
    complementaryItems: [
      'Engenharia de Software',
      'Microsserviços',
      'Back-end',
      'APIs com Node.js e Express',
      'Autenticação, testes e segurança em Node.js',
      'DevOps e CI/CD',
      'Cloud / AWS',
      'Desenvolvimento Seguro / Cibersegurança',
    ],
    complementaryCta: 'Ver formação completa na Alura',
    complementaryLink:
      'https://cursos.alura.com.br/user/contato-marcelotaparelli-com-br/fullCertificate/19f834e62e372bdd70c34a584dbad811',
  },
  notFound: {
    eyebrow: 'ERRO 404',
    title: 'Este caminho\nnão leva a uma página.',
    description:
      'O endereço pode estar incorreto ou a página pode não estar disponível.',
    action: 'Voltar ao início',
  },
};

type Translations = typeof pt;
const en: Translations = {
  nav: {
    projects: 'Projects',
    about: 'About',
    articles: 'Articles',
    contact: 'Contact',
  },
  skip: 'Skip to content',
  menu: 'Menu',
  navigation: 'Main navigation',
  language: 'Select language',
  readCase: 'Explore case',
  allProjects: 'All projects',
  allArticles: 'All articles',
  readArticle: 'Read article',
  cv: 'Download résumé',
  backProjects: 'Back to projects',
  backArticles: 'Back to articles',
  external: 'Visit website',
  externalAria: (title: string) =>
    `Visit website: ${title} — opens in a new tab`,
  role: 'My contribution',
  context: 'Context',
  stack: 'Confirmed technologies',
  contents: 'In this article',
  minuteRead: 'min read',
  updated: 'Updated',
  footerNote: 'Problem first. Technology second.',
  hero: {
    eyebrow: 'SOFTWARE ENGINEER',
    title: {
      first: 'FROM REAL',
      second: 'PROBLEMS',
      third: 'TO INTELLIGENT',
      fourth: 'PRODUCTS',
    },
    intro:
      'I turn real problems into reliable, secure, and efficient software. I’m deepening that foundation in Applied AI Engineering to build intelligent systems with measurable behavior and a production focus.',
    work: 'View projects',
    contact: 'Let’s talk',
    caption: 'Engineering with a product perspective.',
  },
  work: {
    eyebrow: '01 / SELECTED WORK',
    title: 'Real problems.\nTangible work.',
    description:
      'Experience with software in production, automation, and authored projects with explicit evidence and limitations.',
  },
  thinking: {
    eyebrow: '02 / HOW I MAKE DECISIONS',
    title: 'The problem comes\nbefore the code.',
    description: 'Understanding what needs to change is part of engineering.',
    items: [
      {
        title: 'Understand the context',
        text: 'Who uses it, what they need to solve, and which constraints matter. The solution starts with these questions.',
      },
      {
        title: 'Choose deliberately',
        text: 'Complexity needs a reason. Technology, architecture, and AI should serve the problem.',
      },
      {
        title: 'Examine the outcome',
        text: 'Test critical rules, observe failures and latency, acknowledge limits, and measure what matters.',
      },
    ],
  },
  experience: {
    eyebrow: '03 / EXPERIENCE & CAPABILITIES',
    title: 'Engineering with\nthe whole picture.',
    description:
      'A path connecting product, clients, communication, and software development.',
    link: 'More about my background',
    current: 'Present',
  },
  writing: {
    eyebrow: '04 / ARTICLES',
    title: 'Decisions, in writing.',
    description: 'The reasoning, limitations, and evidence behind the work.',
  },
  contact: {
    eyebrow: 'LET’S TALK',
    title: 'Good products start\nwith a good conversation.',
    description:
      'Professional opportunities, partnerships, or a conversation about software, engineering, and applied AI.',
    email: 'Send me an email',
    linkedin: 'Connect on LinkedIn',
  },
  projects: {
    eyebrow: 'PROJECTS',
    title: 'From context\nto contribution.',
    description:
      'A selection of systems, web applications, and automation. Each case defines my contribution and presents the available evidence.',
  },
  articles: {
    eyebrow: 'ARTICLES',
    title: 'How I think\nabout engineering.',
    description:
      'Technical decisions, product thinking, and documented learning. With context, trade-offs, and evidence.',
    empty: 'New articles are in preparation.',
  },
  about: {
    eyebrow: 'ABOUT',
    title: 'Software, product,\nand the human problem.',
    intro:
      'I’m Marcelo Taparelli, a software engineer. My background combines hands-on experience in software development and product with a completed degree in Systems Analysis and Development, complemented by Software Engineering studies at Alura and my current focus on Applied AI Engineering.',
    body: 'I work across backend systems, APIs, web applications, automation, and system evolution. I treat security as part of software design: I make access boundaries explicit, validate inputs, protect secrets, and test critical rules. For reliability and performance, I use resource limits, predictable data access, and measured latency. I also use AI coding agents for planning, implementation, debugging, testing, and validation, with human review and quality gates.',
    journey: 'A path of connections',
    journeyText:
      'Before and alongside software, sales, negotiation, and teaching English broadened my communication skills. As a Product Owner, I worked on briefs, requirements, prioritization, and the website delivery lifecycle.',
    practice: 'Professional experience',
    capabilities: 'Capabilities in context',
    learning: 'Current focus',
    learningText:
      'My current focus sits at the intersection of performant, secure, and reliable Software Engineering and applied, measurable AI Engineering. In Ops Triage AI, I work with a deterministic baseline, Ollama, HybridPolicy, human review, and an audit trail; Jev 1.13 was later evaluated separately on the same frozen held-out set and was not added to HybridPolicy. In Resilient Transaction API, I explore concurrent idempotency, PostgreSQL as source of truth, graceful degradation when Redis is unavailable, provider resilience, and observable operations. A temporary non-production AWS validation lab exercised the Terraform, migrations, functional tests, and post-destroy resource audit lifecycle.',
    complementary: 'Additional training — Alura',
    complementaryItems: [
      'Software Engineering',
      'Microservices',
      'Back-end',
      'APIs with Node.js and Express',
      'Authentication, Testing and Security with Node.js',
      'DevOps and CI/CD',
      'Cloud / AWS',
      'Secure Development / Cybersecurity',
    ],
    complementaryCta: 'View full training record',
    complementaryLink:
      'https://cursos.alura.com.br/user/contato-marcelotaparelli-com-br/fullCertificate/19f834e62e372bdd70c34a584dbad811',
  },
  notFound: {
    eyebrow: 'ERROR 404',
    title: 'This path doesn’t\nlead to a page.',
    description:
      'The address may be incorrect, or the page may no longer be available.',
    action: 'Back to home',
  },
};

export const t = (locale: Locale): Translations => (locale === 'en' ? en : pt);
