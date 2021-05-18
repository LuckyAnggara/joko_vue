// import axios from '@axios'

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    getUserData: state => state.user,
  },
  mutations: {
    SET_USER_DATA(state) {
      state.user = JSON.parse(localStorage.getItem('userData'))
    },
  },
}
