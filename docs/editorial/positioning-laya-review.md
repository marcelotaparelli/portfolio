# Revisão institucional — Engenharia de IA e evidência Laya

Data editorial: 2026-10-02. Escopo: atualização local do portfolio; sem push,
deploy, distribuição externa ou novos benchmarks.

## Audit e ocorrências classificadas

Foram lidos os CVs e CSS, skills, traduções, cases Ops Triage PT/EN, artigos
Laya e Jev completos, AGENTS, schema, documentação de estado, geração de CV,
release checker, validação de artifacts, publicação/paridade e E2E existentes.
A base profissional continua Software Engineering.

| Superfície                              | Atualização institucional                                                                     |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| CV PT-BR                                | Header: Software Engineer \| Engenharia de IA; resumo e competência atualizados               |
| CV EN                                   | Header: Software Engineer \| AI Engineering; resumo e competência atualizados                 |
| Home PT/EN                              | Hero.intro passa a Engenharia de IA / AI Engineering, sem universidade ou ferramentas no hero |
| Metadata Home PT/EN                     | Title passa a Software Engineer \| Engenharia de IA / AI Engineering                          |
| Home, About e footer                    | Assinaturas Software Engineering · AI Engineering · Product                                   |
| About.intro PT/EN                       | Formação nova em andamento e Software Engineer como identidade                                |
| About.learningText PT/EN                | Direção AI Engineering, avaliação/adaptação e primeira prática em ML Systems                  |
| Contato PT/EN                           | Copy institucional passa a software e Engenharia de IA / software and AI Engineering          |
| Skills PT/EN                            | Título já era Engenharia de IA / AI Engineering; descrição ganhou evidência prática           |
| README                                  | Apresentação do portfolio e assinatura do autor passam a AI Engineering                       |
| OG PT/EN                                | Copy do gerador e duas imagens regeneradas passam a Engenharia de IA / AI Engineering         |
| Artigo da construção do portfolio PT/EN | Apenas a frase que descreve diretamente o posicionamento do autor foi atualizada              |

As categorias técnicas IA aplicada / Applied AI de artigos e do case foram
preservadas. Não houve substituição cega de conceitos técnicos. Os registros
históricos em implementation-status permanecem registros datados; esta entrada
nova os contextualiza. Não resta Engenharia de IA Aplicada ou Applied AI
Engineering nas fontes institucionais atuais auditadas.

## Resumos profissionais finais

PT-BR:

Engenheiro de Software com experiência em backend, APIs, aplicações web, automação e sistemas em produção. Desenvolvo software confiável, testável e seguro, com atenção a observabilidade e performance. Curso Pós-graduação em Engenharia de IA e aprofundo a área com avaliação, adaptação de modelos e experimentos reproduzíveis.

EN:

Software Engineer with experience across backend, APIs, web applications, automation, and production systems. I build reliable, testable, secure software with attention to observability and performance. I’m pursuing a postgraduate program in AI Engineering, with practical work in model evaluation, adaptation, and reproducible experiments.

## Competência no CV

PT-BR:

Engenharia de IA (em aprofundamento): integração de LLMs e modelos de decisão tipados, structured outputs, baselines determinísticos, evals e held-outs congelados; domain adaptation/fine-tuning com Python/PyTorch, seleção por validation, confidence/calibration e treinamento GPU com CUDA/mixed precision; políticas híbridas, revisão humana e fallbacks

EN:

AI Engineering (current focus): LLM and typed decision-model integration, structured outputs, deterministic baselines, evals, and frozen held-outs; domain adaptation/fine-tuning with Python/PyTorch, validation-based selection, confidence/calibration, and GPU training with CUDA/mixed precision; hybrid policies, human review, and fallbacks

## Competência no site

Título: Engenharia de IA / AI Engineering.

PT-BR:

Integração de LLMs e modelos de decisão probabilísticos tipados, structured outputs, baselines determinísticos, evals e held-outs congelados. Domain adaptation/fine-tuning com Python/PyTorch, seleção de checkpoints por validation e análise de confidence/calibration. Prática inicial em ML Systems: treinamento GPU/CUDA, mixed precision e lifecycle de checkpoints; políticas híbridas, HITL e fallbacks.

EN:

LLM and typed probabilistic decision-model integration, structured outputs, deterministic baselines, evals, and frozen held-outs. Domain adaptation/fine-tuning with Python/PyTorch, validation-based checkpoint selection, and confidence/calibration analysis. Initial hands-on ML Systems work: GPU/CUDA training, mixed precision, and checkpoint lifecycle; hybrid policies, HITL, and fallbacks.

## About final

### Introdução PT-BR

