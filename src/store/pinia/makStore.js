/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from 'pinia'
import axiosIns from '@/libs/axios'

export const useMakStore = defineStore('mak', {
  state: () => ({
    isLoading: false,
    responses: null,
    filter: {
      tahun: new Date().getFullYear(),
      access: 'user',
      currentLimit: 10,
    },
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    accessQuery(state) {
      return `&user=${state.filter.access}`
    },
    tahunQuery(state) {
      if (state.filter.tahun == 0 || state.filter.tahun == null) {
        return ''
      }
      return `&tahun=${state.filter.tahun}`
    },
  },
  actions: {
    async getData(tahun) {
      if (tahun) {
        this.filter.tahun = tahun
      }
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/mak?limit=${this.filter.currentLimit}${this.accessQuery}${this.tahunQuery}`)
        this.responses = response.data.data
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
