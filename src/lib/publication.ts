import { locales, type Locale } from '../i18n/routes';

export interface PublicationEntry {
  id: string;
  data: {
    translationKey: string;
    locale: Locale;
    slug: string;
    status: 'draft' | 'published';
    reviewed: boolean;
  };
}

export function validatePublication(entries: PublicationEntry[]) {
  const keys = new Set<string>();
  const paths = new Set<string>();
  for (const entry of entries) {
    const key = `${entry.data.translationKey}:${entry.data.locale}`;
    const path = `${entry.data.locale}:${entry.data.slug}`;
    if (keys.has(key) || paths.has(path))
      throw new Error(`Duplicate translation or route: ${entry.id}`);
    keys.add(key);
    paths.add(path);
    if (entry.data.status !== 'published') continue;
    for (const locale of locales) {
      const pair = entries.find(
        (candidate) =>
          candidate.data.translationKey === entry.data.translationKey &&
          candidate.data.locale === locale,
      );
      if (!pair || pair.data.status !== 'published' || !pair.data.reviewed) {
        throw new Error(
          `Publication requires both reviewed languages: ${entry.data.translationKey} (${locale})`,
        );
      }
    }
  }
}

export function selectEntries<T extends PublicationEntry>(
  entries: T[],
  locale: Locale,
  preview: boolean,
): T[] {
  validatePublication(entries);
  return entries.filter(
    (entry) =>
      entry.data.locale === locale &&
      (preview || entry.data.status === 'published'),
  );
}