Sou Marcelo Taparelli, engenheiro de software. Minha trajetória combina experiência prática em desenvolvimento de software e produto com formação em Análise e Desenvolvimento de Sistemas, concluída em 2026, e uma Pós-graduação em Engenharia de IA em andamento.

### Introdução EN

I’m Marcelo Taparelli, a software engineer. My background combines hands-on software development and product experience with a degree in Systems Analysis and Development, completed in 2026, and an ongoing postgraduate program in AI Engineering.

### Corpo PT-BR (preservado)

Atuo com backend, APIs, aplicações web, automação e evolução de sistemas. Considero segurança parte do desenho: explicito limites de acesso, valido entradas, protejo segredos e testo regras críticas. Para confiabilidade e performance, uso limites de recursos, acesso a dados previsível e latência medida. Também uso AI coding agents para apoiar planejamento, implementação, debugging, testes e validação, sempre com revisão humana e quality gates.

### Corpo EN (preservado)

I work across backend systems, APIs, web applications, automation, and system evolution. I treat security as part of software design: I make access boundaries explicit, validate inputs, protect secrets, and test critical rules. For reliability and performance, I use resource limits, predictable data access, and measured latency. I also use AI coding agents for planning, implementation, debugging, testing, and validation, with human review and quality gates.

### about.learningText PT-BR

Aprofundo Engenharia de IA a partir da minha base em Engenharia de Software. No Ops Triage AI, construí a triagem com baseline determinístico, Ollama e HybridPolicy, revisão humana e auditoria. Depois avaliei Jev e Laya separadamente, sem integrá-los à política híbrida. Adaptei Laya com PyTorch, TRAIN/VALIDATION separados, GPU/CUDA e seleção de checkpoint antes do held-out congelado. Esse ciclo de avaliação e adaptação abriu minha primeira experiência prática em ML Systems / AI Infrastructure. Na Resilient Transaction API, trabalho idempotência, resiliência e operação observável; um laboratório temporário na AWS, fora de produção, exercitou Terraform, migrations, testes funcionais e auditoria após a destruição dos recursos.

### about.learningText EN

I’m deepening my AI Engineering practice from a Software Engineering foundation. In Ops Triage AI, I built a deterministic baseline, Ollama integration, and HybridPolicy with human review and auditing. I later evaluated Jev and Laya separately, without adding either to the hybrid policy. I adapted Laya with PyTorch, separate TRAIN/VALIDATION sets, GPU/CUDA training, and checkpoint selection before the frozen held-out evaluation. This evaluation and adaptation cycle gave me my first hands-on experience in ML Systems / AI Infrastructure. In Resilient Transaction API, I work on idempotency, resilience, and observable operations; a temporary non-production AWS lab exercised Terraform, migrations, functional tests, and post-destroy resource auditing.

As seções de trajetória, experiência e formação complementar existentes foram
preservadas. Formação e evidência prática têm papéis distintos: o programa
acadêmico não fundamenta claims de senioridade.

## Formação final nos CVs

PT-BR, nesta ordem:

- Pós-graduação em Engenharia de IA — Cruzeiro do Sul | Em andamento
- Análise e Desenvolvimento de Sistemas — UniBF | Concluído em 2026
- Idiomas: Português nativo | Inglês avançado

EN, nesta ordem:

- Postgraduate Program in AI Engineering — Cruzeiro do Sul | In progress
- Systems Analysis and Development — UniBF | Completed in 2026
- Languages: Portuguese (native) | English (advanced)

A pós-graduação aparece nos dois CVs (resumo e formação, inclusive PDFs) e
nas introduções About PT/EN, também usadas como description metadata. Não
aparece como skill ou no hero. A informação de matrícula foi fornecida pelo
autor nesta sessão; a instituição é simplesmente Cruzeiro do Sul. Não foram
inventados campus, modalidade, unidade, data de início ou conclusão.

## Frontmatter final do Ops Triage

PT-BR:

```yaml
translationKey: ops-triage-ai
locale: pt-BR
slug: ops-triage-ai
title: Ops Triage AI
description: Triagem auditável com baseline determinístico, Ollama e política híbrida; avaliações separadas de Jev e Laya, incluindo domain adaptation, fora do runtime.
status: published
reviewed: true
order: 0
category: IA aplicada · Sistemas
role: Desenho e implementação do sistema
context: Projeto público autoral — código aberto
technologies:
  [
    Bun,
    TypeScript,
    PostgreSQL,
    Prisma,
    Vitest,
    Zod,
    Docker,
    GitHub Actions,
    Ollama,
    Jev 1.13,
    OpenRouter,
    Python,
    PyTorch,
    Laya,
    CUDA,
  ]
externalUrl: https://github.com/marcelotaparelli/ops-triage-ai
contribution: 'Implementação do sistema, avaliação congelada e adaptação do Laya com PyTorch/CUDA e seleção por validation; Jev e Laya permanecem evaluation-only.'
```

