// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseUrl: 'https://www.lapkin.bbmakmur.com/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export default axiosIns
