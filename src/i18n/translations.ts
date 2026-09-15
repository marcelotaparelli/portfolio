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
      'Construo software para resolver problemas reais. Estou aprofundando essa experiência em Engenharia de IA Aplicada para desenvolver sistemas e produtos inteligentes.',
    work: 'Ver projetos',
    contact: 'Vamos conversar',
    caption: 'Engenharia com perspectiva de produto.',
  },
  work: {
    eyebrow: '01 / TRABALHOS SELECIONADOS',
    title: 'Problemas reais.\nTrabalho concreto.',
    description:
      'Software em produção, automação de processos e a contribuição por trás de cada entrega.',
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
        text: 'Olhar para o que foi entregue, reconhecer os limites e identificar o que ainda precisa ser medido.',
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
      'Uma seleção de trabalhos em desenvolvimento web e automação. Cada case delimita minha atuação e o que pode ser compartilhado.',
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
    body: 'Atuo com aplicações web, automação e manutenção de sistemas. Hoje, estou aprofundando essa base em Engenharia de IA Aplicada, com foco em sistemas e produtos inteligentes. Também incorporo agentes de IA ao fluxo de engenharia de software para apoiar planejamento, implementação, debugging, testes e validação, mantendo revisão humana e critérios explícitos de qualidade.',
    journey: 'Uma trajetória de conexões',
    journeyText:
      'Antes e ao longo do trabalho com software, vendas, negociação e ensino de inglês ampliaram meu repertório de comunicação. Na atuação como Product Owner, trabalhei com briefing, requisitos, priorização e o ciclo de entrega de websites.',
    practice: 'Experiência profissional',
    capabilities: 'Competências em contexto',
    learning: 'Aprofundamento atual',
    learningText:
      'Engenharia de IA Aplicada: entender quando a IA é necessária, como avaliar sua qualidade e como lidar com custo, latência e falhas. Hoje aprofundo essa frente por meio de estudo, experimentação e construção prática, avaliando quando a IA realmente agrega valor ao produto. O case ops-triage-ai aplica isso na prática: triagem operacional com LLM local, baseline determinístico e política híbrida com human review e audit trail, avaliado em benchmark held-out congelado.',
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
      'I build software to solve real problems. I’m deepening that experience through Applied AI Engineering to develop intelligent systems and products.',
    work: 'View projects',
    contact: 'Let’s talk',
    caption: 'Engineering with a product perspective.',
  },
  work: {
    eyebrow: '01 / SELECTED WORK',
    title: 'Real problems.\nTangible work.',
    description:
      'Software in production, process automation, and the contribution behind each delivery.',
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
        text: 'Look at what was delivered, acknowledge its limits, and identify what still needs to be measured.',
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
      'Selected work in web development and automation. Each case explains my role and what can be shared.',
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
    body: 'I work on web applications, automation, and system maintenance. Today, I’m deepening that foundation through Applied AI Engineering, with a focus on intelligent systems and products. I also incorporate AI coding agents into my software engineering workflow for planning, implementation, debugging, testing, and validation, while maintaining human review and explicit quality gates.',
    journey: 'A path of connections',
    journeyText:
      'Before and alongside software, sales, negotiation, and teaching English broadened my communication skills. As a Product Owner, I worked on briefs, requirements, prioritization, and the website delivery lifecycle.',
    practice: 'Professional experience',
    capabilities: 'Capabilities in context',
    learning: 'Current focus',
    learningText:
      'Applied AI Engineering: understanding when AI is needed, how to evaluate its quality, and how to handle cost, latency, and failures. Today, I deepen this area through study, experimentation, and practical building, evaluating when AI genuinely adds value to a product. The completed ops-triage-ai case applies this in practice: operational triage with a local LLM, a deterministic baseline, and a hybrid policy with human review and an audit trail, evaluated on a frozen held-out benchmark.',
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