EN:

```yaml
translationKey: ops-triage-ai
locale: en
slug: ops-triage-ai
title: Ops Triage AI
description: Auditable triage with a deterministic baseline, Ollama, and hybrid policy; separate Jev and Laya evaluations, including domain adaptation, outside the runtime.
status: published
reviewed: true
order: 0
category: Applied AI · Systems
role: System design and implementation
context: Authored open-source project
technologies:
  [
    Bun,
    TypeScript,
    PostgreSQL,
    Prisma,
    Vitest,
    Zod,
    Docker,
    GitHub Actions,
    Ollama,
    Jev 1.13,
    OpenRouter,
    Python,
    PyTorch,
    Laya,
    CUDA,
  ]
externalUrl: https://github.com/marcelotaparelli/ops-triage-ai
contribution: 'System implementation, frozen evaluation, and Laya adaptation with PyTorch/CUDA and validation-based selection; Jev and Laya remain evaluation-only.'
```

## Estrutura e evidências do case

Arquitetura, fluxo histórico, stack principal e resultados históricos foram
preservados. A antiga seção de limitações agora identifica o benchmark híbrido
histórico, evitando aplicar a confidence heurística daquele caminho a todos os
modelos. Depois de Jev, o case acrescenta:

- Laya: de zero-shot a domain adaptation / Laya: from zero-shot to domain adaptation.
- Protocolo de adaptação / Adaptation protocol: TRAIN 1.120, VALIDATION 280,
  HELD-OUT 70; seleção da época 4 antes de Freeze 2 e avaliação final.
- Infraestrutura do treinamento / Training infrastructure: RTX A5000 24 GB,
  PyTorch/CUDA, mixed precision, memória, coordenação optimizer/scheduler,
  artifacts da execução rejeitada e preservação local do checkpoint.
- Resultado e regressão de severidade / Results and severity regression:
  tabela de quatro accuracies, recall de risco HIGH e regressão de prioridade
  HIGH/CRITICAL explicitamente ao lado, mantendo leitura mobile.
- Confidence e limites de generalização / Confidence and generalization limits:
  dez tuples erradas com confidence quase saturada, filtros pouco úteis,
  gap entre splits e limites de extrapolação.

| Métrica                       | Laya zero-shot |  Laya adaptado |
| ----------------------------- | -------------: | -------------: |
| Category accuracy             |         84,29% |         97,14% |
| Priority accuracy             |         31,43% |         94,29% |
| Risk accuracy                 |         62,86% |         92,86% |
| Exact tuple                   |  11,43% — 8/70 | 85,71% — 60/70 |
| HIGH risk recall              |   57,14% — 4/7 |     100% — 7/7 |
| HIGH/CRITICAL priority recall | 92,86% — 13/14 | 85,71% — 12/14 |

LOW → MEDIUM: 40/40 → 0/40. Jev: 94,29% — 66/70, sem receber os 1.120
TRAIN. A comparação é assimétrica, sem ranking universal. Confidence alta não
é automaticamente probabilidade confiável de correção, nem confidence Jev e
Laya têm semântica idêntica. Os dois seguem evaluation-only fora do runtime e
HybridPolicy; não houve claim de produção ML.

Tecnologias acrescentadas ao frontmatter: Python (harness/treinamento), PyTorch
(fine-tuning), Laya (decision model avaliado/adaptado) e CUDA (runtime do treino
GPU). RunPod aparece só na infraestrutura, conforme o contexto fornecido pelo
autor. Bun, TypeScript, PostgreSQL, Prisma, Vitest, Zod, Docker, GitHub Actions,
Ollama, Jev e OpenRouter permanecem.

A progressão agora está explícita: Software Engineer → Engenharia de IA →
model evaluation + adaptation → primeira experiência prática em ML Systems /
AI Infrastructure. Isso é capacidade em aprofundamento, não um novo cargo,
expertise de CUDA ou experiência profissional com ML em produção.

## Fontes e ressalva de teardown

Consulta pública somente leitura, main em
`e8c75f0ff75aafcd24403f860e1ad7d4450392f5`, o mesmo snapshot do artigo:

- [Relatório final](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/laya-domain-adaptation-final-report.md).
- [Freeze 2](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-adapt-freeze.json).
- [Held-out](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-adapt-held-out.json),
  [treinamento](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-adapt-training.json),
  [seleção](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-adapt-selection.json) e
  [metadata de pesos](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-adapt-checkpoint-metadata.json).
- [Zero-shot](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/laya-held-out-a9725ea.md),
  [Jev histórico](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/jev-1.13-held-out-4c41e0b.md),
  README e auditoria de mapping.

