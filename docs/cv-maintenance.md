# Keeping projects and CVs synchronized

Every project addition, removal, ordering change or content edit must include
review and updates of both `cv/pt-br.html` and `cv/en.html`. Keep the same
selected projects, order, evidence and limitations in both languages. Selection
is intentional: the one-page CVs do not need to list every portfolio case.
Preserve verified claims and distinguish historical model results from later
artifacts. Do not alter employment or education without a factual source.

1. Review the changed project and the full current project set. Update both CVs'
   selection, descriptions, summary and skills as relevant. For corrections to
   details omitted from a CV, document the review and why its prose still holds.
2. Run `bun run cv:generate`. Inspect both rendered CVs and their links; each PDF
   must have exactly one A4 page. Shorten prose rather than shrinking the font or
   weakening the generator's overflow checks.
3. Have the owner review the editorial changes before publication. Generating
   PDFs or updating the record does not establish human approval.
4. Refresh the synchronization record only after the CVs and PDFs match the
   current projects, using the command below from the repository root.
5. Run the quality gates in `package.json`, including `bun run test`, preview
   and production builds, artifact validation and release validation. Commit
   the project changes, both CVs/PDFs and the record together. Do not push without
   authorization.

```sh
bun -e 'import { createHash } from "node:crypto";
const paths = ["cv/pt-br.html", "cv/en.html", "public/cv/marcelo-taparelli-cv-pt-br.pdf", "public/cv/marcelo-taparelli-cv-en.pdf"];
for await (const path of new Bun.Glob("src/content/projects/**/*.mdx").scan(".")) paths.push(path);
const record = {};
for (const path of paths.sort()) record[path] = createHash("sha256").update(new Uint8Array(await Bun.file(path).arrayBuffer())).digest("hex");
await Bun.write("cv/project-sync.json", JSON.stringify(record, null, 2) + "\n");'
```

`tests/unit/cv-sync.test.ts` compares SHA-256 fingerprints of all project MDX
files (including drafts), both HTML sources and both PDFs with the record.
Edits, additions and removals fail the existing unit-test CI gate until the
record is refreshed. This detects drift, not semantic accuracy or human review;
reviewers must reject a record-only refresh that skips CV review. CSS-only site
changes do not require editorial CV updates. CV stylesheet changes still require
regenerating and visually reviewing both PDFs.

CV download links include a SHA-256 version parameter computed from each PDF
at build time. Replacing a PDF changes its download URL, avoiding stale copies
in the hosting cache. After deployment, compare the bytes downloaded from each
rendered PT/EN link with the corresponding approved PDF. The E2E suite checks
both URL fingerprints and served PDF bytes; this does not verify the live host.
