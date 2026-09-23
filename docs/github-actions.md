# GitHub Actions

Operational reference for this repository's workflows. It reflects the
current state of `.github/workflows/*.yml` and the scripts they call —
nothing here is aspirational. If a workflow changes, update this file
together with it.

Workflows in this repo: **3** (`ci.yml`, `deploy.yml`,
`distribute-content.yml`). There are no other workflow files and no
GitHub Environments configured (no `environment:` key exists in any
workflow; human approval is the manual `workflow_dispatch` action
itself).

## 1. Visão geral

| Workflow (nome real no GitHub) | Arquivo                                    | Trigger                                             | Manual/Automático                 | Objetivo                                                                                    |
| ------------------------------ | ------------------------------------------ | --------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| CI                             | `.github/workflows/ci.yml`                 | `pull_request` (qualquer branch) e `push` em `main` | Automático                        | Rodar todos os gates determinísticos e publicar o artefato `production-dist` validado       |
| Publish production branch      | `.github/workflows/deploy.yml`             | `workflow_dispatch` com input `ci_run_id`           | Manual (clique no GitHub Actions) | Publicar o artefato exato de um CI verde na branch `production` (o que a Hostinger serve)   |
| Distribute content             | `.github/workflows/distribute-content.yml` | `workflow_dispatch` com input `article_slug`        | Manual (clique no GitHub Actions) | Publicar artigo EN no DEV.to e um post bilíngue no LinkedIn; ledger em `distribution-state` |

### 1.1. CI

- Nome exibido no GitHub: `CI`.
- Arquivo: `.github/workflows/ci.yml`.
- Triggers: `pull_request` (qualquer branch de origem) e `push` com
  `branches: [main]`.
- Branches: lê PRs e `main`. Não escreve em nenhuma branch.
- Inputs: nenhum.
- Permissions (top-level): `contents: read`. O job não amplia
  permissões — o comentário no YAML registra que o único escopo extra é
  publicar o artefato validado.
- Environments: nenhum.
- Concurrency: nenhum.
- Secrets: nenhum (usa apenas o checkout e o toolchain; `bun install
--frozen-lockfile` com Bun 1.4.2 via `oven-sh/setup-bun@v2`).
- Jobs: um único job `gates` em `ubuntu-latest`. Passos, nesta ordem:
  1. `actions/checkout@v7`;
  2. setup Bun 1.4.2;
  3. `bun install --frozen-lockfile`;
  4. `bun typecheck`;
  5. `bun lint`;
  6. `bun format:check`;
  7. `bun test` (unit; `bunfig.toml` fixa `root = "./tests/unit"`);
  8. `bun run build:preview` (build com drafts);
  9. `bun scripts/check-artifacts.ts dist --preview`;
  10. `bunx --bun playwright install --with-deps chromium`;
  11. `bun test:e2e` (serve `dist` via `scripts/serve-build.ts` em
      `127.0.0.1:3100`; a suíte espera um build **preview**);
  12. `bun run build` (rebuild de produção; o workspace termina sempre
      em estado deployável);
  13. `bun scripts/check-artifacts.ts dist`;
  14. `bun check:release`;
  15. `actions/upload-artifact@v7` com `name: production-dist`,
      `path: dist/`, `if-no-files-found: error`,
      `include-hidden-files: true` (necessário para incluir
      `dist/.htaccess`, que o upload excluiria por padrão).
- Scripts chamados: `scripts/dev.ts` (não), validadores
  `scripts/check-artifacts.ts` e `scripts/check-release.ts`, servidor
  `scripts/serve-build.ts` (via Playwright `webServer`).
- Artefatos gerados: `production-dist` (conteúdo de `dist/` validado).
- Side effects: nenhum fora do run (read-only; nunca escreve branches,
  tags, releases ou deployments).
- Resultado esperado: run verde em push para `main` → `production-dist`
  disponível para o deploy. Esse `run id` é o input do deploy.

### 1.2. Publish production branch (deploy)

- Nome exibido no GitHub: `Publish production branch`.
- Arquivo: `.github/workflows/deploy.yml`.
- Trigger: apenas `workflow_dispatch` com input obrigatório
  `ci_run_id` (string): "Approved CI run id (push to main, green,
  holds production-dist)".
- Branches envolvidas: lê o artefato do run indicado; escreve **somente**
  a branch `production` (cria como `--orphan` se não existir). Nunca
  toca `main`.
