import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const pairs = [
  ['/', '/en/'],
  ['/projetos/', '/en/projects/'],
  ['/sobre/', '/en/about/'],
  ['/artigos/', '/en/articles/'],
  ['/contato/', '/en/contact/'],
  ['/projetos/agencia-catus/', '/en/projects/catus-agency/'],
  ['/projetos/atendimento-evag/', '/en/projects/evag-support/'],
  ['/projetos/google-drive-wordpress/', '/en/projects/google-drive-wordpress/'],
  ['/projetos/salus/', '/en/projects/salus/'],
  ['/projetos/ops-triage-ai/', '/en/projects/ops-triage-ai/'],
  ['/projetos/opspilot-ai/', '/en/projects/opspilot-ai/'],
  ['/projetos/defectrisk-ml/', '/en/projects/defectrisk-ml/'],
  [
    '/artigos/better-models-are-not-enough/',
    '/en/articles/better-models-are-not-enough/',
  ],
  [
    '/projetos/resilient-transaction-api/',
    '/en/projects/resilient-transaction-api/',
  ],
];

test('all page pairs have equivalent navigation and reciprocal SEO', async ({
  page,
}) => {
  for (const pair of pairs) {
    for (const [index, path] of pair.entries()) {
      const locale = index === 0 ? 'pt-BR' : 'en';
      const opposite = index === 0 ? 'en' : 'pt-BR';
      const equivalent = pair[1 - index]!;
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://marcelotaparelli.com.br${path}`,
      );
      await expect(
        page.locator(`link[hreflang="${opposite}"]`),
      ).toHaveAttribute('href', `https://marcelotaparelli.com.br${equivalent}`);
      await page.locator(`.language-switch a[lang="${opposite}"]`).click();
      await expect(page).toHaveURL(`http://127.0.0.1:3100${equivalent}`);
      expect(
        (await page.locator('meta[name="description"]').getAttribute('content'))
          ?.length,
      ).toBeGreaterThan(20);
    }
  }
});

test('mobile menu works with keyboard and Escape restores focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.locator('.mobile-menu summary');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(page.locator('.mobile-menu a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await page.locator('.mobile-menu a').first().click();
  await expect(page).toHaveURL(/\/projetos\/$/);
});

test('skip link reaches the main landmark', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('no-JavaScript mobile navigation and content remain usable', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/');
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('.mobile-menu summary').click();
  await page.locator('.mobile-menu a').first().click();
  await expect(page).toHaveURL(/\/projetos\/$/);
  await context.close();
});

