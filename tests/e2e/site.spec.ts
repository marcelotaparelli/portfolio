import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pairs = [
  ['/', '/en/'],
  ['/projetos/', '/en/projects/'],
  ['/sobre/', '/en/about/'],
  ['/artigos/', '/en/articles/'],
  ['/contato/', '/en/contact/'],
  ['/projetos/agencia-catus/', '/en/projects/catus-agency/'],
  ['/projetos/atendimento-evag/', '/en/projects/evag-support/'],
  ['/projetos/google-drive-wordpress/', '/en/projects/google-drive-wordpress/'],
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
  await page.goto('/sobre/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  const ptLinks = page.locator('a[href^="/cv/"]');
  await expect(ptLinks).toHaveCount(2);
  for (const link of await ptLinks.all()) {
    await expect(link).toHaveAttribute(
      'href',
      '/cv/marcelo-taparelli-cv-pt-br.pdf',
    );
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
    await expect(link).toHaveAttribute(
      'href',
      '/cv/marcelo-taparelli-cv-en.pdf',
    );
  }
  const enDownload = page.waitForEvent('download');
  await enLinks.first().click();
  expect((await enDownload).suggestedFilename()).toBe(
    'marcelo-taparelli-cv-en.pdf',
  );

  expect(
    (await request.get('/cv/marcelo-taparelli-cv-pt-br.pdf')).status(),
  ).toBe(200);
  expect((await request.get('/cv/marcelo-taparelli-cv-en.pdf')).status()).toBe(
    200,
  );
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain(
    '<loc>',
  );
});
