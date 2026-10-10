import type { Locale } from './routes';

const pt = {
  identity: {
    headline: 'Engenheiro de IA | Engenheiro de Software',
    supporting:
      'Python, RAG, Agentes, Evals | TypeScript, Bun, Node.js | Foco em Produto',
    description:
      'Engenheiro de IA com base em Engenharia de Software e experiência em backend, APIs e produção. Pesquisa de IA, automação de processos e desenvolvimento agêntico com visão de produto.',
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
      'Atuo com pesquisa de IA, automação de processos e desenvolvimento agêntico na Agência Catus e na EVAG, combinando Engenharia de Software e visão de produto.',
    body: 'Construo RAG, agentes e Machine Learning com avaliação, guardrails e revisão humana, apoiado por experiência em backend, APIs e produção.',
    work: 'Ver projetos',
    contact: 'Vamos conversar',
    caption: 'Engenharia com perspectiva de produto.',
  },
  work: {
    eyebrow: '02 / TRABALHOS SELECIONADOS',
    title: 'Problemas reais.\nTrabalho concreto.',
    description:
      'RAG e agentes com controles de execução, avaliação e adaptação de modelos, Machine Learning com avaliação rigorosa, backend resiliente e automação. Cada case apresenta evidências e limites explícitos.',
  },
  experience: {
    eyebrow: '03 / EXPERIÊNCIA E COMPETÊNCIAS',
    title: 'Engenharia com\nvisão do todo.',
    description:
      'De Product Owner à Engenharia de Software e IA: entrega de websites, sistemas em produção, automação de processos e desenvolvimento agêntico. Desde outubro de 2026, atuo como Engenheiro de IA na Agência Catus e Engenheiro de Software e IA na EVAG.',
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
      'Projetos de Engenharia de IA e de Software: RAG, agentes, evals, adaptação de modelos, Machine Learning com avaliação rigorosa e backend confiável. Contribuições, trade-offs e evidências em cada case.',
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
      'Do problema de negócio à produção: domínio, arquitetura e restrições definem onde a IA entra. Verificação, segurança e medição tornam o sistema confiável e evolutivo.',
    scope:
      'Cada case mostra até onde esse método foi exercitado, com limites e evidências explícitos.',
  },
  about: {
    eyebrow: 'SOBRE',
    title: 'Engenharia de IA.\nBase em Software.\nVisão de Produto.',
    intro:
      'Sou Marcelo Taparelli, Engenheiro de IA na Agência Catus e Engenheiro de Software e IA na EVAG. Trabalho com pesquisa de IA, automação de processos e desenvolvimento agêntico, com experiência em backend, APIs, sistemas em produção e produto. Parto do problema de negócio antes de escolher a tecnologia.',
    body: 'Verificação, segurança e operação orientam o caminho à produção. Cerco componentes probabilísticos com contratos tipados, políticas determinísticas, testes, evals, fallbacks e aprovação humana. Observabilidade e medição orientam melhorias dentro dos limites de cada avaliação. Produto é a visão para decidir por que construir, para quem, qual valor importa e quais trade-offs aceitar.',
    journey: 'Uma trajetória de conexões',
    journeyText:
      'Na EVAG, comecei como Product Owner em abril de 2023, conectando clientes, design e desenvolvimento na entrega de websites. Em abril de 2024, passei ao desenvolvimento de sistemas e automações, com funcionalidades e correções em produção. Na Agência Catus, atuei como Desenvolvedor Full Stack de junho a setembro de 2026, em e-commerce e WordPress. Desde outubro de 2026, exerço os cargos de Engenharia de IA na Catus e de Engenharia de Software e IA na EVAG, pesquisando métodos com IA e desenvolvendo automações e sistemas.',
    practice: 'Experiência profissional',
    capabilities: 'Competências em contexto',
    learning: 'Engenharia na prática',
    learningText:
      'No OpsPilot AI, construí RAG e workflows com agentes em Python/FastAPI, pgvector, LangGraph e OpenAI, com aprovação humana e OpenTelemetry. No Ops Triage AI, combinei baseline determinístico, LLM local e política híbrida; avaliei Jev e adaptei Laya com PyTorch/CUDA em experimentos separados do runtime. No DefectRisk, trabalhei avaliação de ML sem contaminação por duplicatas, ranking de risco, calibração e incerteza. Na Resilient Transaction API, trabalhei idempotência, resiliência e operação observável com TypeScript/Bun, PostgreSQL e Redis, incluindo um laboratório AWS temporário, fora de produção.',
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
      'AI Engineer with a Software Engineering foundation and experience in backend, APIs, and production. AI research, process automation, and agentic development with a product perspective.',
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
      'I work on AI research, process automation, and agentic development at Agência Catus and EVAG, combining Software Engineering with a product perspective.',
    body: 'I build RAG, agents, and Machine Learning with evaluation, guardrails, and human review, supported by experience in backend, APIs, and production.',
    work: 'View projects',
    contact: 'Let’s talk',
    caption: 'Engineering with a product perspective.',
  },
  work: {
    eyebrow: '02 / SELECTED WORK',
    title: 'Real problems.\nTangible work.',
    description:
      'RAG and agents with execution controls, model evaluation and adaptation, rigorously evaluated Machine Learning, resilient backend systems, and automation. Each case presents explicit evidence and limitations.',
  },
  experience: {
    eyebrow: '03 / EXPERIENCE & CAPABILITIES',
    title: 'Engineering with\nthe whole picture.',
    description:
      'From Product Owner to Software and AI Engineering: website delivery, production systems, process automation, and agentic development. Since October 2026, I work as an AI Engineer at Agência Catus and a Software & AI Engineer at EVAG.',
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
      'AI and Software Engineering projects: RAG, agents, evals, model adaptation, rigorously evaluated Machine Learning, and reliable backend systems. Each case defines contributions, trade-offs, and evidence.',
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
      'From business problem to production: domain, architecture, and constraints define where AI fits. Verification, security, and measurement make the system reliable and able to evolve.',
    scope:
      'Each case shows how far this method was exercised, with explicit evidence and limitations.',
  },
  about: {
    eyebrow: 'ABOUT',
    title: 'AI Engineering.\nSoftware foundation.\nProduct lens.',
    intro:
      'I’m Marcelo Taparelli, an AI Engineer at Agência Catus and a Software & AI Engineer at EVAG. I work on AI research, process automation, and agentic development, with experience in backend, APIs, production systems, and product. I start with the business problem before choosing the technology.',
    body: 'Verification, security, and operability guide the path to production. I surround probabilistic components with typed contracts, deterministic policies, tests, evals, fallbacks, and human approval. Observability and measurement support improvements within the limits of each evaluation. Product is my lens for deciding why to build, who it serves, which value matters, and which trade-offs to accept.',
    journey: 'A path of connections',
    journeyText:
      'At EVAG, I started as a Product Owner in April 2023, connecting clients, design, and development to deliver websites. In April 2024, I moved into systems development and automation, including features and production fixes. At Agência Catus, I worked as a Full Stack Developer from June to September 2026 on e-commerce and WordPress. Since October 2026, I hold AI Engineering and Software & AI Engineering roles at Catus and EVAG respectively, researching AI-assisted methods and developing automation and systems.',
    practice: 'Professional experience',
    capabilities: 'Capabilities in context',
    learning: 'Engineering in practice',
    learningText:
      'In OpsPilot AI, I built RAG and agentic workflows with Python/FastAPI, pgvector, LangGraph, and OpenAI, with human approval and OpenTelemetry. In Ops Triage AI, I combined a deterministic baseline, a local LLM, and a hybrid policy; I evaluated Jev and adapted Laya with PyTorch/CUDA in experiments separate from the runtime. In DefectRisk, I worked on leakage-safe ML evaluation, risk ranking, calibration, and uncertainty. In Resilient Transaction API, I worked on idempotency, resilience, and observable operations with TypeScript/Bun, PostgreSQL, and Redis, including a temporary non-production AWS lab.',
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
