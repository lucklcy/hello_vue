import cache from '@/common/cache'
import { NO_USER_TOKEN_STATUS_CODE_GATEWAY, REQUEST_METHOD_GET, REQUEST_METHOD_POST } from '@/common/const'
import axios from 'axios'
import { Message } from 'element-ui'
import { getCookie } from '../utils'
import common from './procedure/common'
const ppdaiAdminCasToken = getCookie('ppdaiAdminCasToken')

const defaultConfig = {
  baseURL: '/internalApi',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-PPD-TOKEN': ppdaiAdminCasToken,
    'X-PPD-TOKENTYPE': 'CAS'
  },
  module: '',
  timeout: 60 * 1000,
  validateStatus: function (status) {
    return true
  },
  withCredentials: true
}

export const crowPackUpload = params => {
  const config = Object.assign({}, defaultConfig, {
    baseURL: '/upApi',
    timeout: 2 * 60 * 60 * 1000
  })
  const upHttp = axios.create(config)
  upHttp.interceptors.response.use(response => {
    const { data: res } = response
    const { Result, ResultMessage } = res
    if (Result === 0) {
      return res
    } else {
      Message({ message: ResultMessage, type: 'error', duration: 5 * 1000 })
      return Promise.reject(res)
    }
  })
  return new Promise((resolve, reject) => {
    upHttp
      .post('/import/upload', params)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

function Service() {
  const services = [...common]
  const _this = this
  const _http = axios.create(defaultConfig)

  // 添加请求拦截器
  _http.interceptors.request.use(
    config => {
      if (['/internalApi/mktadsadmin/api/userpack/delete'].indexOf(config.url > -1)) {
        config.timeout = 2 * 60 * 60 * 1000
      }

      return config
    },
    error => {
      // 对请求错误做些什么
      console && console.log({ error })
      return Promise.reject(error)
    }
  )

  _http.interceptors.response.use(
    response => {
      let { data: res, status: httpStatus, config } = response
      if (httpStatus === NO_USER_TOKEN_STATUS_CODE_GATEWAY) {
        window.location.href = '//cas.ppdaicorp.com/login/page?returnUrl=http://cmploan.ppdaicorp.com/'
      } else {
        // http status 为 200，表示正确响应
        // eslint-disable-next-line no-prototype-builtins
        if (res.hasOwnProperty('Result')) {
          const { Result, ResultMessage, CodeMsg } = res
          if (Result === 0) {
            if (config.url.indexOf('/api/userpack') > -1)
              res = {
                content: res.Content,
                result: res.Result,
                resultMessage: res.ResultMessage
              }
            return res
          } else {
            if (CodeMsg === 'CAS_USER_NOT_LOGIN') {
              window.location.href = `//cas.ppdaicorp.com/login/page?returnUrl=${window.location.href}`
              return
            }
            Message({
              message: ResultMessage,
              type: 'error',
              duration: 5 * 1000
            })
            return Promise.reject(res)
          }
          // eslint-disable-next-line no-prototype-builtins
        } else if (res.hasOwnProperty('result')) {
          const { result, resultMessage } = res
          if (
            [
              '/internalApi/mkt-ads-udc-adm/udcAdmService/callback/channel/pageSelect',
              '/internalApi/mktadsadmin/api/userpack/delete',
              '/internalApi/mktadsadmin/api/userpack/queryDelResult'
            ].indexOf(config.url) > -1
          ) {
            return res
          } else {
            if (result === 0) {
              return res
            } else {
              Message({
                message: resultMessage,
                type: 'error',
                duration: 5 * 1000
              })
              return Promise.reject(res)
            }
          }
        }
      }
    },
    // 服务器出现问题，无法给予正确的响应
    error => {
      Message({
        message: '发生异常错误,请刷新页面重试,或联系程序员',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )

  services.forEach(item => {
    const { subUrl, name, method, cacheKey } = item
    _this[name] = params => {
      if (cacheKey) {
        // 表示缓存接口结果
        if (cache[cacheKey]) {
          return Promise.resolve(cache[cacheKey])
        } else {
          return new Promise((resolve, reject) => {
            if (method === REQUEST_METHOD_GET) {
              _http
                .get(subUrl, { params: { ...params } })
                .then(res => {
                  cache[cacheKey] = res
                  return resolve(res)
                })
                .catch(err => {
                  return reject(err)
                })
            } else {
              _http
                .post(subUrl, params)
                .then(res => {
                  cache[cacheKey] = res
                  return resolve(res)
                })
                .catch(err => {
                  return reject(err)
                })
            }
          })
        }
      } else {
        // 不缓存接口结果
        if (method === REQUEST_METHOD_GET) {
          return _http.get(subUrl, { params: { ...params } })
        }
        if (method === REQUEST_METHOD_POST) {
          return _http.post(subUrl, params)
        }
      }
    }
  })
}

export default new Service()