- Inputs: `ci_run_id`.
- Permissions: top-level `contents: read`; o job `publish` amplia para
  `contents: write` + `actions: read` (escrever a branch `production`,
  ler runs/artefatos via API).
- Environments: nenhum (aprovação = o próprio despacho manual; ver
  `docs/decisions/004-production-artifact-branch.md`).
- Concurrency: `group: production-branch`, `cancel-in-progress: false`
  (dois dispatches manuais nunca disputam a branch).
- Secrets usados (nomes): `GITHUB_TOKEN` (fornecido pelo GitHub;
  valida o run via `gh api`, baixa o artefato com
  `actions/download-artifact@v8` e faz push da branch `production`).
  Nenhum secret próprio, nenhum token pessoal, nenhuma action de
  deploy de terceiros.
- Jobs: um único job `publish` (`ubuntu-latest`):
  1. `Validate CI run` — rejeita tudo que não seja: workflow de nome
     `CI`, evento `push`, `status` completed, `conclusion` success,
     `head_branch` main, mesmo repositório, com `head_sha` presente.
     Qualquer outra coisa (run de PR, fork, run falho, id
     desconhecido) falha aqui, antes de tocar qualquer coisa.
  2. `actions/download-artifact@v8` — baixa `production-dist`
     **daquele run exato** (`run-id: inputs.ci_run_id`). Sem checkout
     do fonte e sem build: o artefato é a fonte da verdade,
     byte por byte.
  3. `Pre-push safety checks` — exige no artefato `index.html`,
     `.htaccess`, `sitemap.xml`, `robots.txt` e os dois PDFs
     (`cv/marcelo-taparelli-cv-pt-br.pdf`,
     `cv/marcelo-taparelli-cv-en.pdf`); rejeita caminhos proibidos
     (`src`, `tests`, `docs`, `.github`, `node_modules`,
     `package.json`, `bun.lock`, `tsconfig.json`); grep por
     prováveis secrets (`BEGIN ... PRIVATE KEY`,
     `aws_secret_access_key`, `github_pat_`).
  4. `Publish artifact to production branch` — clone isolado em
     diretório temporário, checkout de `production`, `git rm -rf .`
     nos arquivos rastreados, cópia do artefato (incluindo
     dotfiles), `git add -A`; se nada mudou, sai sem commit
     ("already up to date"); senão commit `deploy: <main-sha>` com
     trailers `Source-Commit:` e `CI-Run:` e push simples (sem
     force — histórico linear e auditável; se a branch se moveu, o
     push falha em vez de reescrever história).
- Artefatos gerados: commit(s) na branch `production` cuja raiz é
  exatamente o conteúdo validado de `dist/`.
- Side effects: move a branch `production`. A Hostinger (integração
  Git → `public_html`) serve essa branch; nenhum deploy automático de
  hospedagem é configurado neste repo — após a branch existir e ser
  verificada, conectar a Hostinger é um passo manual (ver ADR 004).
- Resultado esperado: `production` = artefato do CI aprovado; cada
  commit de produção mapeia de volta ao SHA do `main` e ao CI run.

### 1.3. Distribute content

Detalhe completo na seção 4. Resumo:

- Nome exibido no GitHub: `Distribute content`.
- Arquivo: `.github/workflows/distribute-content.yml`.
- Trigger: apenas `workflow_dispatch` com input obrigatório
  `article_slug` (string), ex. `portfolio-bun-astro-mdx`.
- Branches: lê `main` (checkout); escreve **somente**
  `distribution-state` (ledger em `.distribution/state.json`; cria
  como `--orphan` se não existir). Nunca commita em `main`. Não faz
  rebuild nem deploy.
- Permissions: top-level `contents: read`; job `distribute` com
  `contents: write` (escopo do push do ledger).
- Environments: nenhum.
- Concurrency: `group: distribution`, `cancel-in-progress: false`.
- Secrets/variável (nomes): `DEVTO_API_KEY` (secret),
  `LINKEDIN_ACCESS_TOKEN` (secret), `LINKEDIN_PERSON_URN`
  (**variável** `vars`, não secret — o URN do autor, ex.
  `urn:li:person:...`), `GITHUB_TOKEN` (push do ledger). O workflow
  falha antes de qualquer chamada de rede se algum estiver ausente.
