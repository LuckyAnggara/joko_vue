<template>
  <section>
    <template>
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          md="9"
          xl="9"
          class="invoice-actions"
        >
          <detail-info-card :data-barang="dataBarang.databarang" />
        </b-col>
        <b-col
          cols="12"
          md="4"
          xl="3"
          class="invoice-actions"
        >
          <b-card>
            <!-- Button: Send Invoice -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              v-b-toggle.sidebar-send-invoice
              variant="primary"
              class="mb-75"
              block
            >
              Print Laporan Persediaan
            </b-button>

            <!-- Button: DOwnload -->
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              class="mb-75"
              block
            >
              Penyesuaian Persediaan
            </b-button>
          </b-card>
        </b-col>
      </b-row>

      <kartu-persediaan :data-persediaan="dataBarang.persediaan" />
    </template>
  </section>
</template>

<script>
import { BRow, BCol, BButton } from 'bootstrap-vue'
import store from '@/store'
// import router from '@/router'
import KartuPersediaan from './Component/KartuPersediaan.vue'
import DetailInfoCard from './Component/DetailInfoCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    KartuPersediaan,
    DetailInfoCard,
  },
  data() {
    return {
      data: '',
    }
  },
  computed: {
    dataBarang() {
      if (!this.data) return null
      return this.data
    },
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const { id } = this.$router.currentRoute.params
      store
        .dispatch('app-persediaan/fetchDetailPersediaan', { id })
        .then(res => {
          store.commit('app-persediaan/SET_LIST_DETAIL_PERSEDIAAN', res.data)
          this.data = store.getters['app-persediaan/getDetailListPersediaan']
          console.info(this.data)
        })
    },
  },
}
</script>
