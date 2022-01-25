import defaultSettings from '@/settings'
import enLang from '@/lang/en'
import zhLang from '@/lang/zh'

const title = defaultSettings.title || 'Titan'

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    const lang = localStorage.getItem('language') || defaultSettings.defaultLanguage
    const routeLang: any = lang == 'en' ? enLang.route : zhLang.route
    return `${routeLang[pageTitle]} - ${title}`
  }
  return `${title}`
}
