import { defineStore } from 'pinia'
import axiosIns from '@/libs/axiosExt'

const useProvinsiStore = defineStore('provinsi', {
  state: () => ({
    isLoading: false,
    responses: null,
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
  },
  actions: {
    async getData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        this.responses = response
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
  },
})

export default useProvinsiStore