- Script chamado: `bun scripts/distribution/distribute.ts --slug
<article_slug> --ledger /tmp/distribution-ledger.json`.
- Artefatos/efeitos: posts criados no DEV.to e no LinkedIn (conforme
  o estado do ledger) + commit `distribution: <slug>` na branch
  `distribution-state` com o resumo no corpo da mensagem. O passo
  `Summary` anexa o resumo ao `GITHUB_STEP_SUMMARY` (visível na
  página do run).
- Resultado esperado: `Article: <slug>`, `Website: OK`,
  `DEV.to: published|already-published (...)`,
  `LinkedIn: published|already-published (...)`, exit 0. Qualquer
  canal com falha → exit 1.

## 2. Fluxo normal de desenvolvimento

Após terminar uma mudança local:

```text
git status
  → gates locais (typecheck, lint, format:check, test, build, check:release)
  → commit em main (ou PR)
  → push
  → CI (AUTOMÁTICO em PR e em push para main)
  → deploy (MANUAL: workflow_dispatch "Publish production branch" com o ci_run_id verde)
  → conferir site em produção
  → distribuição de conteúdo, quando aplicável (MANUAL: workflow_dispatch "Distribute content" com o article_slug)
```

O que é automático: o workflow `CI` em todo PR e em todo push para
`main`. O que exige clique no GitHub Actions: deploy (sempre manual,
com o id do CI verde) e distribuição (sempre manual, com o slug).
Nada publica sozinho: sem dispatch, `production` e
`distribution-state` não se movem, e nenhuma API externa é chamada.

## 3. Deploy do site

Workflow real: `Publish production branch`
(`.github/workflows/deploy.yml`).

- Como disparar: GitHub → Actions → "Publish production branch" →
  "Run workflow" → informar `ci_run_id` (o id numérico do run verde
  do `CI` em push para `main`, aquele que contém o artefato
  `production-dist`) → Run.
- Qual branch usar: o workflow lê `main` indiretamente (via artefato
  do run) e escreve `production`. Você não escolhe branch; o input é
  o run. Rodar a partir de qualquer branch no seletor não muda o
  conteúdo publicado — o conteúdo vem sempre do artefato validado.
- `workflow_dispatch`: sim, é o único trigger. Não há deploy em
  push, tag ou schedule.
- Environment approval: não existe environment; a aprovação é o
  próprio ato manual de disparar com um run válido (o job ainda
  revalida o run via API antes de baixar qualquer coisa).
- O que é produzido: commit(s) `deploy: <main-sha>` na branch
  `production`, cuja raiz contém só o artefato (`index.html`,
  `.htaccess`, `sitemap.xml`, `robots.txt`, PDFs, assets). É uma
  branch de artefato, não de código (ver ADR 004).
- Relação com a Hostinger: a integração Git da Hostinger aponta
  `production` → `public_html`. O repo não faz deploy na hospedagem;
  ele só move a branch. Se a Hostinger ainda não estiver conectada,
  conecte-a manualmente após verificar a branch.
- Como verificar sucesso: na página do run, os passos `Validate CI
run`, download do artefato, `Pre-push safety checks` e push
  concluídos; `git log --oneline production` mostra `deploy:
<sha>` correspondente ao seu commit do `main`; o site serve o
  conteúdo novo (atenção a cache/CDN da hospedagem).
- O que NÃO fazer: não commitar direto em `production`; não dar
  force-push nela; não publicar conteúdo de run de PR, de fork ou de
  run vermelho (o workflow rejeita, mas nem tente); não editar
  `dist/` à mão esperando que vire deploy — deploy consome o
  artefato do CI, nunca o seu `dist/` local.

Passo a passo curto:

1. `git status` limpo, gates locais verdes, commit e push para `main`.
2. Aguardar o run do `CI` no push para `main` ficar verde; anotar o
   **run id** (número na URL do run).
3. Actions → "Publish production branch" → Run workflow com esse
   `ci_run_id`.
4. Conferir o run verde e `git log --oneline production`.
5. Conferir o site público (URLs canônicas reais).
6. Se algo estiver errado, rollback é manual: localizar o último
   commit bom em `production` (cada mensagem guarda o SHA de
   origem), reverter com novo commit (nunca force-push sem acordo
   explícito) e redesplegar pela Hostinger (detalhes em ADR 004).

A branch `production` existe remotamente (`origin/production`) e é
movida exclusivamente por esse workflow, com histórico linear. Ela
não contém código-fonte.

## 4. Distribute Content

