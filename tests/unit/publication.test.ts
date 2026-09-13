import { describe, expect, test } from 'bun:test';
import {
  validatePublication,
  selectEntries,
  type PublicationEntry,
} from '../../src/lib/publication';

const entry = (
  locale: 'pt-BR' | 'en',
  overrides: Partial<PublicationEntry['data']> = {},
): PublicationEntry => ({
  id: `${locale}/example`,
  data: {
    translationKey: 'example',
    locale,
    slug: locale === 'en' ? 'example' : 'exemplo',
    status: 'published',
    reviewed: true,
    ...overrides,
  },
});

describe('bilingual publication', () => {
  test('requires a reviewed pair', () => {
    expect(() => validatePublication([entry('pt-BR')])).toThrow(
      'both reviewed languages',
    );
    expect(() =>
      validatePublication([entry('pt-BR'), entry('en', { reviewed: false })]),
    ).toThrow();
    expect(() =>
      validatePublication([entry('pt-BR'), entry('en', { status: 'draft' })]),
    ).toThrow();
    expect(() =>
      validatePublication([entry('pt-BR'), entry('en')]),
    ).not.toThrow();
  });
  test('drafts can be incomplete but never enter production selection', () => {
    const drafts = [entry('pt-BR', { status: 'draft', reviewed: false })];
    expect(selectEntries(drafts, 'pt-BR', false)).toEqual([]);
    expect(selectEntries(drafts, 'pt-BR', true)).toHaveLength(1);
  });
  test('rejects duplicate keys and route collisions', () => {
    expect(() =>
      validatePublication([entry('pt-BR'), entry('en'), entry('en')]),
    ).toThrow('Duplicate');
    expect(() =>
      validatePublication([
        entry('pt-BR'),
        entry('en'),
        entry('en', { translationKey: 'another' }),
      ]),
    ).toThrow('Duplicate');
  });
  test('allows the same slug in different locales', () => {
    expect(() =>
      validatePublication([entry('en'), entry('pt-BR', { slug: 'example' })]),
    ).not.toThrow();
  });
});
