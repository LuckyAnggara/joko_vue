<template>
  <section>
    <b-row>
      <b-col lg="6" cols="6">
        <b-card>
          <h5>Form Penyesuaian Persediaan</h5>
          <hr />
          <b-form-group label="Tipe Penyesuaian" label-for="tipe" label-cols-md="4">
            <v-select :clearable="false" v-model="form.tipe" placeholder="Tipe Penyesuaian" label="title" :options="tipePenyesuaian" />
          </b-form-group>

          <b-form-group label="Kategori" label-for="tipe" label-cols-md="4">
            <v-select v-model="form.kategori" placeholder="Kategori" label="title" :clearable="false" :options="kategori" />
          </b-form-group>

          <b-form-group label="Akun" label-for="akun" label-cols-md="4">
            <b-form-input placeholder="Akun" v-model="form.kategori.data.text" type="text" readonly />
          </b-form-group>

          <b-form-group label="Tanggal Transaksi" label-for="tanggalTransaksi" label-cols-md="4">
            <flat-pickr v-model="form.tanggalTransaksi.value" class="form-control" :config="form.tanggalTransaksi.config" placeholder="Tanggal Transaksi" />
          </b-form-group>

          <b-form-group label="Catatan" label-for="catatan" label-cols-md="4">
            <b-form-textarea placeholder="Catatan" v-model="form.catatan" type="text" />
          </b-form-group>

          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="button" @click="submit" variant="primary" class="mr-1">
            Next
          </b-button>
        </b-card>
      </b-col>

      <b-col lg="12" cols="6">
        <b-card title="Daftar Dokumen Penyesuaian">
          <daftar-penyesuaian @searchdata="searchQuery" :data-penyesuaian="dataPenyesuaian" />
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import router from '@/router'
// import store from '@/store'
import { ref } from '@vue/composition-api'

import { BCard, BFormInput, BButton, BFormGroup, BRow, BCol, BFormTextarea } from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
import DaftarPenyesuaian from '../component/DaftarPenyesuaian.vue'

export default {
  components: {
    DaftarPenyesuaian,
    BFormTextarea,
    flatPickr,
    BButton,
    vSelect,
    BFormInput,
    BCard,
    BRow,
    BCol,
    BFormGroup,
  },
  directives: {
    Ripple,
  },
  methods: {
    searchQuery(query) {
      if (query === '') {
        this.dataPenyesuaian = this.dataTemp
      } else {
        this.dataPenyesuaian = this.dataTemp.filter(
          item => item.nomor_opname.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.catatan.toLowerCase().indexOf(query.toLowerCase()) > -1,
        )
      }
    },
    submit() {
      if (this.form.tipe.value === 0) {
        router.push({ name: 'master-persediaan-penyesuaian-perhitungan-stock', params: this.form })
      } else {
        router.push({ name: 'master-persediaan-penyesuaian-masuk-keluar', params: this.form })
      }
    },
    loadDataPenyesuaian() {
      const user = JSON.parse(localStorage.getItem('userData'))
      this.$store
        .dispatch('app-persediaan/fetcListDataPenyesuaian', {
          cabang: user.cabang.id,
        })
        .then(res => {
          this.$store.commit('app-persediaan/SET_LIST_DATA_PENYESUAIAN', res.data)
          this.dataPenyesuaian = res.data
          this.dataTemp = res.data
        })
    },
  },
  mounted() {
    this.loadDataPenyesuaian()
  },
  setup() {
    const dataPenyesuaian = ref([])
    const dataTemp = ref([])
    const form = ref({
      tipe: {
        title: 'Perhitungan Stok',
        value: 0,
      },
      catatan: '',
      kategori: {
        title: 'Umum',
        value: 0,
        data: {
          id: 6,
          text: '1.1.5 - PERSEDIAAN DAGANG',
        },
      },
      tanggalTransaksi: {
        value: Date.now(),
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'd F Y',
          altInput: true,
          dateFormat: 'Y-m-d',
        },
      },
    })

    const kategori = [
      {
        title: 'Umum',
        value: 0,
        data: {
          id: 6,
          text: '1.1.5 - PERSEDIAAN DAGANG',
        },
      },
      {
        title: 'Barang Rusak',
        value: 1,
        data: {
          id: 6,
          text: '1.1.5 - PERSEDIAAN DAGANG',
        },
      },
      {
        title: 'Produksi',
        value: 2,
        data: {
          id: 6,
          text: '1.1.5 - PERSEDIAAN DAGANG',
        },
      },
      {
        title: 'Kuantitas Awal',
        value: 3,
        data: {
          id: 6,
          text: '1.1.5 - PERSEDIAAN DAGANG',
        },
      },
    ]
    const tipePenyesuaian = [
      {
        title: 'Perhitungan Stok',
        value: 0,
      },
      {
        title: 'Stok Masuk / Keluar',
        value: 1,
      },
    ]
    return {
      dataTemp,
      dataPenyesuaian,
      form,
      kategori,
      tipePenyesuaian,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