Workflow real: `Distribute content`
(`.github/workflows/distribute-content.yml`), implementado por
`scripts/distribution/` (`types.ts`, `article.ts`, `devto.ts`,
`linkedin.ts`, `distribute.ts`), com schema em
`src/content.config.ts` (bloco `distribution`) e testes em
`tests/unit/distribution.test.ts`.

### Objetivo

Com uma única aprovação manual (o dispatch com o slug), validar o par
bilíngue do artigo e publicar **a versão EN no DEV.to** e **um único
post bilíngue PT-BR + EN no LinkedIn**, registrando o estado no ledger
(`distribution-state`, nunca `main`).

### Como disparar

Actions → "Distribute content" → Run workflow → `article_slug` =
slug do artigo (o mesmo `slug` do frontmatter nas duas línguas, ex.
`llm-did-not-win-everywhere`) → Run. Pré-checagens do workflow:
`DEVTO_API_KEY`, `LINKEDIN_ACCESS_TOKEN` e `LINKEDIN_PERSON_URN`
presentes, senão falha antes de qualquer rede.

### Como o artigo é localizado

`resolveArticlePair(slug)` (`scripts/distribution/article.ts`) varre
`src/content/articles/pt-br/*.mdx` e `src/content/articles/en/*.mdx`
e casa por `locale` + `slug`. O slug precisa casar o padrão
`^[a-z0-9]+(?:-[a-z0-9]+)*$`. Não há tradução em runtime: os dois
textos já existem no repo.

### Relação PT-BR / EN e canais

(`scripts/distribution/types.ts`): DEV.to publica **exclusivamente**
a partir do `en` (título, descrição, markdown e canonical
`/en/articles/…`). LinkedIn faz **uma publicação** a partir do campo
`pt.distribution.linkedin.text`, com a seção PT-BR primeiro, a seção EN
depois, e as duas canonicals (`/artigos/…` e `/en/articles/…`). Canais
existentes: só esses dois. `ORIGIN` (base das canonicals) é
`https://marcelotaparelli.com.br`, igual ao `site` do
`astro.config.mjs`.

### Pré-requisitos: quando um artigo é distributable

Falha fechada (`DistributionError`) em qualquer item — cada lado é
validado pela **sua** canonical:

- Ambos os lados existem (PT-BR e EN com o mesmo `slug`).
- `status: published` nos dois (draft falha: `status is not published`).
- `reviewed: true` nos dois (`not reviewed`).
- `publishedAt` presente nos dois (`missing publishedAt`).
- `title`, `description` e `translationKey` não vazios nos dois.
- `translationKey` **igual** nos dois lados (`translationKey
mismatch`).
- PT-BR: `distribution.linkedin.text` presente; não vazio; ≤ 3000
  caracteres; contém a canonical PT e a EN, e o marcador
  `English version below 🇬🇧` antes da seção em inglês.
- EN: `distribution.devto.tags` presente; 1 a 4 tags, todas strings
  não vazias.

Canais usam exatamente esse frontmatter (convenção documentada no
schema `src/content.config.ts`: o arquivo EN carrega `devto.tags`, o
PT-BR carrega `linkedin.text` bilíngue; estado remoto vive no ledger,
nunca no frontmatter). Links raiz-relativos no corpo (`/…`) são
reescritos para URLs absolutas fora de code fences antes do envio ao
DEV.to (`absolutizeMarkdown`).

### Dependência entre Website, DEV.to e LinkedIn

`distribute.ts` resolve o par primeiro e depois faz GET nas duas
canonicals públicas (`checkPublic` — qualquer status ≠ 200 falha).
Se a resolução OU a checagem pública falhar, a saída é exatamente:

```text
Article: <slug>
Website: failed (<motivo>)
DEV.to: failed (article not distributable)
LinkedIn: failed (article not distributable)
```

Ou seja: **Website é o gate**; DEV.to e LinkedIn nem são tentados
quando o artigo não é distribuível (ou o site ainda não serve as
URLs). Com o par resolvido e o site OK, cada canal roda de forma
independente (`runChannel`): um pode publicar e o outro falhar —
só o canal bem-sucedido é persistido no ledger, e a próxima
execução pula o que já publicou e retenta o outro.

Idempotência (dupla, ambas canônica-dependentes):

- Ledger: `isPublishedFor` só considera publicado se o registro
  guardar **exatamente** a canonical esperada — entradas antigas
  (sem `canonicalUrl`) ou com canonical divergente nunca bloqueiam
  uma publicação nova.
