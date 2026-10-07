import type { Locale } from './routes';

const pt = {
  identity: {
    headline: 'Engenheiro de IA | Engenheiro de Software',
    supporting:
      'Python, RAG, Agentes, Evals | TypeScript, Bun, Node.js | Foco em Produto',
    description:
      'Engenheiro de IA com base sólida em Engenharia de Software e visão de Produto. Do problema de negócio à produção, com verificação, segurança e medição.',
    pillars: 'Engenharia de IA · Base em Software · Visão de Produto',
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
      'Construo sistemas de IA do problema de negócio à produção, combinando Engenharia de IA, Engenharia de Software, verificação, segurança, observabilidade e medição.',
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
  method: {
    eyebrow: 'MÉTODO DE ENGENHARIA',
    title: 'Como construo sistemas de IA.',
    description:
      'Do problema de negócio à produção: domínio, arquitetura e restrições orientam a orquestração de IA, a verificação e a segurança. Medição orienta a melhoria.',
    scope:
      'Cada case mostra até onde esse método foi exercitado: experimentos, laboratórios e integrações têm limites explícitos.',
  },
  about: {
    eyebrow: 'SOBRE',
    title: 'Engenharia de IA.\nBase em Software.\nVisão de Produto.',
    intro:
      'Sou Marcelo Taparelli, Engenheiro de IA com uma base sólida em Engenharia de Software e experiência em produto. Parto do problema de negócio, modelo o domínio e defino arquitetura e restrições antes de escolher RAG, modelos de decisão ou agentes, quando fazem sentido.',
    body: 'Verificação, segurança e operação orientam o caminho à produção. Cerco componentes probabilísticos com contratos tipados, políticas determinísticas, testes, evals, fallbacks e aprovação humana. Observabilidade e medição orientam melhorias dentro dos limites de cada avaliação. Produto é a visão para decidir por que construir, para quem, qual valor importa e quais trade-offs aceitar.',
    journey: 'Uma trajetória de conexões',
    journeyText:
      'Antes e ao longo do trabalho com software, vendas, negociação e ensino de inglês ampliaram meu repertório de comunicação. Na atuação como Product Owner, trabalhei com briefing, requisitos, priorização e o ciclo de entrega de websites.',
    practice: 'Experiência profissional',
    capabilities: 'Competências em contexto',
    learning: 'Engenharia na prática',
    learningText:
      'No OpsPilot AI, construí RAG e workflows com agentes em Python/FastAPI, pgvector, LangGraph e OpenAI, com aprovação humana e OpenTelemetry. No Ops Triage AI, combinei baseline determinístico, LLM local e política híbrida; avaliei Jev e adaptei Laya com PyTorch/CUDA em experimentos separados do runtime. Na Resilient Transaction API, trabalhei idempotência, resiliência e operação observável com TypeScript/Bun, PostgreSQL e Redis, incluindo um laboratório AWS temporário, fora de produção.',
    education: {
      heading: 'Formação',
      postgraduate: {
        title: 'Pós-graduação em Engenharia de IA',
        detail: 'Em andamento · conclusão prevista: abril de 2027',
      },
      degree: {
        title: 'Análise e Desenvolvimento de Sistemas',
        detail: 'Concluído em 2026',
      },
      coursework: {
        title: 'Engenharia de Software — Alura',
        detail:
          'Back-end\u00a0· APIs Node.js\u00a0· Autenticação\u00a0· Testes\u00a0· Segurança\u00a0· DevOps/CI/CD\u00a0· Cloud/AWS\u00a0· Desenvolvimento Seguro',
      },
    },
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
    headline: 'AI Engineer | Software Engineer',
    supporting:
      'Python, RAG, Agents, Evals | TypeScript, Bun, Node.js | Product-minded',
    description:
      'AI Engineer with a strong Software Engineering foundation and a Product mindset. From business problem to production, with verification, security and measurement.',
    pillars: 'AI Engineering · Software foundation · Product lens',
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
      'I build AI systems from the business problem to production — combining AI Engineering, Software Engineering, verification, security, observability and measurement.',
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
  method: {
    eyebrow: 'ENGINEERING METHOD',
    title: 'How I build AI systems.',
    description:
      'From business problem to production: domain, architecture, and constraints guide AI orchestration, verification, and security. Measurement guides improvement.',
    scope:
      'Each case shows how far this method was exercised: experiments, labs, and integrations have explicit limits.',
  },
  about: {
    eyebrow: 'ABOUT',
    title: 'AI Engineering.\nSoftware foundation.\nProduct lens.',
    intro:
      'I’m Marcelo Taparelli, an AI Engineer with a strong Software Engineering foundation and a Product mindset. I start with the business problem, model the domain, and define architecture and constraints before choosing RAG, decision models, or agents where they add value.',
    body: 'Verification, security, and operability guide the path to production. I surround probabilistic components with typed contracts, deterministic policies, tests, evals, fallbacks, and human approval. Observability and measurement support improvements within the limits of each evaluation. Product is my lens for deciding why to build, who it serves, which value matters, and which trade-offs to accept.',
    journey: 'A path of connections',
    journeyText:
      'Before and alongside software, sales, negotiation, and teaching English broadened my communication skills. As a Product Owner, I worked on briefs, requirements, prioritization, and the website delivery lifecycle.',
    practice: 'Professional experience',
    capabilities: 'Capabilities in context',
    learning: 'Engineering in practice',
    learningText:
      'In OpsPilot AI, I built RAG and agentic workflows with Python/FastAPI, pgvector, LangGraph, and OpenAI, with human approval and OpenTelemetry. In Ops Triage AI, I combined a deterministic baseline, a local LLM, and a hybrid policy; I evaluated Jev and adapted Laya with PyTorch/CUDA in experiments separate from the runtime. In Resilient Transaction API, I worked on idempotency, resilience, and observable operations with TypeScript/Bun, PostgreSQL, and Redis, including a temporary non-production AWS lab.',
    education: {
      heading: 'Education',
      postgraduate: {
        title: 'Postgraduate Program in AI Engineering',
        detail: 'In progress · expected completion: April 2027',
      },
      degree: {
        title: 'Systems Analysis and Development',
        detail: 'Completed in 2026',
      },
      coursework: {
        title: 'Software Engineering — Alura',
        detail:
          'Back-end\u00a0· Node.js APIs\u00a0· Authentication\u00a0· Testing\u00a0· Security\u00a0· DevOps/CI/CD\u00a0· Cloud/AWS\u00a0· Secure Development',
      },
    },
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
