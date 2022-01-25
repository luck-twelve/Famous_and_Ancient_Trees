// import type { DefineComponent } from 'vue'

// declare module '*.vue' {
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
declare module 'vue3-json-viewer'
declare module 'nprogress'
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
declare interface Window {
  __axiosPromiseArr: any
}