- DEV.to: antes de criar, `findByCanonical` pagina
  `/articles/me` procurando a canonical EN — um post existente é
  adotado (`already-published`) mesmo se o ledger divergir, e nunca
  casa com um post antigo de canonical diferente.

### Ordem recomendada em relação ao deploy

Distribuir **sempre depois** do deploy + verificação das URLs
públicas, porque `checkPublic` busca as canonicals de produção. A
ordem correta está na seção 6.

### Exemplo de troubleshooting: `llm-did-not-win-everywhere`

Erro observado no run (antes da correção):

```text
Website: failed (src/content/articles/pt-br/llm-did-not-win-everywhere.mdx: missing linkedin text for LinkedIn)
DEV.to: failed (article not distributable)
LinkedIn: failed (article not distributable)
```

Por que a ausência de um campo derruba os três: o workflow imprime
esse trio sempre que `resolveArticlePair` lança — e ela lança quando
o lado PT não traz `distribution.linkedin.text`
(`article.ts`, checagem explícita após validar os dois lados). O
artigo também não tinha `distribution.devto.tags` no lado EN
(`missing devto tags for DEV.to`), então mesmo com o LinkedIn
corrigido ele seguiria não distribuível até as tags existirem. A
correção foi só de conteúdo: `linkedin.text` no PT-BR (texto
fornecido + canonical PT, dentro de 3000 chars) e `devto.tags` no
EN — mesmo slug, mesmo `translationKey`, métricas e corpo
inalterados. Nada no workflow, pipeline, schema ou regras mudou.

## 5. Checklist para publicar um novo artigo

Somente campos que existem no schema (`src/content.config.ts`) e
validações reais (`article.ts`, `check-release.ts`,
`check-artifacts.ts`).

Antes do commit:

- [ ] `src/content/articles/pt-br/<slug>.mdx` criado, `locale: pt-BR`.
- [ ] `src/content/articles/en/<slug>.mdx` criado, `locale: en`.
- [ ] Mesmo `translationKey` nos dois arquivos.
- [ ] Mesmo `slug` nos dois arquivos (padrão `^[a-z0-9]+(?:-[a-z0-9]+)*$`).
- [ ] `title` e `description` preenchidos nos dois.
- [ ] `status: published` e `reviewed: true` nos dois (quando for
      publicar; `check-release.ts` exige para itens esperados).
- [ ] `publishedAt` definido nos dois (artigos; exigido no release).
- [ ] `category` preenchida nos dois (exigida pelo schema).
- [ ] PT-BR: `distribution.linkedin.text` contém uma seção PT-BR, depois
      `---` e `English version below 🇬🇧`, seção EN, canonical PT
      (`https://marcelotaparelli.com.br/artigos/<slug>/`) e canonical EN
      (`https://marcelotaparelli.com.br/en/articles/<slug>/`); total ≤ 3000 chars.
- [ ] EN: `distribution.devto.tags` com 1–4 tags não vazias.
- [ ] Links internos do corpo válidos (o validador de artefatos
      confere links/recursos locais nos dois modos de build).

Antes de distribuir:

- [ ] `main` com o artigo, CI verde no push.
- [ ] Deploy executado (`Publish production branch` com o `ci_run_id`).
- [ ] `https://marcelotaparelli.com.br/artigos/<slug>/` retorna 200.
- [ ] `https://marcelotaparelli.com.br/en/articles/<slug>/` retorna 200.
- [ ] Executar `Distribute content` com `article_slug: <slug>`.
- [ ] Conferir o `Summary` do run e os links do DEV.to/LinkedIn.

## 6. Ordem recomendada para publicação

1. Terminar o artigo (par PT-BR + EN, frontmatter completo incl.
   `distribution`).
2. Gates locais: `typecheck`, `lint`, `format:check`, `test`,
   `build` (+ `check-artifacts.ts dist`), `build:preview` (+
   `--preview`) se quiser paridade com o CI, `check:release`,
   `git diff --check`.
3. Commit e push para `main` (direto ou via PR — o CI roda nos dois).
4. Aguardar o `CI` do push em `main` ficar verde; anotar o run id.
5. Executar `Publish production branch` com esse `ci_run_id`.
6. Verificar o site em produção (as duas canonicals do artigo).
7. Executar `Distribute content` com o `article_slug`.
8. Verificar o post no DEV.to (canonical EN).
9. Verificar uma única publicação no LinkedIn com as duas seções e canonicals.
10. Em falha parcial (um canal publicou, outro não): corrigir a causa
    e rodar `Distribute content` de novo — o canal ok é pulado, o
    outro é retentado.

