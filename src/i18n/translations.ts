import type { Locale } from './routes';

const pt = {
  identity: {
    headline: 'Engenheiro de IA & Engenheiro de Software',
    supporting:
      'Python, RAG, Agentes, Evals | TypeScript, Bun, Node.js | Foco em Produto',
    description:
      'Engenheiro de IA e de Software com foco em Produto. Sistemas de IA e backend com Python, RAG, agentes, evals, TypeScript, Bun e Node.js.',
    pillars: 'Engenharia de IA · Engenharia de Software · Produto',
  },
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
    eyebrow: 'ENGENHEIRO DE IA & ENGENHEIRO DE SOFTWARE',
    title: {
      first: 'DE PROBLEMAS REAIS',
      second: 'A PRODUTOS DE IA.',
    },
    intro:
      'Construo produtos de IA confiáveis e sistemas backend do problema à produção.',
    body: 'RAG, agentes, avaliação, guardrails e observabilidade sobre uma base sólida de engenharia de software.',
    work: 'Ver projetos',
    contact: 'Vamos conversar',
    caption: 'Engenharia com perspectiva de produto.',
  },
  work: {
    eyebrow: '01 / TRABALHOS SELECIONADOS',
    title: 'Problemas reais.\nTrabalho concreto.',
    description:
      'RAG e agentes com controles de execução, avaliação e adaptação de modelos, backend resiliente e automação. Cada case apresenta evidências e limites explícitos.',
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
        text: 'Tecnologia e IA precisam justificar sua complexidade e gerar valor suficiente. Explicito trade-offs de segurança, confiabilidade, custo, latência e operação.',
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
      'Oportunidades profissionais, parcerias ou uma conversa sobre Engenharia de IA, software e produto.',
    email: 'Escreva para mim',
    linkedin: 'Conectar no LinkedIn',
  },
  projects: {
    eyebrow: 'PROJETOS',
    title: 'Do contexto\nà contribuição.',
    description:
      'Projetos de Engenharia de IA e de Software: RAG, agentes, evals, adaptação de modelos e backend confiável. Contribuições, trade-offs e evidências em cada case.',
  },
  articles: {
    eyebrow: 'ARTIGOS',
    title: 'Como penso\nengenharia.',
    description:
      'Decisões de Engenharia de IA, software e produto, com contexto, trade-offs e evidências. Artigos preservam o registro de cada experimento.',
    empty: 'Novos artigos estão em preparação.',
  },
  about: {
    eyebrow: 'SOBRE',
    title: 'IA, software\ne foco em Produto.',
    intro:
      'Sou Marcelo Taparelli, Engenheiro de IA e Engenheiro de Software com foco em Produto. Minha engenharia combina sistemas de IA com fundamentos fortes de backend: parto do problema, defino o comportamento esperado e construo uma solução que possa ser testada, observada e operada.',
    body: 'Componentes probabilísticos de IA precisam de controles determinísticos ao redor. Uso contratos tipados e schemas para validar saídas, políticas para limitar ações e testes e evals para verificar comportamento. Observabilidade, guardrails, fallbacks e aprovação humana tornam falhas visíveis e controláveis. Produto guia as decisões: confiabilidade, segurança, custo, latência e operação precisam fazer sentido para quem usa a solução.',
    journey: 'Uma trajetória de conexões',
    journeyText:
      'Antes e ao longo do trabalho com software, vendas, negociação e ensino de inglês ampliaram meu repertório de comunicação. Na atuação como Product Owner, trabalhei com briefing, requisitos, priorização e o ciclo de entrega de websites.',
    practice: 'Experiência profissional',
    capabilities: 'Competências em contexto',
    learning: 'Engenharia na prática',
    learningText:
      'No OpsPilot AI, construí RAG e workflows com agentes em Python/FastAPI, pgvector, LangGraph e OpenAI, com aprovação humana e OpenTelemetry. No Ops Triage AI, combinei baseline determinístico, LLM local e política híbrida; avaliei Jev e adaptei Laya com PyTorch/CUDA em experimentos separados do runtime. Na Resilient Transaction API, trabalhei idempotência, resiliência e operação observável com TypeScript/Bun, PostgreSQL e Redis, incluindo um laboratório AWS temporário, fora de produção. Tenho formação em Análise e Desenvolvimento de Sistemas, concluída em 2026.',
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
  identity: {
    headline: 'AI Engineer & Software Engineer',
    supporting:
      'Python, RAG, Agents, Evals | TypeScript, Bun, Node.js | Product-minded',
    description:
      'Product-minded AI Engineer & Software Engineer building AI and backend systems with Python, RAG, agents, evals, TypeScript, Bun and Node.js.',
    pillars: 'AI Engineering · Software Engineering · Product',
  },
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
    eyebrow: 'AI ENGINEER & SOFTWARE ENGINEER',
    title: {
      first: 'FROM REAL PROBLEMS',
      second: 'TO AI PRODUCTS.',
    },
    intro:
      'I build reliable AI products and backend systems from problem to production.',
    body: 'RAG, agents, evaluation, guardrails and observability on a solid software engineering foundation.',
    work: 'View projects',
    contact: 'Let’s talk',
    caption: 'Engineering with a product perspective.',
  },
  work: {
    eyebrow: '01 / SELECTED WORK',
    title: 'Real problems.\nTangible work.',
    description:
      'RAG and agents with execution controls, model evaluation and adaptation, resilient backend systems, and automation. Each case presents explicit evidence and limitations.',
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
        text: 'Technology and AI must justify their complexity and deliver enough value. I make trade-offs in security, reliability, cost, latency, and operability explicit.',
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
      'Professional opportunities, partnerships, or a conversation about AI Engineering, software, and product.',
    email: 'Send me an email',
    linkedin: 'Connect on LinkedIn',
  },
  projects: {
    eyebrow: 'PROJECTS',
    title: 'From context\nto contribution.',
    description:
      'AI and Software Engineering projects: RAG, agents, evals, model adaptation, and reliable backend systems. Each case defines contributions, trade-offs, and evidence.',
  },
  articles: {
    eyebrow: 'ARTICLES',
    title: 'How I think\nabout engineering.',
    description:
      'AI Engineering, software, and product decisions with context, trade-offs, and evidence. Articles preserve the record of each experiment.',
    empty: 'New articles are in preparation.',
  },
  about: {
    eyebrow: 'ABOUT',
    title: 'AI, software,\nand product thinking.',
    intro:
      'I’m Marcelo Taparelli, an AI Engineer & Software Engineer with a product mindset. My engineering combines AI systems with strong backend foundations: I start with the problem, define the expected behavior, and build a solution that can be tested, observed, and operated.',
    body: 'Probabilistic AI components need deterministic engineering controls around them. I use typed contracts and schemas to validate outputs, policies to bound actions, and tests and evals to verify behavior. Observability, guardrails, fallbacks, and human approval make failures visible and manageable. Product thinking guides the decisions: reliability, security, cost, latency, and operability must serve the people using the solution.',
    journey: 'A path of connections',
    journeyText:
      'Before and alongside software, sales, negotiation, and teaching English broadened my communication skills. As a Product Owner, I worked on briefs, requirements, prioritization, and the website delivery lifecycle.',
    practice: 'Professional experience',
    capabilities: 'Capabilities in context',
    learning: 'Engineering in practice',
    learningText:
      'In OpsPilot AI, I built RAG and agentic workflows with Python/FastAPI, pgvector, LangGraph, and OpenAI, with human approval and OpenTelemetry. In Ops Triage AI, I combined a deterministic baseline, a local LLM, and a hybrid policy; I evaluated Jev and adapted Laya with PyTorch/CUDA in experiments separate from the runtime. In Resilient Transaction API, I worked on idempotency, resilience, and observable operations with TypeScript/Bun, PostgreSQL, and Redis, including a temporary non-production AWS lab. I hold a degree in Systems Analysis and Development, completed in 2026.',
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
