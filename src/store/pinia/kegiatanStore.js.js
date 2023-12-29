/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from 'pinia'
import axiosIns from '@/libs/axios'

export const useKegiatanStore = defineStore('kegiatan', {
  state: () => ({
    isLoading: false,
    isStoreLoading: false,
    responses: null,
    form: {
      tahun: null,
      jenis_kegiatan: null,
      lokasi: null,
      mak: null,
      uraian: null,
      total_anggaran: null,
      tanggal_rencana_kegiatan: null,
      output: null,
      lampiran: null,
    },
    file: new FormData(),
    attachments: [],
    filter: {
      searchQuery: '',
      status: 'SEMUA',
      tahun: new Date().getFullYear(),
      access: 'user',
      currentLimit: 10,
    },
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
    persenRealisasi(state) {
      return (parseFloat(state.form.mak?.realisasi) / parseFloat(state.form.mak?.pagu)) * 100 ?? 0
    },
    saldoTersedia(state) {
      return parseFloat(state.form.mak?.pagu) - parseFloat(state.form.mak?.realisasi) - parseFloat(state.form.mak?.unrealisasi) ?? 0
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
    statusQuery(state) {
      if (state.filter.status == 'SEMUA' || state.filter.status == null) {
        return ''
      }
      return `&status=${state.filter.status}`
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '&query=' + state.filter.searchQuery
    },
  },
  actions: {
    async getData(tahun) {
      if (tahun) {
        this.filter.tahun = tahun
      }
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/kegiatan?limit=${this.filter.currentLimit}${this.accessQuery}${this.tahunQuery}${this.searchQuery}${this.statusQuery}`,
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async storeLampiran(id) {
      for (let i = 0; i < this.attachments.length; i += 1) {
        this.file.append('lampiran[]', this.attachments[i])
      }
      this.file.append('id', id)
      this.form.lampiran = this.file

      try {
        const response = await axiosIns.post(`/kegiatan/upload-lampiran-rencana`, this.form)
        if (response.status == 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.info(error)
      }
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/kegiatan/store-rencana`, this.form)
        if (response.status == 200) {
          if (this.attachments.length > 0) {
            const storeLampiran = this.storeLampiran(response.data.data.id)
            if (!storeLampiran) {
              alert('upload lampiran error')
            }
          }
          this.$toast.success('Data berhasil dibuat', {
            timeout: 3000,
          })
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isStoreLoading = false
      }
    },
    async show(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/kegiatan/${id}`)
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponses = JSON.parse(JSON.stringify(response.data.data))
      } catch (error) {
        toast.error('Data not found', {
          position: 'bottom-right',
        })
      }
      this.isLoading = false
    },
    fileImage(event) {
      this.form.lampiran = event.target.files
    },
    uploadFiles(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.attachments.push(selectedFiles[i])
      }
    },
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Data berhasil di buat!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      this.file = new FormData()
      // this.$router.push({
      //   name: 'master-barang',
      // })
    },
    error(x) {
      this.$swal({
        title: 'Error!',
        text: x,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
  },
})