## 7. Troubleshooting

Derivado das validações reais (`article.ts`, `devto.ts`,
`linkedin.ts`, `distribute.ts`, `deploy.yml`, `check-release.ts`).

| Sintoma                                                                                       | Causa provável                                                                                                          | Como verificar                                                      | Correção                                                                                                   |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `DEV.to: failed (article not distributable)` + `LinkedIn: failed (article not distributable)` | `resolveArticlePair` lançou; o motivo real está na linha `Website: failed (...)`                                        | Ler a linha `Website:` do resumo do run                             | Corrigir o frontmatter apontado e republicar o conteúdo (seções 5–6)                                       |
| `missing linkedin text for LinkedIn`                                                          | PT-BR sem `distribution.linkedin.text`                                                                                  | Abrir o MDX PT e conferir o bloco `distribution:`                   | Adicionar post bilíngue com as duas canonicals, marcador inglês e ≤ 3000 chars                             |
| `missing devto tags for DEV.to`                                                               | EN sem `distribution.devto.tags`                                                                                        | Abrir o MDX EN e conferir o bloco `distribution:`                   | Adicionar 1–4 tags                                                                                         |
| `translationKey mismatch`                                                                     | PT e EN com `translationKey` diferentes                                                                                 | Comparar os dois frontmatters                                       | Igualar as keys (a identidade do par é `translationKey` + `locale`)                                        |
| `no published PT-BR/EN article for slug`                                                      | Lado ausente, slug divergente ou `locale` errado                                                                        | Conferir `slug`/`locale` nos dois arquivos e o input `article_slug` | Alinhar slug/locale; rodar o workflow com o slug exato                                                     |
| `status is not published` / `not reviewed` / `missing publishedAt`                            | Artigo em draft, não revisado ou sem data                                                                               | Frontmatter dos dois lados                                          | Completar revisão/data; publicar via deploy antes de distribuir                                            |
| `invalid LinkedIn copy`                                                                       | Falta canonical EN/seção inglesa ou excede 3000 chars                                                                   | Conferir canonicals, marcador EN e tamanho                          | Adicionar post PT → EN com as duas URLs; manter ≤ 3000 chars                                               |
| `devto requires 1 to 4 tags`                                                                  | Zero ou 5+ tags, ou tag vazia                                                                                           | Bloco `devto.tags` no EN                                            | Deixar 1–4 tags não vazias                                                                                 |
| `canonical URL returned HTTP <n>` / `unreachable`                                             | Artigo ainda não deployado (ou URL fora do ar)                                                                          | Abrir as duas canonicals no navegador                               | Fazer o deploy (seção 3) e só então distribuir                                                             |
| `DEV.to: failed (disabled)` / `missing secret: ...`                                           | `DEVTO_API_KEY`, `LINKEDIN_ACCESS_TOKEN` ou `LINKEDIN_PERSON_URN` ausentes                                              | Checar Secrets/Vars do repo (nomes, nunca valores) e logs do passo  | Cadastrar o secret/variável e rodar de novo (nada foi publicado)                                           |
| `DEV.to rejected the API key (401/403)`                                                       | Chave inválida/expirada                                                                                                 | Rotacionar a chave no DEV.to                                        | Atualizar `DEVTO_API_KEY`; rodar de novo (lookup por canonical evita duplicata)                            |
| `DEV.to rejected the payload (422)`                                                           | Payload recusado (ex. tag inválida)                                                                                     | Conferir tags/título/descrição do lado EN                           | Corrigir o frontmatter EN, fazer deploy se o corpo mudou, rodar de novo                                    |
| `DEV.to rate limit (429)`                                                                     | Limite da API                                                                                                           | Aguardar                                                            | Rodar de novo mais tarde (idempotente)                                                                     |
| `LinkedIn rejected the access token (401/403)`                                                | Token inválido/expirado                                                                                                 | Rotacionar o token no LinkedIn                                      | Atualizar `LINKEDIN_ACCESS_TOKEN`; rodar de novo                                                           |
| `LinkedIn rejected the post payload (422)` / `rate limit (429)`                               | Cópia recusada ou limite                                                                                                | Conferir texto/URN; aguardar se 429                                 | Corrigir e rodar de novo; o ledger impede repost duplicado do canal ok                                     |
| `invalid LinkedIn author URN`                                                                 | `LINKEDIN_PERSON_URN` malformada                                                                                        | Deve começar com `urn:li:person:`                                   | Corrigir a variável                                                                                        |
| Canal `already-published` sem post novo                                                       | Ledger já registra a canonical (ou o DEV.to já tem a canonical EN)                                                      | Ler o resumo; checar `distribution-state`                           | Comportamento correto — nada a fazer; se o post remoto foi apagado à mão, o ledger ainda pula (ver abaixo) |
| Post remoto apagado manualmente mas ledger diz publicado                                      | Ledger é a fonte para LinkedIn (a API não oferece lookup confiável)                                                     | Inspecionar `.distribution/state.json` na branch                    | Editar o ledger conscientemente ou republicar com canonical nova — com cuidado, pois repost cria duplicata |
| Build falhou (CI)                                                                             | Typecheck, lint, formato, testes, E2E, artefatos ou release check                                                       | Ler o passo vermelho do run                                         | Corrigir localmente com os mesmos comandos e pusher de novo                                                |
| `check:release` falhou                                                                        | Item sem par bilíngue publicado+revisado, artigo sem `publishedAt`, PDF ausente/não revisado, ou `CONTENT_PREVIEW=true` | Rodar `bun check:release` local                                     | Completar o conteúdo apontado (nunca maquiar o validador)                                                  |
| Deploy rejeita o run (`rejecting CI run ...`)                                                 | Run não é do workflow `CI`, não é `push` em `main`, não completou com sucesso, é de outro repo ou sem SHA               | Comparar o run id informado com um run verde de push em `main`      | Usar o `ci_run_id` correto                                                                                 |
| Pre-push safety checks falham                                                                 | Artefato sem arquivos exigidos, com caminhos proibidos ou com provável secret                                           | Baixar o artefato e inspecionar                                     | Não publicar; investigar a origem (nunca forçar)                                                           |
| `environment aguardando aprovação`                                                            | Não se aplica: não há environments neste repo                                                                           | —                                                                   | A "aprovação" é o próprio dispatch manual                                                                  |
| Workflow rodado com input errado                                                              | `ci_run_id` de PR/falha ou `article_slug` inexistente                                                                   | Resumo do run                                                       | Rodar de novo com o input correto (distribuição com slug errado só falha, sem efeitos)                     |
| Ledger inalterado (`nothing to push`)                                                         | Distribuição já registrada para as canonicals atuais                                                                    | Resumo `already-published`                                          | Nada a fazer                                                                                               |