for (const path of [
  '/',
  '/en/',
  '/sobre/',
  '/en/about/',
  '/projetos/',
  '/en/projects/',
  '/projetos/opspilot-ai/',
  '/en/projects/opspilot-ai/',
  '/projetos/ops-triage-ai/',
  '/en/projects/ops-triage-ai/',
  '/projetos/defectrisk-ml/',
  '/en/projects/defectrisk-ml/',
  '/artigos/better-models-are-not-enough/',
  '/en/articles/better-models-are-not-enough/',
  '/projetos/resilient-transaction-api/',
  '/en/projects/resilient-transaction-api/',
  '/projetos/agencia-catus/',
  '/contato/',
  '/artigos/',
]) {
  test(`WCAG checks and 320px reflow: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}

test('errors are localized and return 404', async ({ page }) => {
  for (const [path, locale] of [
    ['/missing/', 'pt-BR'],
    ['/en/missing/', 'en'],
  ]) {
    expect((await page.goto(path!))?.status()).toBe(404);
    await expect(page.locator('html')).toHaveAttribute('lang', locale!);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  }
});

test('project external links are explicit, safe and locale-equivalent', async ({
  page,
}) => {
  const expectations = [
    {
      listing: '/projetos/',
      casePath: '/projetos/agencia-catus/',
      url: 'https://www.catus.com.br/',
      readCase: 'Explorar case',
      cta: 'Visitar site',
      aria: 'Visitar site: Agência Catus — abre em nova aba',
    },
    {
      listing: '/projetos/',
      casePath: '/projetos/atendimento-evag/',
      url: 'https://atendimento.evag.me/',
      readCase: 'Explorar case',
      cta: 'Visitar site',
      aria: 'Visitar site: Atendimento EVAG — abre em nova aba',
    },
    {
      listing: '/projetos/',
      casePath: '/projetos/salus/',
      url: 'https://github.com/marcelotaparelli/salus',
      readCase: 'Explorar case',
      cta: 'Visitar site',
      aria: 'Visitar site: Salus — abre em nova aba',
    },
    {
      listing: '/projetos/',
      casePath: '/projetos/ops-triage-ai/',
      url: 'https://github.com/marcelotaparelli/ops-triage-ai',
      readCase: 'Explorar case',
      cta: 'Visitar site',
      aria: 'Visitar site: Ops Triage AI — abre em nova aba',
    },
    {
      listing: '/en/projects/',
      casePath: '/en/projects/catus-agency/',
      url: 'https://www.catus.com.br/',
      readCase: 'Explore case',
      cta: 'Visit website',
      aria: 'Visit website: Agência Catus — opens in a new tab',
    },
    {
      listing: '/en/projects/',
      casePath: '/en/projects/evag-support/',
      url: 'https://atendimento.evag.me/',
      readCase: 'Explore case',
      cta: 'Visit website',
      aria: 'Visit website: Atendimento EVAG — opens in a new tab',
    },
    {
      listing: '/en/projects/',
      casePath: '/en/projects/salus/',
      url: 'https://github.com/marcelotaparelli/salus',
      readCase: 'Explore case',
      cta: 'Visit website',
      aria: 'Visit website: Salus — opens in a new tab',
    },
    {
      listing: '/en/projects/',
      casePath: '/en/projects/ops-triage-ai/',
      url: 'https://github.com/marcelotaparelli/ops-triage-ai',
      readCase: 'Explore case',
      cta: 'Visit website',
      aria: 'Visit website: Ops Triage AI — opens in a new tab',
    },
    ...['pt-BR', 'en'].flatMap((locale) =>
      ['opspilot-ai', 'resilient-transaction-api', 'defectrisk-ml'].map(
        (slug) => {
          const english = locale === 'en';
          const title =
            slug === 'opspilot-ai'
              ? 'OpsPilot AI'
              : slug === 'defectrisk-ml'
                ? 'DefectRisk'
                : 'Resilient Transaction API';
          const listing = english ? '/en/projects/' : '/projetos/';
          return {
            listing,
            casePath: listing + slug + '/',
            url: 'https://github.com/marcelotaparelli/' + slug,
            readCase: english ? 'Explore case' : 'Explorar case',
            cta: english ? 'Visit website' : 'Visitar site',
            aria: english
              ? 'Visit website: ' + title + ' — opens in a new tab'
              : 'Visitar site: ' + title + ' — abre em nova aba',
          };
        },
      ),
    ),
  ];
  for (const item of expectations) {
    await page.goto(item.listing);
    const link = page.locator(`article a[href="${item.url}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toContainText(item.cta);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('aria-label', item.aria);

    await page.goto(item.casePath);
    const headerLink = page.locator(`.case-intro a[href="${item.url}"]`);
    await expect(headerLink).toHaveCount(1);
    await expect(headerLink).toContainText(item.cta);
    await expect(headerLink).toHaveAttribute('target', '_blank');
    await expect(headerLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(headerLink).toHaveAttribute('aria-label', item.aria);

    await page.goto(item.listing);
    const card = page.locator('article', {
      has: page.locator(`a[href="${item.url}"]`),
    });
    await card.locator(`a[aria-label^="${item.readCase}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${item.casePath}$`));
  }

  for (const [listing, casePath] of [
    ['/projetos/', '/projetos/google-drive-wordpress/'],
    ['/en/projects/', '/en/projects/google-drive-wordpress/'],
  ]) {
    await page.goto(listing!);
    const drive = page.locator('article', { hasText: 'Google Drive' });
    await expect(drive.locator('a[target="_blank"]')).toHaveCount(0);
    await page.goto(casePath!);
    await expect(page.locator('.case-intro a[target="_blank"]')).toHaveCount(0);
  }
});

