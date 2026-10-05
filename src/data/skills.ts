export const skills = [
  {
    title: { 'pt-BR': 'Engenharia de IA', en: 'AI Engineering' },
    description: {
      'pt-BR':
        'Python, FastAPI, LLMs, RAG, embeddings, pgvector e busca híbrida. Agentes com LangGraph e OpenAI, structured outputs, guardrails, aprovação humana e observabilidade com OpenTelemetry. Evals com baselines determinísticos e held-outs congelados; domain adaptation/fine-tuning com PyTorch, GPU/CUDA, mixed precision, seleção de checkpoints por validation e análise de confidence/calibration.',
      en: 'Python, FastAPI, LLMs, RAG, embeddings, pgvector, and hybrid retrieval. Agents with LangGraph and OpenAI, structured outputs, guardrails, human approval, and OpenTelemetry observability. Evals with deterministic baselines and frozen held-outs; domain adaptation/fine-tuning with PyTorch, GPU/CUDA, mixed precision, validation-based checkpoint selection, and confidence/calibration analysis.',
    },
    tools: null,
  },
  {
    title: { 'pt-BR': 'Engenharia de Software', en: 'Software Engineering' },
    description: {
      'pt-BR':
        'TypeScript, Bun, Node.js, APIs REST, SQL/PostgreSQL, Redis, Docker, Terraform e Git. Arquitetura de software, Clean Architecture, princípios de DDD, SOLID, Clean Code, TDD e fundamentos de microsserviços. Testes unitários, de integração e E2E, CI/CD com GitHub Actions e entrega baseada em artefatos. Experiência prática em lab AWS temporário, fora de produção: VPC/subnets, ECS/Fargate, ALB, RDS, ElastiCache, ECR, Secrets Manager, IAM e CloudWatch, com migrations, troubleshooting e auditoria após destroy.',
      en: 'TypeScript, Bun, Node.js, REST APIs, SQL/PostgreSQL, Redis, Docker, Terraform, and Git. Software architecture, Clean Architecture, DDD principles, SOLID, Clean Code, TDD, and microservices fundamentals. Unit, integration, and E2E tests, CI/CD with GitHub Actions, and artifact-based delivery. Hands-on temporary non-production AWS lab: VPC/subnets, ECS/Fargate, ALB, RDS, ElastiCache, ECR, Secrets Manager, IAM, and CloudWatch, with migrations, troubleshooting, and post-destroy auditing.',
    },
    tools: null,
  },
  {
    title: {
      'pt-BR': 'Produto e práticas de engenharia',
      en: 'Product thinking & engineering practices',
    },
    description: {
      'pt-BR':
        'Entender o problema antes de escolher tecnologia e usar IA quando o valor justificar. Resultados mensuráveis e trade-offs explícitos entre confiabilidade, segurança, performance, custo, latência e operação. Autenticação, autorização, gestão de segredos, limites de recursos e observabilidade fazem parte do desenho. Componentes probabilísticos são cercados por contratos tipados, políticas, testes, evals e fallbacks; automação assistida por IA passa por revisão humana e quality gates.',
      en: 'Understand the problem before choosing technology and use AI when its value justifies it. Measurable outcomes and explicit trade-offs across reliability, security, performance, cost, latency, and operability. Authentication, authorization, secret management, resource limits, and observability are part of the design. Probabilistic components are surrounded by typed contracts, policies, tests, evals, and fallbacks; AI-assisted work goes through human review and quality gates.',
    },
    tools: null,
  },
];
