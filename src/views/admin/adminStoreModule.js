import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listTahun: [],
    listArea: [],
    listAreaTemp: [],
    listRKT: [],
    listRKTTemp: [],
    listAreaSelect: [],
  },
  getters: {
    getListArea: state => state.listArea,
    getListRKT: state => state.listRKT,
    getListAreaSelect: state => state.listAreaSelect,
  },
  mutations: {
    SET_LIST_AREA(state, data) {
      state.listAreaTemp = data
      state.listArea = state.listAreaTemp
    },
    SET_LIST_RKT(state, data) {
      state.listRKTTemp = data.rkt
      state.listRKT = state.listRKTTemp
      state.listAreaSelect = data.namaarea
    },
    FILTER_LIST_RKT(state, data) {
      if (data === null) {
        state.listRKT = state.listRKTTemp
      } else {
        state.listRKT = state.listRKTTemp.filter(x => x.prefix_area === data.toString())
      }
    },
    FILTER_LIST_AREA(state, data) {
      state.listArea = state.listAreaTemp.filter(x => x.tahun_id.includes(data.toString()))
    },
    UPDATE_AREA(state, data) {
      state.listAreaTemp.push(data)
    },
    UPDATE_RKT(state, data) {
      state.listRKTTemp.push(data)
    },
    DELETE_RKT(state, data) {
      const i = state.listRKTTemp.findIndex(x => x.id === parseInt(data.id, 10))
      state.listRKTTemp.splice(i, 1)
    },
    // NEW_LAMPIRAN(state, data) {
    //   const a = state.listRKT.findIndex(x => x.id === data.area_id)
    //   const b = state.listRKT[a].rkt.findIndex(x => x.id === data.rkt_id)
    //   state.listRKT[a].rkt[b].lampiran.push(data.data)
    // },
    // DELETE_LAMPIRAN(state, data) {
    //   const a = state.listRKT.findIndex(x => x.id === data.area_id)
    //   const b = state.listRKT[a].rkt.findIndex(x => x.id === parseInt(data.rkt_id, 10))
    //   const c = state.listRKT[a].rkt[b].lampiran.findIndex(x => x.id === data.lampiran_id)
    //   state.listRKT[a].rkt[b].lampiran.splice(c, 1)
    // },
  },
  actions: {
    fetchListArea(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}master/area`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListRkt(ctx, tahun) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}master/rkt/${tahun}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeArea(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}master/area/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeRKT(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}master/rkt/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteRKT(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}master/rkt/delete/${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