test('draft preview is non-indexable and CV links target valid locale PDFs', async ({
  page,
  request,
}) => {
  const ptPdf = await readFile(
    new URL('../../public/cv/marcelo-taparelli-cv-pt-br.pdf', import.meta.url),
  );
  const enPdf = await readFile(
    new URL('../../public/cv/marcelo-taparelli-cv-en.pdf', import.meta.url),
  );
  const ptHref = `/cv/marcelo-taparelli-cv-pt-br.pdf?v=${createHash('sha256').update(ptPdf).digest('hex')}`;
  const enHref = `/cv/marcelo-taparelli-cv-en.pdf?v=${createHash('sha256').update(enPdf).digest('hex')}`;
  await page.goto('/sobre/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  const ptLinks = page.locator('a[href^="/cv/"]');
  await expect(ptLinks).toHaveCount(2);
  for (const link of await ptLinks.all()) {
    await expect(link).toHaveAttribute('href', ptHref);
  }
  const ptDownload = page.waitForEvent('download');
  await ptLinks.first().click();
  expect((await ptDownload).suggestedFilename()).toBe(
    'marcelo-taparelli-cv-pt-br.pdf',
  );

  await page.goto('/en/about/');
  const enLinks = page.locator('a[href^="/cv/"]');
  await expect(enLinks).toHaveCount(2);
  for (const link of await enLinks.all()) {
    await expect(link).toHaveAttribute('href', enHref);
  }
  const enDownload = page.waitForEvent('download');
  await enLinks.first().click();
  expect((await enDownload).suggestedFilename()).toBe(
    'marcelo-taparelli-cv-en.pdf',
  );

  for (const [href, pdf] of [
    [ptHref, ptPdf],
    [enHref, enPdf],
  ] as const) {
    const response = await request.get(href);
    expect(response.status()).toBe(200);
    expect(await response.body()).toEqual(pdf);
  }
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain(
    '<loc>',
  );
});

test('AI and software positioning, metadata and project priority agree in both languages', async ({
  page,
}) => {
  for (const [home, about, projects, headline] of [
    ['/', '/sobre/', '/projetos/', 'Engenheiro de IA | Engenheiro de Software'],
    ['/en/', '/en/about/', '/en/projects/', 'AI Engineer | Software Engineer'],
  ]) {
    for (const path of [home!, about!]) {
      await page.goto(path);
      const title = `${path === about ? (home === '/' ? 'Sobre — ' : 'About — ') : ''}${headline} — Marcelo Taparelli`;
      await expect(page).toHaveTitle(title);
      const graph = JSON.parse(
        await page.locator('script[type="application/ld+json"]').innerText(),
      )['@graph'] as Array<{ '@type': string; jobTitle?: string }>;
      expect(graph.find((item) => item['@type'] === 'Person')?.jobTitle).toBe(
        headline,
      );
      for (const name of ['og:title', 'twitter:title']) {
        await expect(
          page.locator(`meta[property="${name}"], meta[name="${name}"]`),
        ).toHaveAttribute('content', title);
      }
      const body = await page.locator('main').innerText();
      expect(body).not.toMatch(
        /aspiring|transitioning|deepening|learning AI|Cruzeiro|UniBF/i,
      );
      if (path === home) {
        expect(
          (await page.locator('h1').innerText())
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase(),
        ).toBe(
          (path === '/'
            ? 'De problemas reais a produtos de IA.'
            : 'From real problems to AI products.'
          ).toLowerCase(),
        );
        await expect(page.locator('.hero-positioning')).toHaveCount(0);
        await expect(page.locator('.hero-eyebrow')).toContainText(
          headline!.replace(' | ', ' & ').toUpperCase(),
        );
        await expect(page.locator('.hero-intro p')).toHaveText(
          path === '/'
            ? [
                'Atuo com pesquisa de IA, automação de processos e desenvolvimento agêntico na Agência Catus e na EVAG, combinando Engenharia de Software e visão de produto.',
                'Construo RAG, agentes e Machine Learning com avaliação, guardrails e revisão humana, apoiado por experiência em backend, APIs e produção.',
              ]
            : [
                'I work on AI research, process automation, and agentic development at Agência Catus and EVAG, combining Software Engineering with a product perspective.',
                'I build RAG, agents, and Machine Learning with evaluation, guardrails, and human review, supported by experience in backend, APIs, and production.',
              ],
        );
        await expect(page.locator('.hero-bottom')).toContainText(
          path === '/'
            ? 'Engenharia de IA · Engenharia de Software · Visão de Produto'
            : 'AI Engineering · Software Engineering · Product lens',
        );
        await expect(
          page.locator('.hero-actions .button-primary'),
        ).toBeVisible();
      }
    }
    for (const path of [home!, projects!]) {
      await page.goto(path);
      expect(
        (
          await page
            .locator('.project-info')
            .locator('h2, h3')
            .allTextContents()
        ).map((s) => s.trim()),
      ).toEqual([
        'OpsPilot AI',
        'Ops Triage AI',
        'DefectRisk',
        'Resilient Transaction API',
        'Salus',
        'Agência Catus',
        'Atendimento EVAG',
        'Google Drive → WordPress',
      ]);
    }
  }
});

test('education has the required order and institution exposure in both languages', async ({
  page,
}) => {
  for (const locale of [
    {
      about: '/sobre/',
      cv: 'pt-br.html',
      heading: 'Formação',
      postgraduate: 'Pós-graduação em Engenharia de IA',
      siteDate: 'abril de 2027',
      cvDate: '04/2027',
      degree: 'Análise e Desenvolvimento de Sistemas',
      coursework: 'Engenharia de Software — Alura',
      courseworkDetail:
        'Back-end · APIs Node.js · Autenticação · Testes · Segurança · DevOps/CI/CD · Cloud/AWS · Desenvolvimento Seguro',
      languages: 'Idiomas',
      native: 'Português — nativo',
      advanced: 'Inglês — avançado',
    },
    {
      about: '/en/about/',
      cv: 'en.html',
      heading: 'Education',
      postgraduate: 'Postgraduate Program in AI Engineering',
      siteDate: 'April 2027',
      cvDate: 'Apr 2027',
      degree: 'Systems Analysis and Development',
      coursework: 'Software Engineering — Alura',
      courseworkDetail:
        'Back-end · Node.js APIs · Authentication · Testing · Security · DevOps/CI/CD · Cloud/AWS · Secure Development',
      languages: 'Languages',
      native: 'Portuguese — native',
      advanced: 'English — advanced',
    },
  ]) {
    await page.goto(locale.about);
    const section = page.locator('.education-section');
    await expect(section.locator('h2')).toHaveText(locale.heading);
    await expect(section.locator('h3')).toHaveText([
      locale.postgraduate,
      locale.degree,
      locale.coursework,
    ]);
    await expect(section.locator('li').nth(0)).toContainText(locale.siteDate);
    await expect(section.locator('li').nth(1)).toContainText('2026');
    await expect(section.locator('li').nth(2).locator('p')).toHaveText(
      locale.courseworkDetail,
    );
    expect(await section.innerText()).not.toMatch(/Cruzeiro|UniBF/i);

    await page.goto(new URL(`../../cv/${locale.cv}`, import.meta.url).href);
    await expect(page.locator('h2').last()).toHaveText(locale.languages);
    await expect(page.locator('h2').nth(4)).toHaveText(locale.heading);
    const education = page.locator('.education');
    await expect(education.locator('strong')).toHaveText([
      `${locale.postgraduate} — Cruzeiro do Sul`,
      `${locale.degree} — UniBF`,
      locale.coursework,
    ]);
    await expect(education.locator('p').nth(0)).toContainText(locale.cvDate);
    await expect(education.locator('p').nth(1)).toContainText('2026');
    await expect(education.locator('p').nth(2)).toContainText(
      locale.courseworkDetail,
    );
    await expect(page.locator('.education + h2 + p')).toContainText(
      locale.native,
    );
    await expect(page.locator('.education + h2 + p')).toContainText(
      locale.advanced,
    );
  }
});
