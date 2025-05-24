module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'de', 'es', 'ar', 'zh'],
    localeDetection: true,
  },
  defaultNS: 'common',
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}; 