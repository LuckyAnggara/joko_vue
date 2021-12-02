<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <b-col cols="6" md="2" sm="6" class="mb-2">
                <b-button variant="primary" class="btn-icon" size="md" :to="{ name: 'perjadin-tambah' }">
                  <feather-icon icon="PlusIcon" /> Tambah Data
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" md="2" sm="3" lg="2">
                <label>Tahun Data</label>
                <v-select v-model="tahun" label="nama" :options="tahunOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="2" md="2" sm="3">
                <label>Tampilkan</label>
                <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="2" md="3" sm="3">
                <label class="mr-1">Filter Status</label>
                <v-select v-model="statusFilter" :options="statusOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="3" md="3" sm="3" v-if="userData.role !== 'USER' ? true : false">
                <label class="mr-1">Bagian / Wilayah</label>
                <v-select v-model="bidangFilter" label="nama" :options="bidangOption" :clearable="false" />
              </b-col>
              <!-- Search -->
              <b-col cols="6" lg="3" md="5" sm="12">
                <label class="mr-1">Cari Data</label>
                <b-form-input v-model="searchQuery" placeholder="Cari data... " />
              </b-col>
            </b-row>
          </div>
          <b-table
            small
            :busy="isBusy"
            responsive
            :fields="tableColumns"
            :items="dataPerjadin"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="isSortDirDesc"
            show-empty
            bordered
            empty-text="Tidak ada data"
            class="position-relative"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(id)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>
            <template #cell(surat_perintah)="data">
              <span>
                {{ data.item.surat_perintah.nomor_surat }}
              </span>
            </template>
            <template #cell(tanggal_pelaksanaan)="data">
              <span>
                {{
                  $moment(data.item.tanggal_berangkat)
                    .locale('id')
                    .format('DD/MM/YYYY')
                }}
                -
                {{
                  $moment(data.item.tanggal_kembali)
                    .locale('id')
                    .format('DD/MM/YYYY')
                }}
              </span>
            </template>
            <template #cell(maksud)="data">
              <b-tooltip :target="`tooltip_${data.item.id}`">{{ data.item.maksud }}</b-tooltip>
              <span :id="`tooltip_${data.item.id}`">
                {{ truncate(data.item.maksud, 30) }}
              </span>
            </template>
            <template #cell(maker)="data" v-if="userData.role !== 'USER' ? true : false">
              <span>
                {{ data.item.bidang.nama }}
              </span>
            </template>
            <template #cell(status)="data">
              <div class="text-nowrap">
                <template>
                  <span v-if="data.item.status === 'RENCANA'">
                    <b-badge class="mr-1" pill variant="light-primary"> {{ data.item.status }} </b-badge><br />
                    <b-badge pill variant="light-success" v-if="data.item.status_realisasi === 'SUDAH' ? true : false"> Realisasi sudah di Input</b-badge>
                  </span>
                  <b-badge pill variant="light-warning" v-if="data.item.status === 'VERIFIKASI KEUANGAN'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="warning" v-if="data.item.status === 'VERIFIKASI REALISASI'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-danger" v-if="data.item.status === 'REVISI KEUANGAN'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-danger" v-if="data.item.status === 'REVISI PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="primary" v-if="data.item.status === 'PELAKSANAAN'"> {{ data.item.status }} </b-badge>
                  <b-badge pill variant="light-warning" v-if="data.item.status === 'VERIFIKASI PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-success" v-if="data.item.status === 'VERIFIED PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="danger" v-if="data.item.status === 'TOLAK PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="success" v-if="data.item.status === 'SELESAI'"> {{ data.item.status }} </b-badge>
                </template>
              </div>
            </template>
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon icon="EyeIcon" size="16" class="mx-1" @click="detail(data.item.id)" />
              </div>
            </template>
          </b-table>
          <div class="mx-2 mb-2">
            <b-row>
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                <span class="text-muted"> {{ dataMeta.from }} - {{ dataMeta.to }} dari {{ dataMeta.of }} data</span>
              </b-col>
              <!-- Pagination -->
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalData"
                  :per-page="perPage"
                  first-number
                  last-number
                  class="mb-0 mt-1 mt-sm-0"
                  prev-class="prev-item"
                  next-class="next-item"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      id="modal-log"
      scrollable
      hide-backdrop
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Log Rencana Perjadin"
      ok-variant="danger"
      ok-title="Tutup"
      lazy
    >
      <timeline />
    </b-modal>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatRupiah, truncate } from '@core/utils/filter'
import { BModal, BTooltip, BButton, BBadge, BSpinner, BCard, BRow, BCol, BFormInput, BTable, BPagination } from 'bootstrap-vue'
import vSelect from 'vue-select'
import Timeline from './component/LogTimeline.vue'

