# Audit de posicionamento — Marcelo Taparelli

Data: 2026-10-07. Snapshot inicial: `055ff5e`. Audit realizado antes de editar;
árvore inicial limpa. Escopo: este portfolio; nenhum profile repo foi editado.

## Diagnóstico e proposta

- Home PT/EN já apresentava AI Engineer primeiro e a assinatura de produtos de
  IA. Hero, layout e assinatura foram preservados; apenas o texto de apoio foi
  alinhado ao método e à medição.
- About, metadata, footer, foto e CV ainda apresentavam dois cargos lado a lado
  sem tornar explícita a relação carreira/base/visão. Produto aparecia junto
  de práticas de engenharia. Foram alinhados semanticamente, mantendo cargos
  profissionais históricos como Developer, Full Stack Developer e Product Owner.
- Skills já começavam por IA, mas tinham três grupos, misturando software,
  infraestrutura, segurança e produto. A proposta foi separar quatro grupos.
- Os quatro projetos principais já estavam na ordem desejada. Nenhuma mudança
  de ordem ou de conteúdo dos cases foi necessária.
- A metodologia completa ainda não existia como seção visual ou como How I
  work no README. Foi adicionada às Home e About por um componente Astro
  estático compartilhado, sem dependências ou JavaScript de cliente.
- README e artigo de arquitetura tinham assinaturas antigas; a apresentação
  pessoal do artigo ainda descrevia uma evolução de Software para IA.
- Current focus/learning já era Engenharia na prática / Engineering in
  practice, com exemplos concretos e limites; foi preservado. Copy de índices
  de projetos/artigos, contato, experiência e regras de publicação estavam
  coerentes. SEO, Person JSON-LD, footer e OG recebem a identidade compartilhada.
- Formação preservada: pós-graduação em IA em andamento, Cruzeiro do Sul;
  ADS, UniBF, concluído em 2026. Removido apenas Virtual do nome no CV para usar
  a instituição solicitada, sem acrescentar modalidade ou campus. As datas
  previstas e os estudos Alura já existentes foram preservados. About mantém
  a regra existente de não mostrar Cruzeiro/UniBF; os CVs identificam ambas.

## Ocorrências públicas antigas e decisões

Linhas abaixo referem-se ao snapshot inicial, antes de formatação e edição.

| Local                                                                          | Ocorrência                                                                         | Decisão                                                                                      |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| README.md:3                                                                    | AI Engineering, Software Engineering and Product apresentados juntos               | Explicitar IA como carreira, Software como base e Product mindset                            |
| README.md:7                                                                    | From real problems to intelligent products                                         | Alterar para AI products                                                                     |
| Artigo portfolio PT:43                                                         | Software Engineer em aprofundamento em Engenharia de IA                            | Alterar a apresentação pessoal para Engenheiro de IA com base em Software e visão de Produto |
| Artigo portfolio EN:28–29                                                      | Software Engineer going deeper into AI Engineering                                 | Alterar a apresentação pessoal equivalente                                                   |
| Artigo portfolio PT:22                                                         | FROM REAL PROBLEMS TO INTELLIGENT PRODUCTS no texto local de distribuição          | Alinhar para AI PRODUCTS; nenhuma distribuição executada                                     |
| Artigo portfolio PT:196                                                        | Assinatura INTELLIGENT PRODUCTS na conclusão                                       | Alinhar para AI PRODUCTS                                                                     |
| Artigo portfolio EN:179–180                                                    | Assinatura INTELLIGENT PRODUCTS na conclusão                                       | Alinhar para AI PRODUCTS                                                                     |
| translations.ts, identity/about PT/EN; cv/pt-br.html:33; cv/en.html:33         | AI Engineer e Software Engineer lado a lado, Product-minded no início do resumo EN | Explicitar carreira de IA, base em Software e visão de Produto; IA abre ambos os resumos     |
| translations.ts, identity.pillars PT/EN                                        | AI Engineering · Software Engineering · Product                                    | Tornar base/lens explícitos; propagação em Home, About, footer e OG                          |
| skills.ts, terceiro grupo; CVs, Práticas de engenharia / Engineering practices | Produto misturado com segurança e confiabilidade                                   | Separar Produção/Segurança/Confiabilidade e Visão de Produto                                 |

