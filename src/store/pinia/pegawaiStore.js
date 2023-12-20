import { defineStore } from 'pinia'
import axiosIns from '@/libs/axiosExt'

const usePegawaiStore = defineStore('pegawai', {
  state: () => ({
    isLoading: false,
    responses: null,
    singleResponses: null,
    filter: {
      unit: 0,
    },
    searchName: '',
    currentLimit: 10,
    page: 1,
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    currentPage(state) {
      return state.responses?.current_page
    },
    perPage(state) {
      return state.responses?.per_page
    },
    lastPage(state) {
      return state.responses?.last_page
    },
    from(state) {
      return state.responses?.from
    },
    to(state) {
      return state.responses?.to
    },
    total(state) {
      return state.responses?.total
    },
    searchQuery(state) {
      if (state.searchName === '' || state.searchName == null) {
        return ''
      }
      return `&name=${state.searchName}`
    },
    curPage(state) {
      if (state.page === 0) {
        return ''
      }
      return `&page=${state.page}`
    },
  },
  actions: {
    async getData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`https://www.lapkin.bbmakmur.com/api/employee?limit=${this.currentLimit}${this.searchQuery}${this.curPage}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async showData(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/employee/${id}`)
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data))
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
  },
})

export default usePegawaiStore
