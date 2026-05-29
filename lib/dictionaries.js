import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  id: () => import('../dictionaries/id.json').then((module) => module.default),
  zh: () => import('../dictionaries/zh.json').then((module) => module.default),
};

// Deep merge helper to fallback missing keys to English
function deepMerge(target, source) {
  if (!target) return source;
  if (!source) return target;

  const result = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
          result[key] = deepMerge(target[key], source[key]);
        } else if (target[key] === undefined) {
          result[key] = source[key];
        }
      } else if (target[key] === undefined) {
        result[key] = source[key];
      }
    }
  }
  return result;
}

export const getDictionary = async (locale) => {
  const englishDict = await dictionaries['en']();
  if (locale === 'en') {
    return englishDict;
  }

  if (dictionaries[locale]) {
    const localeDict = await dictionaries[locale]();
    return deepMerge(localeDict, englishDict);
  }

  return englishDict;
};