Não foram encontradas as expressões literais moving into AI, expanding into AI,
em evolução para Engenharia de IA, Applied AI Engineering ou Engenharia de IA
Aplicada como posicionamento pessoal nas fontes públicas atuais. A busca
incluiu variações próximas; encontrou as duas frases do artigo acima.

## Usos técnicos e históricos preservados

Oito categorias técnicas, todas na linha 10 dos respectivos artigos, ficaram
intactas, por descreverem assuntos e experimentos:

- PT: `evals-stop-guessing-start-measuring`, `llm-did-not-win-everywhere`,
  `jev-1-13-decision-model-benchmark`: IA aplicada · Engenharia.
- PT: `laya-vs-jev-zero-shot-fine-tuning`: IA aplicada · ML Systems.
- EN: os mesmos três primeiros artigos: Applied AI · Engineering.
- EN: `laya-vs-jev-zero-shot-fine-tuning`: Applied AI · ML Systems.
- A hashtag #AppliedAI no texto local de distribuição do artigo Jev PT:38
  também é técnica. Não houve publicação externa.

Ocorrências antigas em documentos internos são registros datados, não copy
atual. O relatório de 2026-10-02 ganhou um aviso e link para esta revisão;
seus textos e evidências históricos foram preservados:

- `positioning-laya-review.md`:11,15,16,18–20: Software como identidade/base,
  títulos Software Engineer primeiro e assinatura na ordem antiga.
- Mesmo arquivo:38,42,48,52,70,74,86,90,231–233: resumos, About e aprendizado
  antigos; em aprofundamento, current focus, deepening e progressão Software → IA.
- Mesmo arquivo:28,31–32,129,165: categorias e menções históricas a IA aplicada.
- `implementation-status.md`:131–133: títulos Software Engineer primeiro;
  245–246 e 281–286: Software como identidade principal e Applied AI Engineering
  como direção. As entradas antigas permanecem datadas, sob a atualização atual.
- Mesmo arquivo:584,631–632: descrição e taxonomia técnica histórica de IA aplicada.
- `laya-vs-jev-review.md`:145: expanding into a training tutorial refere-se ao
  escopo editorial, não à carreira. Preservado.

## Evidências e limites

Foram lidos os sete cases em PT/EN, experiência profissional, artigos de
arquitetura, fontes de CV, scripts de geração, schema, modelo de publicação,
validators, testes e documentação editorial. O relatório público congelado
[Laya domain adaptation](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/laya-domain-adaptation-final-report.md)
foi consultado em leitura: sustenta seleção por VALIDATION e a regressão de
prioridade. A consulta web ao OpsPilot e ao relatório AWS não retornou conteúdo;
o audit destes usou os cases e registros existentes, sem alegar uma nova
auditoria dos repositórios de origem.

- OpsPilot: RAG, pgvector, LangGraph, controles fora do LLM, aprovação, RLS,
  citações, reconciliação, evals e OpenTelemetry. Mantidos os limites de citações,
  RLS, exactly-once, planners offline, smokes independentes, qualidade/custo não
  demonstrados e blueprint Terraform sem deploy AWS.
- Ops Triage: baseline/local LLM/híbrido, Jev, Laya zero-shot/adaptado,
  TRAIN/VALIDATION/HELD-OUT, PyTorch/CUDA, seleção/calibração e revisão humana.
  Mantidos dataset sintético pequeno, assimetria de treino, regressão de recall,
  confidence saturada, escopo de custos, ausência de teardown documentado e
  Jev/Laya evaluation-only. ML Systems/AI Infrastructure continua experimental.
- Resilient: idempotência, retries, circuit breaker, PostgreSQL/Redis, Docker,
  Terraform, métricas e lab AWS temporário. Mantidos fake provider, benchmark
  local, single-task, limites de réplica, topologia e ausência de produção real.
- Salus: domínio, TDD manual, backend, autenticação e testes, com riscos residuais
  já publicados. Não foi promovido a production-ready.
- Catus/EVAG/Drive: mantidas contribuições e resultados qualitativos; nenhum
  cliente, volume, ganho numérico ou detalhe proprietário foi acrescentado.