## 8. Secrets e environments

Somente nomes encontrados nos workflows. Valores nunca aparecem em
lugar nenhum (código mascara secrets nos logs — `redact()` em
`distribute.ts`).

| Nome                    | Onde                               | Para que serve                                                                                                                                         |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GITHUB_TOKEN`          | secrets (automático do GitHub)     | `deploy.yml`: validar o CI run via API, baixar o artefato e dar push em `production`. `distribute-content.yml`: push do ledger em `distribution-state` |
| `DEVTO_API_KEY`         | secrets (cadastrar manualmente)    | Autenticar na API do DEV.to (`https://dev.to/api`, header `api-key`) para lookup e criação do artigo EN                                                |
| `LINKEDIN_ACCESS_TOKEN` | secrets (cadastrar manualmente)    | Bearer token do POST em `https://api.linkedin.com/rest/posts`                                                                                          |
| `LINKEDIN_PERSON_URN`   | **variables** (`vars`, não secret) | URN do autor (`urn:li:person:...`) usada como `author` do post; o workflow falha fechado se ausente ou malformada                                      |

Environments: **nenhum** em nenhum workflow. Permissões seguem o
mínimo: `contents: read` por padrão, com `contents: write` restrito
ao job que publica `production` (mais `actions: read` para validar o
run e baixar o artefato) e ao job que publica o ledger.

## 9. Segurança

- Secrets ficam no GitHub (Settings → Secrets/Variables), nunca no
  repo: `.gitignore` exclui `.env`/`.env.*`; tokens jamais entram em
  MDX, frontmatter ou código. O deploy ainda faz grep por padrões de
  secret no artefato antes do push.
- Permissões mínimas: workflows partem de `contents: read`; escrita
  só onde necessária (job de deploy, job de ledger). Nada usa token
  pessoal ou action de terceiros para publicar.
