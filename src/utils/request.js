import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: window._BASE_CONFIG.baseUrl,
  timeout: 20000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = store.state.user.token
    // 如果有token 就携带tokon
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (!res.result) {
      ElMessage({
        type: 'error',
        message: res.message
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push('/login')
      ElMessage({
        type: 'error',
        message: 'token已过期，请重新登录'
      })
      return Promise.reject(error)
    }
    ElMessage({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)

const request = (requestObj) => {
  const { url, method, data, timeout, params } = requestObj
  return service({
    url,
    method: method || 'post',
    data,
    timeout: timeout || 20000,
    params
  })
}

export default request