O método descreve como construir e verificar sistemas; não declara que os
experimentos de IA já operaram em produção. Nenhuma senioridade, cargo extra,
certificação, métrica ou ferramenta sem evidência foi adicionada.

## Textos finais principais

Títulos: **Engenheiro de IA | Engenheiro de Software** e
**AI Engineer | Software Engineer**. Eyebrows e assinatura visual da Home
permanecem com & e **DE PROBLEMAS REAIS A PRODUTOS DE IA.** /
**FROM REAL PROBLEMS TO AI PRODUCTS.**

Copy principal PT:

> Construo sistemas de IA do problema de negócio à produção, combinando Engenharia de IA, Engenharia de Software, verificação, segurança, observabilidade e medição.

Copy principal EN:

> I build AI systems from the business problem to production — combining AI Engineering, Software Engineering, verification, security, observability and measurement.

About PT:

> Sou Marcelo Taparelli, Engenheiro de IA com uma base sólida em Engenharia de Software e experiência em produto. Parto do problema de negócio, modelo o domínio e defino arquitetura e restrições antes de escolher RAG, modelos de decisão ou agentes, quando fazem sentido.

About EN:

> I’m Marcelo Taparelli, an AI Engineer with a strong Software Engineering foundation and a Product mindset. I start with the business problem, model the domain, and define architecture and constraints before choosing RAG, decision models, or agents where they add value.

CV PT:

> Engenheiro de IA com base sólida em Engenharia de Software e experiência em backend, APIs e software em produção. Desenvolvo RAG, agentes, evals, avaliação de modelos e revisão humana. Do problema de negócio à produção, a visão de produto orienta arquitetura, verificação, segurança, observabilidade e medição.

CV EN:

> AI Engineer with a strong Software Engineering foundation and experience in backend, APIs, and production software. I build AI systems with RAG, agents, evals, model evaluation, and human review. From business problem to production, a Product perspective guides architecture, verification, security, observability, and measurement.

Metadata PT:

> Engenheiro de IA com base sólida em Engenharia de Software e visão de Produto. Do problema de negócio à produção, com verificação, segurança e medição.

Metadata EN:

> AI Engineer with a strong Software Engineering foundation and a Product mindset. From business problem to production, with verification, security and measurement.

## Ordem final e metodologia

Capacidades: 01 AI Engineering → 02 Software Engineering →
03 Production, security & reliability → 04 Product perspective.

Projetos, mantidos em ambos os idiomas: OpsPilot AI → Ops Triage AI → Resilient
Transaction API → Salus → Agência Catus → Atendimento EVAG → Google Drive → WordPress.
O bloco final representa trabalho profissional, produto e operação.

Metodologia visual nas Home e About PT/EN; título Como construo sistemas de IA /
How I build AI systems. A lista usa lang=en, passos numerados e setas decorativas
ocultas de leitores de tela, com leitura linear e nenhuma interação necessária:

Business Problem → Domain Model → Architecture → Constraints → AI / Agent Orchestration → Verification → Security → Production → Measurement → Improvement

Desktop: texto à esquerda e sequência vertical à direita. Mobile: texto e
sequência em uma coluna, sem scroll horizontal; rótulos da assinatura mantidos
em inglês, como solicitado. README contém o mesmo método em How I work.

## Revisão visual verificada

Refinamento solicitado após a primeira entrega: Sobre/About agora usa uma
variante visual do componente com a escala de título e proporção de colunas
das outras seções de About. Os blocos preenchidos deram lugar a uma linha
vertical discreta, com dez etapas numeradas e destaque para orquestração de IA
e medição. A Home mantém a apresentação original. Conteúdo e sequência foram
preservados. Revisão PT/EN a 1440/768/390/320px: oito configurações sem overflow
horizontal ou violações axe WCAG; capturas em `reports/method-design/`.
Format/format check, typecheck, lint, 42 testes unitários, 24 E2E, release checker,
os dois builds, validators e git diff --check passaram neste refinamento.
Os PDFs não foram alterados nem regenerados neste ajuste visual.

- Home e About PT/EN em 1440px, 390px e 320px: 12 configurações com HTTP 200,
  método completo e nenhum overflow horizontal; conteúdo disponível sem JS.
