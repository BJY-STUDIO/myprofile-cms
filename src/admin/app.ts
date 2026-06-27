import type { StrapiApp } from '@strapi/strapi/admin';
import zhHansTranslations from './translations/zh-Hans.json';

export default {
  config: {
    locales: ['zh-Hans'],
    translations: {
      'zh-Hans': zhHansTranslations,
    },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
