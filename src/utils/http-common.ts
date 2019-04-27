
import { create } from 'apisauce'

// import { getCookie } from './cookies-helpers'

export const api = create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: { Accept: 'application/vnd.api+json; charset=utf-8' }
})

/*
function http_with_csrf_token () {
  return axios.create({
    baseURL: _baseApiURL,
    headers: {
      'X-CSRF-Token': getCookie('csrf_access_token')
    }
  })
}

export default http_with_csrf_token
*/