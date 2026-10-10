// Project launches use approved PT-BR copy, independent of article distribution.
// Both website locales must remain published and reviewed.
import {
  DistributionError,
  fsReader,
  splitFrontmatter,
  validateDistributionInput,
  type ArticleReader,
} from './article';
import { ORIGIN, type ResolvedPair, type ResolvedArticle } from './types';

export const projectReader: ArticleReader = {
  ...fsReader,
  listPtFiles: async () => {
    const paths: string[] = [];
    for await (const path of new Bun.Glob(
      'src/content/projects/pt-br/*.mdx',
    ).scan('.'))
      paths.push(path);
    return paths.sort();
  },
  listEnFiles: async () => {
    const paths: string[] = [];
    for await (const path of new Bun.Glob('src/content/projects/en/*.mdx').scan(
      '.',
    ))
      paths.push(path);
    return paths.sort();
  },
};

export async function resolveProjectPost(
  slug: string,
  reader: ArticleReader = projectReader,
): Promise<ResolvedPair> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new DistributionError(`invalid slug: ${slug}`);

  async function resolveLocale(
    locale: 'pt-BR' | 'en',
  ): Promise<ResolvedArticle> {
    const paths = await (locale === 'pt-BR'
      ? reader.listPtFiles()
      : reader.listEnFiles());
    for (const path of paths) {
      const { data } = splitFrontmatter(await reader.readFile(path));
      if (data.slug !== slug || data.locale !== locale) continue;
      if (data.status !== 'published' || data.reviewed !== true)
        throw new DistributionError(
          `${path}: project is not published and reviewed`,
        );
      if (
        typeof data.translationKey !== 'string' ||
        !data.translationKey ||
        typeof data.title !== 'string' ||
        !data.title ||
        typeof data.description !== 'string' ||
        !data.description
      )
        throw new DistributionError(`${path}: missing project metadata`);
      return {
        slug,
        translationKey: data.translationKey,
        title: data.title,
        description: data.description,
        markdown: '',
        canonicalUrl: `${ORIGIN}/${locale === 'pt-BR' ? 'projetos' : 'en/projects'}/${slug}/`,
        distribution: {},
      };
    }
    throw new DistributionError(
      `no published ${locale} project for slug: ${slug}`,
    );
  }

  const pt = await resolveLocale('pt-BR');
  const en = await resolveLocale('en');
  if (pt.translationKey !== en.translationKey)
    throw new DistributionError('project translationKey mismatch');
  const { data, body } = splitFrontmatter(
    await reader.readFile(`docs/editorial/${slug}-linkedin.md`),
  );
  if (
    data.slug !== slug ||
    data.locale !== 'pt-BR' ||
    data.status !== 'approved' ||
    data.reviewed !== true
  )
    throw new DistributionError(
      'project LinkedIn copy is not approved and reviewed',
    );
  pt.distribution.linkedinText = body.trim();
  validateDistributionInput(pt.distribution, pt.canonicalUrl);
  return { slug, translationKey: pt.translationKey, pt, en };
}
