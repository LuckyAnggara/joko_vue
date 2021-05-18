<template>
  <section>
    <b-row>
      <b-col cols="12" md="9" xl="9">
        <b-card :title="`Penyesuaian Stok Tanggal : ${tanggal}`">
          <b-table show-empty empty-text="Tidak ada data" class="position-relative" :items="detailPenyesuaian.detail" :fields="tableColumns">
            <!-- Column: Nama -->
            <template #cell(nama)="data">
              <span>
                {{ `${data.item.kode_barang} - ${data.item.nama}` }}
              </span>
            </template>

            <template #cell(jumlah_fisik)="data">
              <span>
                {{ data.item.jumlah_fisik }}
              </span>
            </template>

            <template #cell(perbedaan)="data">
              <span>
                <feather-icon
                  :icon="data.item.perbedaan < 0 ? 'ChevronsDownIcon' : 'ChevronsUpIcon'"
                  :class="data.item.perbedaan < 0 ? 'text-danger' : 'text-success'"
                />
                {{ data.item.perbedaan }}
              </span>
            </template>

            <template #cell(harga)="data">
              <span>
                {{ data.item.harga }}
              </span>
            </template>
          </b-table>
        </b-card>
      </b-col>

      <b-col cols="12" md="3" xl="3">
        <b-card>
          <!-- Button: Print -->
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block>
            Print Data
          </b-button>

          <hr />

          <!-- Button: Delete -->
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-secondary" class="mb-75" block :to="{ name: 'master-persediaan-penyesuaian' }">
            Delete
          </b-button>

          <!-- Button: Revert / Retur -->
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-secondary" class="mb-75" block>
            Revert
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BButton, BCol, BRow, BCard, BTable } from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BCol,
    BRow,
    BCard,
    BTable,
  },
  directives: {
    Ripple,
  },
  computed: {
    tanggal() {
      return this.$moment(this.detailPenyesuaian.created_at).format('DD/MM/YYYY')
    },
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const { id } = this.$router.currentRoute.params

      if (this.$store.getters['app-barang/getListBarang'].length === 0) {
        const user = JSON.parse(localStorage.getItem('userData'))
        this.$store
          .dispatch('app-persediaan/fetcListDataPenyesuaian', {
            cabang: user.cabang.id,
          })
          .then(res => {
            this.$store.commit('app-persediaan/SET_LIST_DATA_PENYESUAIAN', res.data)
          })
      }
      this.detailPenyesuaian = this.$store.getters['app-persediaan/getListDataPenyesuaian'].find(x => x.id === id)
      console.info(this.detailPenyesuaian)
    },
  },

  setup() {
    const detailPenyesuaian = ref([])

    const tableColumns = [
      { label: 'Nama / Kode Barang', key: 'nama', sortable: false },
      { key: 'jumlah_tercatat', sortable: false },
      { key: 'jumlah_fisik', sortable: false },
      { key: 'perbedaan', sortable: false },
      { key: 'harga', sortable: false },
    ]
    return {
      detailPenyesuaian,
      tableColumns,
    }
  },
}
</script>