- `workflow_dispatch` é poder de quem tem acesso de escrita no repo:
  qualquer pessoa com esse acesso pode disparar deploy ou
  distribuição — a mitigação é a revalidação do CI run (deploy) e o
  fail-closed de validação + ledger canônico (distribuição). Trate o
  acesso de escrita como o perímetro.
- Conteúdo externo: o corpo editorial é controlado pelo repo; links
  raiz-relativos viram absolutos só para o DEV.to; o site declara
  `target="_blank"` com `rel="noopener noreferrer"` (coberto por
  E2E). Não colar HTML/JS arbitrário nos textos de distribuição.
- Canonical e APIs: a canonical do site é a fonte da verdade
  (`canonical_url` no DEV.to garante atribuição ao original e
  idempotência no lookup; o texto do LinkedIn carrega a canonical
  PT). Erros das APIs mascaram credenciais (mensagens com status,
  nunca com o token/chave).
- Redação e idempotência existentes: `redact()` mascara secrets em
  toda mensagem de erro do distribuidor; ledger com canonical
  exata + lookup remoto DEV.to por `canonical_url` evitam reposts;
  grupos de concorrência (`production-branch`, `distribution`)
  serializam publicações.

## 10. Comandos úteis

Todos existem em `package.json` (não inventar outros):

```bash
bun run typecheck        # Astro check, estrito, zero erros
bun run lint             # eslint .
bun run format:check     # prettier --check .
bun run test             # unit (root ./tests/unit)
bun run build            # produção (drafts excluídos) → dist/
bun run build:preview    # CONTENT_PREVIEW=true (drafts incluídos) → dist/
bun run test:e2e         # Playwright; serve dist (preview) em :3100
bun run check:release    # pares bilíngues publicados+revisados, datas, PDFs, CONTENT_PREVIEW off
bun scripts/check-artifacts.ts dist [--preview]  # H1 único, canonical/alternates, noindex, links, pares, sem vazamento de draft
bun run cv:generate      # regenera public/cv/*.pdf (fecha em 1 página A4 ou falha)
```

Sequência local que espelha o CI (antes do push):

```bash
git status
bun run typecheck && bun run lint && bun run format:check && bun run test
bun run build:preview && bun scripts/check-artifacts.ts dist --preview
bun run build && bun scripts/check-artifacts.ts dist
bun run check:release
git diff --check
```

(E2E local: `bun run test:e2e` precisa de build preview em `dist`
e do Chromium do Playwright; o CI instala com `playwright install
--with-deps chromium`.)

## 11. Runbook rápido

### Publicar atualização comum do site

1. Editar, revisar localmente (`bun dev`).
2. Gates locais (sequência acima).
3. Commit + push para `main`.
4. CI verde no push → anotar o run id.
5. Actions → "Publish production branch" com o `ci_run_id`.
6. Conferir `production` e o site público. Fim — sem distribuição.

### Publicar artigo novo

1. Criar o par PT-BR + EN com o checklist da seção 5 (incl.
   `distribution` nos dois).
2. Gates locais + `git diff --check`.
3. Commit + push para `main`; CI verde.
4. Deploy com o `ci_run_id`; conferir as duas canonicals (200).
5. Actions → "Distribute content" com o `article_slug`.
6. Conferir o `Summary` do run + posts no DEV.to e LinkedIn.

### Redistribuir / corrigir artigo

1. Corrigir **só o conteúdo** (frontmatter/corpo) em `main` —
   nunca o workflow, o pipeline ou o schema.
2. Gates locais, commit, push, CI verde.
3. Se a correção muda o que o leitor vê no site: fazer o deploy
   antes (as canonicals precisam servir o conteúdo atual).
4. Rodar "Distribute content" com o mesmo slug: o canal já
   publicado é pulado (`already-published`), o outro é (re)tentado.
   Seguro repetir; cada repetição só toca o que falta.

### Quando NÃO rodar Distribute content

- Artigo ainda não deployado (canonicals sem 200) — falha fechada.
- CI vermelho ou `main` com correção ainda não mergeada.
- Secrets/variável ausentes (o run falha sem publicar nada).
- Mudança que não é artigo distribuível (projeto, página, CSS,
  correção de typo já distribuída sem impacto — republicar não
  atualiza posts existentes, só gera ruído).
- Para "atualizar" um post já publicado: o pipeline cria, não
  edita — repost/edição manual é outro fluxo, fora deste pipeline.
