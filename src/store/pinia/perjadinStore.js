import { defineStore } from 'pinia'
import axiosIns from '@/libs/axios'

const usePerjadinStore = defineStore('perjadin', {
  state: () => ({
    isLoading: false,
    responses: null,
    filter: {
      unit: 0,
    },
    form: {
      tahun: new Date().getFullYear(),
      umum: {
        mak: null,
        provinsi: null,
        keberangkatan: 'Jakarta',
        tanggal_berangkat: null,
        tanggal_kembali: null,
        jumlah_hari: 0,
        maksud: null,
        output: null,
        ppk: null,
        bendahara: null,
      },
      surat_perintah: {
        nomor_surat: null,
        tanggal_surat: null,
        perihal: null,
      },
      susunan_tim: [],
      rencana_anggaran: [],
      obrik: {
        kanwil: null,
        detail: [],
      },
      lampiran: {
        surat_perintah: [],
        rab: [],
        lainnya: [],
      },
      user_data: JSON.parse(localStorage.getItem('userData')),
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

export default usePerjadinStore
