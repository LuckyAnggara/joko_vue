import axios from '@axios'

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    getUserData: state => state.user,
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.user = data
    },
    UPDATE_USER_DATA(state, data) {
      state.user.push(data)
    },
  },
  actions: {
    fetchUserData(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}superuser/user-data`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeUser(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}superuser/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
