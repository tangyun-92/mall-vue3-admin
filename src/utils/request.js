import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: window._BASE_CONFIG.baseUrl,
  timeout: 20000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = '123'
    // 如果有token 就携带tokon
    if (token) {
      config.headers['Authorization'] = 'Bearer__' + token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      location.reload()
    }
    ElMessage({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)

const request = (requestObj) => {
  const { url, method, data, timeout } = requestObj
  return service({
    url,
    method: method || 'post',
    data,
    timeout: timeout || 20000
  })
}

export default request