export default {
  components: {
    BModal,
    BTooltip,
    BButton,
    BBadge,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    vSelect,
    Timeline,
  },
  data() {
    return {}
  },
  watch: {
    tahun() {
      this.loadKegiatan()
    },
    /* eslint-disable */
    searchQuery(query) {
      if (query === '') {
        this.dataPerjadin = this.dataTemp
      } else {
        this.dataPerjadin = this.dataTemp.filter(
          item =>
            item.surat_perintah.nomor_surat.toLowerCase().indexOf(query) > -1 ||
            item.tujuan.toLowerCase().indexOf(query) > -1 ||
            item.keberangkatan.toLowerCase().indexOf(query) > -1,
        )
      }
    },
    bidangFilter(x) {
      if (x.nama === '' || x.id === null || x.id === 0) {
        this.dataPerjadin = this.dataTemp
      } else {
        this.dataPerjadin = this.dataTemp.filter(item => item.bidang.id === x.id)
      }
    },
    /* eslint-enable */
    statusFilter(x) {
      if (x === '' || x === null || x === 'SEMUA') {
        this.dataPerjadin = this.dataTemp
      } else {
        this.dataPerjadin = this.dataTemp.filter(item => item.status === x)
      }
    },
  },
  computed: {
    dataMeta() {
      const localItemsCount = this.$refs.refTable ? this.$refs.refTable.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalData,
      }
    },
    totalData() {
      return this.dataPerjadin.length
    },
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
    bidangOption() {
      return [
        {
          id: 0,
          nama: 'SEMUA',
        },
        ...this.$store.getters['app-general/getBidang'],
      ]
    },
    statusOption() {
      if (this.userData.role === 'USER') {
        return ['SEMUA', 'RENCANA', 'VERIFIKASI KEUANGAN', 'VERIFIKASI REALISASI', 'PELAKSANAAN', 'VERIFIKASI PPK', 'VERIFIED PPK', 'SELESAI']
      }
      return ['SEMUA', 'VERIFIKASI KEUANGAN', 'VERIFIKASI REALISASI', 'PELAKSANAAN', 'VERIFIKASI PPK', 'VERIFIED PPK', 'SELESAI']
    },
  },
  methods: {
    formatRupiah,
    truncate,
    detail(id) {
      const data = this.dataTemp.find(x => x.id === id)
      this.$store.commit('app-perjadin/SET_DETAIL', data)
      this.$router.push({ name: 'perjadin-detail' })
    },
    log(data) {
      this.$store.commit('app-perjadin/SET_LOG', data)
      this.$bvModal.show('modal-log')
    },
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
    loadBidang() {
      this.$store.dispatch('app-general/fetchBidang').then(res => {
        this.$store.commit('app-general/SET_BIDANG', res.data)
      })
    },
    loadKegiatan() {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-perjadin/fetchPerjadin', {
          tahun_id: this.tahun.id,
          bidang_id: this.userData.role === 'USER' ? this.userData.bidang_id : 0,
        })
        .then(res => {
          this.isBusy = !this.isBusy
          if (this.userData.role === 'USER') {
            this.dataTemp = res.data
          } else if (this.userData.role === 'PPK') {
            this.dataTemp = res.data.filter(x => x.status !== 'RENCANA')
          } else if (this.userData.role === 'ADMIN KEUANGAN') {
            this.dataTemp = res.data.filter(x => x.status !== 'RENCANA')
          } else if (this.userData.role === 'BENDAHARA') {
            this.dataTemp = res.data.filter(x => x.status === 'VERIFIED PPK')
          }
          this.dataPerjadin = this.dataTemp
        })
    },
    kirim_keuangan(id) {
      this.$swal({
        title: 'Kirim Keuangan ?',
        text: 'Berkas perjadin akan di kirim ke keuangan !',
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        showCancelButton: true,
        confirmButtonText: 'Proses!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id,
              status: 'VERIFIKASI KEUANGAN',
              status_log: 'KIRIM KEUANGAN',
              message_log: 'perjadin telah di kirim ke keuangan ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil dikirim',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.loadKegiatan()
                this.catatan = ''
              }
            })
        }
      })
    },
  },
  mounted() {
    this.loadKegiatan()
    this.loadTahun()
    this.loadBidang()
  },
  setup() {
    const catatan = ref('aaa')
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tahun = ref({
      id: 1,
      nama: 2021,
    })
    const isBusy = false
    const dataPerjadin = ref([])
    const dataTemp = ref([])
    const tableColumns = [
      { key: 'id', label: 'NO' },
      { key: 'no_perjadin', label: 'kode' },
      { key: 'surat_perintah' },
      { key: 'tujuan' },
      { key: 'tanggal_pelaksanaan' },
      { key: 'maksud' },
      { key: 'status' },
      { key: 'maker', thClass: userData.role !== 'USER' ? '' : 'd-none', tdClass: userData.role !== 'USER' ? '' : 'd-none' },
      { key: 'actions' },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref('SEMUA')
    const bidangFilter = ref({ nama: 'SEMUA', id: 0 })
    const statusOption = ref(['SEMUA', 'RENCANA', 'REVISI', 'VERIFIKASI KEUANGAN', 'VERIFIKASI REALISASI', 'PELAKSANAAN', 'VERIFIKASI PPK', 'SELESAI'])
    return {
      catatan,
      userData,
      tahun,
      isBusy,
      tableColumns,
      dataPerjadin,
      dataTemp,
      searchQuery,
      perPage,
      currentPage,
      perPageOptions,
      sortBy,
      isSortDirDesc,
      statusFilter,
      bidangFilter,
      statusOption,
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
