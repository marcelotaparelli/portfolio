export const locales = ['pt-BR', 'en'] as const;
export type Locale = (typeof locales)[number];
export const routes = {
  home: { 'pt-BR': '/', en: '/en/' },
  projects: { 'pt-BR': '/projetos/', en: '/en/projects/' },
  about: { 'pt-BR': '/sobre/', en: '/en/about/' },
  articles: { 'pt-BR': '/artigos/', en: '/en/articles/' },
  contact: { 'pt-BR': '/contato/', en: '/en/contact/' },
  notFound: { 'pt-BR': '/404.html', en: '/en/404/' },
} as const;
export type Page = keyof typeof routes;
export const otherLocale = (locale: Locale): Locale =>
  locale === 'en' ? 'pt-BR' : 'en';
export const pathFor = (page: Page, locale: Locale) => routes[page][locale];
export function contentPath(
  collection: 'projects' | 'articles',
  locale: Locale,
  slug: string,
) {
  return `${pathFor(collection, locale)}${slug}/`;
}
