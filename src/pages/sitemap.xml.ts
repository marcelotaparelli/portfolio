import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { locales, routes, contentPath } from '../i18n/routes';
import { isPreview, projectsFor, articlesFor } from '../lib/content';

export const GET: APIRoute = async () => {
  const paths: string[] = [];
  if (!isPreview) {
    for (const [page, translations] of Object.entries(routes)) {
      if (page !== 'notFound') paths.push(...Object.values(translations));
    }
    for (const locale of locales) {
      for (const entry of [
        ...(await projectsFor(locale)),
        ...(await articlesFor(locale)),
      ]) {
        paths.push(contentPath(entry.collection, locale, entry.data.slug));
      }
    }
  }
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${site.origin}${path}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
