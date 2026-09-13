import { getCollection, type CollectionEntry } from 'astro:content';
import { contentPath, otherLocale, type Locale } from '../i18n/routes';
import { selectEntries } from './publication';

export const isPreview =
  import.meta.env.DEV || import.meta.env.CONTENT_PREVIEW === 'true';

export async function projectsFor(locale: Locale) {
  return selectEntries(await getCollection('projects'), locale, isPreview).sort(
    (a, b) => a.data.order - b.data.order,
  );
}
export async function articlesFor(locale: Locale) {
  const articles = await getCollection('articles');
  for (const article of articles) {
    if (article.data.status === 'published' && !article.data.publishedAt)
      throw new Error(`Missing publication date: ${article.id}`);
  }
  return selectEntries(articles, locale, isPreview).sort(
    (a, b) =>
      (b.data.publishedAt?.valueOf() ?? 0) -
      (a.data.publishedAt?.valueOf() ?? 0),
  );
}
export async function equivalentPath(
  entry: CollectionEntry<'projects'> | CollectionEntry<'articles'>,
) {
  const entries =
    entry.collection === 'projects'
      ? await projectsFor(otherLocale(entry.data.locale))
      : await articlesFor(otherLocale(entry.data.locale));
  const equivalent = entries.find(
    (candidate) => candidate.data.translationKey === entry.data.translationKey,
  );
  if (!equivalent) throw new Error(`Missing equivalent page for ${entry.id}`);
  return contentPath(
    entry.collection,
    equivalent.data.locale,
    equivalent.data.slug,
  );
}
