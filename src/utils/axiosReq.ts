import store from '@/store'
import axios from 'axios'
import qs from 'qs'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { getToken, setToken } from '@/utils/auth'
let reqConfig: any
let loadingE: any

const service: any = axios.create()
// request
service.interceptors.request.use(
  (req: any) => {
    //axios cancel req https://www.jianshu.com/p/49568b10b29b
    req.cancelToken = new axios.CancelToken((cancel) => {
      window.__axiosPromiseArr.push({
        url: req.url,
        cancel
      })
    })
    // token setting
    req.headers['AUTHORIZE_TOKEN'] = getToken()
    /* formData */
    if (req.isFormData) {
      req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    /* download file*/
    if (req.isDownLoadFile) {
      req.responseType = 'blob'
    }
    /* upload file*/
    if (req.isUploadFile) {
      req.headers['Content-Type'] = 'multipart/form-data'
    }
    if (req.bfLoading) {
      loadingE = ElLoading.service({
        lock: true,
        text: '数据载入中',
        // spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    }
    /*
     *params会拼接到url上,such as  "a=1&b=2"
     * */
    if (req.isParams) {
      req.params = req.data
      req.data = {}
    }
    //save req for res to using
    reqConfig = req
    return req
  },
  (err: any) => {
    Promise.reject(err)
  }
)
//response
service.interceptors.response.use(
  (res: any) => {
    if (reqConfig.afHLoading && loadingE) {
      loadingE.close()
    }
    // direct return, when download file
    if (reqConfig.isDownLoadFile || !res || !res.data) {
      return res
    }
    const { flag, showFlag, msg, code, isNeedUpdateToken, updateToken } = res?.data
    //update token
    if (isNeedUpdateToken) {
      setToken(updateToken)
    }
    if (flag) {
      //业务成功处理
      if (showFlag) {
        ElMessage({ message: msg, type: 'success' })
      }
      return res
    } else {
      //业务失败处理
      // if (code === 403) {
      //   ElMessageBox.confirm('请重新登录', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //       //direct return
      //       return Promise.reject(res.data)
      //     })
      //   })
      // }
      //是否需要提示错误信息 isAlertErrorMsg:true 提示
      if (reqConfig.isAlertErrorMsg) {
        ElMessage({
          message: msg,
          type: 'error',
          duration: 2 * 1000
        })
      }
      //返回错误信息
      //如果未catch 走unhandledrejection进行收集
      return Promise.reject(res.data)
    }
  },
  (err: any) => {
    /*http错误处理，处理跨域，404，401，500*/
    if (loadingE) loadingE.close()
    ElMessage({
      message: err,
      type: 'error',
      duration: 2 * 1000
    })
    //如果是跨域
    //Network Error,cross origin
    const errObj = {
      msg: err.toString(),
      reqUrl: reqConfig.baseURL + reqConfig.url,
      params: reqConfig.isParams ? reqConfig.params : reqConfig.data
    }
    return Promise.reject(JSON.stringify(errObj))
  }
)

interface AxiosReq {
  url: string
  data: any
  method: string
  isParams: boolean
  bfLoading: boolean
  afHLoading: boolean
  isFormData: boolean
  isUploadFile: boolean
  isDownLoadFile: boolean
  baseURL: string
  timeout: number
  isAlertErrorMsg: boolean
}
export default function axiosReq({
  url,
  data,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isFormData,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg
}: AxiosReq) {
  return service({
    url: url,
    method: method ?? 'get',
    data: qs.stringify(data) ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? true,
    afHLoading: afHLoading ?? true,
    isFormData: isFormData ?? false,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL, // 设置基本基础url
    timeout: timeout ?? 10000 // 配置默认超时时间
  })
}
