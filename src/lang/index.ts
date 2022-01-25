import { createI18n } from 'vue-i18n'

// import elementEnLocale from 'element-plus/es/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-plus/es/locale/lang/zh-CN' // element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import settings from '@/settings'

const messages = {
  en: {
    ...enLocale
    // ...elementEnLocale
  },
  zh: {
    ...zhLocale
    // ...elementZhLocale
  }
}

const i18n = createI18n({
  fallbackLocale: 'ch',
  //true --> $t() inject to global
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  // set locale
  // options: en | zh
  locale: localStorage.getItem('language') || settings.defaultLanguage,
  // set locale messages
  messages
})

export default i18n
