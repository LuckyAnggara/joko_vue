<template>
  <section id="dashboard-analytics">
    <div class="mb-2">
      <!-- Table Top -->
      <b-row>
        <b-col cols="6" md="2" sm="3" lg="2">
          <label>Tahun Data</label>
          <v-select v-model="tahun" label="nama" :options="tahunOption" :clearable="false" />
        </b-col>
      </b-row>
    </div>
    <b-row class="match-height">
      <b-col lg="4" md="12">
        <penyerapan-anggaran :data="penyerapanAnggaran" />
      </b-col>
      <b-col lg="8" md="12">
        <montoring-rencana-penyerapan />
        <!-- <penyelesaian-kegiatan :data="penyelesaianKegiatan" /> -->
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col lg="7" md="12">
        <penyelesaian-kegiatan :data="dataMak" />
        <!-- <penyelesaian-kegiatan :data="penyelesaianKegiatan" /> -->
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="8" md="12">
        <penyerapan :tahun="tahun" />
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col lg="6" md="12">
        <pegawai-dinas :data="dataPegawaiJadin" />
      </b-col>
      <b-col lg="4">
        <b-row class="match-height">
          <b-col lg="12" md="6">
            <rincian-pegawai-bidang :data="dataPegawai" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BRow, BCol } from 'bootstrap-vue'
import { kFormatter, formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'
import PenyerapanAnggaran from '../component/PenyerapanAnggaran.vue'
import PenyelesaianKegiatan from '../component/PenyelesaianKegiatan.vue'
import RincianPegawaiBidang from '../component/RincianPegawaiBidang.vue'
import PegawaiDinas from '../component/PegawaiDinas.vue'
import MontoringRencanaPenyerapan from '../component/MontoringRencanaPenyerapan.vue'
// import Penyerapan from '../component/Penyerapan.vue'

export default {
  components: {
    BRow,
    BCol,
    PenyerapanAnggaran,
    PegawaiDinas,
    PenyelesaianKegiatan,
    RincianPegawaiBidang,
    MontoringRencanaPenyerapan,
    // Penyerapan,
    vSelect,
  },
  data() {
    return {
      data: {},
    }
  },
  watch: {
    tahun() {
      this.loadMAK()
      this.loadPerjadin()
      this.loadPegawai()
      this.loadPenyerapanSemua()
      this.loadMonitorRencanaRealiasasi()
    },
  },
  mounted() {
    this.loadMAK()
    this.loadTahun()
    this.loadPerjadin()
    this.loadPegawai()
    this.loadPenyerapanSemua()
    this.loadMonitorRencanaRealiasasi()
  },
  computed: {
    penyerapanAnggaran() {
      let totalPagu = 0
      let totalRealisasi = 0
      this.dataMak.forEach(x => {
        totalPagu += parseFloat(x.pagu)
        x.rincian
          .filter(d => d.status === 'SELESAI')
          .forEach(y => {
            totalRealisasi += parseFloat(y.total_realisasi)
          })
      })
      const presentase = ((parseFloat(totalRealisasi) / parseFloat(totalPagu)) * 100).toFixed(2)
      return {
        completed: this.formatRupiah(totalPagu),
        inProgress: this.formatRupiah(totalRealisasi),
        series: [presentase],
      }
    },
    dataPegawaiJadin() {
      const pegawai = []
      const b = this.dataPerjadin.filter(x => x.status === 'PELAKSANAAN')

      b.forEach(y => {
        const t = []

        y.susunan_tim.forEach(x => {
          const tt = x
          tt.tujuan = y.tujuan
          t.push(tt)
        })

        pegawai.push(...t)
      })
      return pegawai
    },
    penyelesaianKegiatan() {
      let totalKegiatan = 0
      let selesai = 0
      let proses = 0
      this.dataMak.forEach(x => {
        totalKegiatan += x.rincian.length
        selesai += x.rincian.filter(y => y.status === 'SELESAI').length
        proses += x.rincian.filter(y => y.status !== 'SELESAI').length
      })
      const s = ((parseFloat(selesai) / parseFloat(totalKegiatan)) * 100).toFixed(2)
      return {
        totalKegiatan,
        selesai,
        proses,
        series: [s],
      }
    },
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
    dataPegawai() {
      const b = this.$store.getters['app-general/getPegawai']
      const rincian = b.filter(x => x.bidang_id === this.userData.bidang_id)
      console.info(rincian)
      return {
        rincian,
        series: [0, 0, 0, 0, 0, 0],
      }
    },
  },
  methods: {
    formatRupiah,
    kFormatter,
    loadMonitorRencanaRealiasasi() {
      this.$store
        .dispatch('app-mak/fetchMonitoringRencanaRealisasi', {
          tahun_id: this.tahun.id,
          bidang_id: this.userData.bidang_id,
        })
        .then(res => {
          this.$store.commit('app-mak/SET_MONITORING_RENCANA_REALISASI', res.data)
        })
    },
    loadPerjadin() {
      this.$store
        .dispatch('app-perjadin/fetchPerjadin', {
          tahun_id: this.tahun.id,
          bidang_id: this.userData.bidang_id,
        })
        .then(res => {
          this.dataPerjadin = res.data
        })
    },
    loadMAK() {
      if (this.tahun !== null) {
        this.$store
          .dispatch('app-mak/fetchMak', {
            tahun_id: this.tahun.id,
            bidang_id: this.userData.bidang_id,
          })
          .then(res => {
            this.dataMak = res.data
            this.$store.commit('app-mak/SET_MAK', res.data)
          })
      }
    },
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
    loadPegawai() {
      this.$store.dispatch('app-general/fetchPegawai').then(res => {
        this.$store.commit('app-general/SET_PEGAWAI', res.data)
      })
    },
    loadPenyerapanSemua() {
      this.$store
        .dispatch('app-mak/fetchPenyerapanSemua', {
          tahun_id: this.tahun.id,
        })
        .then(res => {
          this.$store.commit('app-mak/SET_PENYERAPAN_SEMUA', res.data)
        })
    },
  },
  setup() {
    const d = new Date()

    const userData = JSON.parse(localStorage.getItem('userData'))
    const dataMak = ref([])
    const dataPerjadin = ref([])

    const tahun = ref({
      id: 1,
      nama: d.getFullYear(),
    })
    return {
      userData,
      dataPerjadin,
      dataMak,
      tahun,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
