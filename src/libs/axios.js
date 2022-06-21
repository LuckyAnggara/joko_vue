import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: 'https://api-katalis.itjenkumham.site/api/',
  baseURL: 'http://192.168.16.128:8000/api/',
  // baseURL: 'http://103.131.116.141/api-katalis/public/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns

export default axiosIns
