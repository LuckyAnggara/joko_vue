import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://127.0.0.1:8000/api/',
  baseURL2: 'https://www.lapkin.bbmakmur.com/api/employee?limit=50',
  // baseURL2: 'https://api-katalis.itjenkumham.site/api/',
  // baseURL: 'http://192.168.16.128:8000/api/',
  // baseURL: 'http://103.131.116.141/api-katalis/public/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

export default axiosIns