- Inspecionados os screenshots das introduções PT/EN desktop/mobile, metodologia
  desktop/mobile, cards OG e os dois PDFs rasterizados completos. Sem cortes
  observados. Os 24 E2E passaram, incluindo axe WCAG e reflow em 320px.
- CVs: fonte original 9,5pt, CSS inalterado, fontes locais carregadas. Gerador e
  pdfinfo confirmaram uma página A4 por idioma. Folga inferior medida: 34,4px PT
  e 1,5px EN. O CV EN ocupa quase toda a área disponível, sem corte no PDF.
- Texto dos PDFs extraído e conferido: título, resumo, formação, projeto,
  regressão de recall e seção final de idiomas presentes. PDFs mantêm o formato
  do gerador existente, sem tags estruturais de acessibilidade; não se reivindica
  certificação de acessibilidade PDF. Links internos/recursos, canonicals e pares
  de idioma passaram no validator de preview; URLs externas têm atributos seguros
  verificados pelos E2E, sem alegar disponibilidade atual de todas as URLs externas.
- Evidências locais ignoradas pelo Git em `reports/brand-review/`: screenshots,
  `visual-checks.json`, PDFs rasterizados e texto extraído.

## Validação de entrega

Todos os gates finais passaram. Os testes existentes foram atualizados para
os textos autorizados; as assertions de title/OG agora comparam o título
completo. Nenhum teste, validator ou gate foi enfraquecido.

| Gate                                            | Resultado                                      |
| ----------------------------------------------- | ---------------------------------------------- |
| `bun run format`                                | Executado                                      |
| `bun run format:check`                          | Passou                                         |
| `bun run typecheck`                             | 0 errors, 0 warnings, 20 hints existentes      |
| `bun run lint`                                  | Passou                                         |
| `bun run test`                                  | 42 testes, 112 assertions, zero falhas         |
| `bun run cv:generate`                           | Uma página A4 PT e EN                          |
| `bun run build:preview`                         | 38 páginas                                     |
| `bun scripts/check-artifacts.ts dist --preview` | 38 documentos válidos                          |
| `bun run test:e2e`                              | 24 testes, zero falhas, contra o preview final |
| `bun run build`                                 | 38 páginas, artefato final de produção local   |
| `bun run check:release`                         | Passou                                         |
| `bun scripts/check-artifacts.ts dist`           | 38 documentos válidos                          |
| `git diff --check`                              | Passou                                         |

Execuções intermediárias detectaram CVs com duas páginas; o conteúdo foi
condensado, sem mexer no CSS/fonte ou ocultar limitações. Restrições de DNS,
processos e cache do sandbox exigiram execução permitida fora dele. Um lint
intermediário encontrou arquivos do navegador no cache local `.tools`; o cache
foi movido para `node_modules`, sem mudar o escopo ou configuração do lint.
O Bun, Git, Poppler e Chromium foram provisionados no ambiente; `package.json`
e `bun.lock` não mudaram, e a instalação do projeto usou frozen-lockfile.

Arquivos alterados/criados:

- `README.md`
- `cv/pt-br.html`
- `cv/en.html`
- `public/cv/marcelo-taparelli-cv-pt-br.pdf`
- `public/cv/marcelo-taparelli-cv-en.pdf`
- `public/og/pt-br.png`
- `public/og/en.png`
- `src/components/EngineeringMethod.astro`
- `src/i18n/translations.ts`
- `src/data/skills.ts`
- `src/layouts/HomePage.astro`
- `src/layouts/AboutPage.astro`
- `src/content/articles/pt-br/portfolio-bun-astro-mdx.mdx`
- `src/content/articles/en/portfolio-bun-astro-mdx.mdx`
- `tests/e2e/site.spec.ts`
- `docs/editorial/positioning-laya-review.md`
- `docs/editorial/brand-ai-engineering-review.md`
- `docs/implementation-status.md`

O SHA e o git status após o único commit local constam do relatório de entrega,
evitando autorreferência do hash neste documento. Nenhum push, deploy ou
distribuição externa foi realizado. As alterações ficam disponíveis para
revisão humana no commit local.