Os aggregates do relatório e artifacts concordam; não foram recalculados.
O relatório registra que o Pod não foi destruído. Portanto, não foi incorporada
experiência de teardown do Pod. US$ 0,1185 continua estimativa das tarefas GPU
medidas, não invoice total. US$ 0 de inferência significa cobrança externa por
token/request, não operação sem custo.

Superfície desatualizada fora do escopo de escrita: o README público do Ops
Triage ainda resume zero-shot, sem o ciclo de adaptação. Merece atualização
naquele repositório; foi preservado porque aqui é fonte somente leitura.
Nenhuma outra superfície institucional importante deste site ficou pendente.

## Arquivos alterados

- `README.md`
- `cv/en.html`
- `cv/pt-br.html`
- `public/cv/marcelo-taparelli-cv-en.pdf`
- `public/cv/marcelo-taparelli-cv-pt-br.pdf`
- `public/og/en.png`
- `public/og/pt-br.png`
- `scripts/generate-og.ts`
- `src/components/Footer.astro`
- `src/content/articles/en/portfolio-bun-astro-mdx.mdx`
- `src/content/articles/pt-br/portfolio-bun-astro-mdx.mdx`
- `src/content/projects/en/ops-triage-ai.mdx`
- `src/content/projects/pt-br/ops-triage-ai.mdx`
- `src/data/skills.ts`
- `src/i18n/translations.ts`
- `src/layouts/AboutPage.astro`
- `src/layouts/HomePage.astro`
- `docs/editorial/positioning-laya-review.md` (este relatório).
- `docs/implementation-status.md` (registro do estado verificado).

CSS dos CVs, schemas, validators, testes, dependências, workflows e distribuição
não foram alterados. O artigo Laya permanece publicado/reviewed em PT/EN com
2026-10-02; seu conteúdo e metadata de distribuição foram preservados.

## Validação final

Todos os gates abaixo passaram. Nenhum validator foi enfraquecido.

| Gate                 | Comando/resultado                                                   |
| -------------------- | ------------------------------------------------------------------- |
| Format               | bun run format; normalizado                                         |
| Format check         | bun run format:check; limpo                                         |
| Typecheck            | bun run typecheck; 0 errors, 0 warnings, 18 hints existentes        |
| Lint                 | bun run lint; limpo                                                 |
| Unit                 | bun run test; 38 pass                                               |
| CV                   | bun run cv:generate; 1 página A4 cada, headroom 5,1px PT/EN         |
| Release checker      | bun run check:release; verde                                        |
| Preview build        | bun run build:preview; 36 páginas                                   |
| Preview validator    | bun scripts/check-artifacts.ts dist --preview; 36 documentos, limpo |
| E2E                  | bun run test:e2e; 13 pass                                           |
| Production build     | bun run build; 36 páginas                                           |
| Production validator | bun scripts/check-artifacts.ts dist; 36 documentos, limpo           |
| Git whitespace       | git diff --check; limpo                                             |

As duas páginas publicáveis do artigo Laya estão no build de produção e no
sitemap. O artifact final dist é de produção. Todos os novos links internos
resolvem e os seis links públicos únicos dos cases retornaram HTTP 200.

Revisão visual: CV PT/EN completos, About PT/EN e case PT/EN em desktop e
mobile; font-size do CV permanece 9,5pt, CSS não alterado e experiência
profissional preservada. O gerador contou exatamente uma página em cada PDF.
Home/About/case PT/EN a 1440, 390 e 320px: 18 combinações, HTTP 200, nenhum
overflow da página e nenhuma violação de tags WCAG no axe. Os rótulos curtos da
nova tabela evitam quebrar percentuais em mobile; os dois recalls ficam
explícitos no parágrafo imediatamente abaixo, sem esconder regressão.

Screenshots locais, fora do Git (diretório ignorado reports/positioning-review):

- [CV PT-BR](../../reports/positioning-review/cv-pt-br.png).
- [CV EN](../../reports/positioning-review/cv-en.png).
- [About PT desktop](../../reports/positioning-review/about-pt-br-1440-intro.png),
  [About EN desktop](../../reports/positioning-review/about-en-1440-intro.png).
- [About PT mobile](../../reports/positioning-review/about-pt-br-390-intro.png),
  [About EN mobile](../../reports/positioning-review/about-en-390-intro.png).
- [Case PT desktop](../../reports/positioning-review/case-pt-br-1440-laya.png),
  [Case EN desktop](../../reports/positioning-review/case-en-1440-laya.png).
- [Case PT mobile](../../reports/positioning-review/case-pt-br-390-results.png),
  [Case EN mobile](../../reports/positioning-review/probe-en-390.png).
- [Registro das 18 verificações](../../reports/positioning-review/visual-checks.json).

O commit local único e git status final constam da resposta de entrega. Nenhum
push, deploy ou distribuição foi realizado.
