<template>
  <section>
    <b-row class="match-height">
      <b-col lg="5">
        <b-card>
          <b-form-group label="Tahun Anggaran" label-cols-md="5">
            <v-select v-model="tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" />
          </b-form-group>
        </b-card>
      </b-col>
      <b-col lg="12" cols="12" v-if="this.tahun === null ? false : true">
        <b-card>
          <div class="mb-2">
            <b-row>
              <b-col>
                <b-form-group label-cols-lg="2" content-cols-sm content-cols-lg="3" label="BIDANG">
                  <b-form-input :value="userData.bidang.nama" plaintext />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label-cols-lg="2" content-cols-sm content-cols-lg="3" label="DIPA">
                  <b-form-input :value="formatRupiah(totalDipa)" plaintext />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label-cols-lg="2" content-cols-sm content-cols-lg="3" label="REALISASI">
                  <b-form-input :value="formatRupiah(totalRealisasi)" plaintext />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label-cols-lg="2" content-cols-sm content-cols-lg="8" label="TERBILANG">
                  <b-form-input value="SATU MILIYAR TIGA RATUS DUA PULUH SATU JUTA LIMA RATUS ENAM PULUH ENAM RIBU RUPIAH" plaintext />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label-cols-lg="2" content-cols-sm content-cols-lg="5" label="JUMLAH TRANSAKSI">
                  <b-form-input :value="`${totalTransaksi} TRANSAKSI`" plaintext />
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <section v-for="item in dataRealisasi" :key="item.id">
            <hr />
            <b-row>
              <b-col lg="1">
                <b-form-group label="No" label-size="sm">
                  <b-form-input :value="item.id" size="sm" plaintext />
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-form-group label="KODE" label-size="sm">
                  <b-form-input :value="item.kode" size="sm" plaintext />
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="KEGIATAN" label-size="sm">
                  <b-form-textarea :value="item.nama" size="sm" plaintext no-resize />
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-form-group label="DIPA" label-size="sm">
                  <b-form-input :value="formatRupiah(item.dipa)" size="sm" plaintext />
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-form-group label="REALISASI" label-size="sm">
                  <b-form-input
                    :value="`${formatRupiah(item.total_realisasi)} (${((parseFloat(item.total_realisasi) / parseFloat(item.dipa)) * 100).toFixed(2)}%)`"
                    size="sm"
                    plaintext
                  />
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-form-group label="SALDO" label-size="sm">
                  <b-form-input :value="formatRupiah(parseFloat(item.dipa) - parseFloat(item.total_realisasi))" size="sm" plaintext />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col lg="10">
                <b-table
                  :busy="isBusy"
                  small
                  responsive
                  :fields="tableColumns"
                  :items="item.realisasi.filter(x => x.status === 'SELESAI')"
                  empty-text="Tidak ada data"
                  class="position-relative"
                >
                  <template #table-busy>
                    <div class="text-center text-danger my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading...</strong>
                    </div>
                  </template>
                  <template #cell(no)="data">
                    <span>
                      {{ data.index + 1 }}
                    </span>
                  </template>
                  <template #cell(tanggal)="data">
                    <span>
                      {{ $moment(data.item.tanggal_spb).format('DD MMMM YYYY') }}
                    </span>
                  </template>
                  <template #cell(nominal)="data">
                    <span>
                      {{ formatRupiah(data.item.nominal) }}
                    </span>
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </section>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

import {
  // BButton,
  BSpinner,
  BCard,
  BRow,
  BCol,
  BFormTextarea,
  BFormInput,
  BFormGroup,
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    // BButton,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BFormTextarea,
    BFormGroup,
    BTable,
    vSelect,
  },
  data() {
    return {}
  },
  watch: {
    tahun() {
      this.loadKegiatan()
    },
  },
  computed: {
    totalDipa() {
      let total = 0
      this.dataRealisasi.forEach(x => {
        total += x.dipa
      })
      return total
    },
    totalRealisasi() {
      let total = 0
      this.dataRealisasi.forEach(x => {
        x.realisasi.forEach(v => {
          if (v.status === 'SELESAI') total += v.nominal
        })
      })
      return total
    },
    totalTransaksi() {
      let total = 0
      this.dataRealisasi.forEach(x => {
        total += x.realisasi.length
      })
      return total
    },
  },
  methods: {
    formatRupiah,
    loadKegiatan() {
      if (this.tahun !== null) {
        this.isBusy = !this.isBusy
        this.$store
          .dispatch('app-kegiatan/fetchLaporanRincian', {
            tahun_id: this.tahun.id,
            bidang_id: this.userData.bidang_id,
          })
          .then(res => {
            this.isBusy = !this.isBusy
            this.dataTemp = res.data
            this.dataRealisasi = this.dataTemp
          })
      }
    },
    loadTahun() {
      this.$store.dispatch('app-kegiatan/fetchTahun').then(res => {
        this.tahunOption = res.data
      })
    },
  },
  mounted() {
    this.loadTahun()
    this.loadKegiatan()
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tahun = null
    const isBusy = false
    const dataRealisasi = ref([])
    const tahunOption = ref([])
    const tableColumns = [{ key: 'no', label: 'No.' }, { key: 'tanggal' }, { key: 'nomor_kwitansi' }, { key: 'uraian' }, { key: 'nominal' }]

    return {
      userData,
      tahunOption,
      tahun,
      isBusy,
      tableColumns,
      dataRealisasi,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.barang-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
