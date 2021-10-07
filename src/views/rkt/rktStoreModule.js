import axios from '@axios'

export default {
  namespaced: true,
  state: {
    selectArea: [],
    listTahun: [],
    listRKT: [],
  },
  getters: {
    getListRKT: state => state.listRKT,
    getListArea: state => state.listArea,
  },
  mutations: {
    SET_LIST_RKT(state, data) {
      state.listRKT = data
    },
    NEW_LAMPIRAN(state, data) {
      const a = state.listRKT.findIndex(x => x.id === data.area_id)
      const b = state.listRKT[a].rkt.findIndex(x => x.id === data.rkt_id)
      state.listRKT[a].rkt[b].lampiran.push(data.data)
    },
    DELETE_LAMPIRAN(state, data) {
      const a = state.listRKT.findIndex(x => x.id === data.area_id)
      const b = state.listRKT[a].rkt.findIndex(x => x.id === parseInt(data.rkt_id, 10))
      const c = state.listRKT[a].rkt[b].lampiran.findIndex(x => x.id === data.lampiran_id)
      state.listRKT[a].rkt[b].lampiran.splice(c, 1)
    },
  },
  actions: {
    fetchListRKT(ctx, tahun) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}rkt/${tahun}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteLampiran(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}rkt/lampiran/delete/${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
