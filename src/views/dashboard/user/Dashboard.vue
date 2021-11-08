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
      <b-col lg="5" md="12">
        <penyerapan-anggaran :data="penyerapanAnggaran" />
      </b-col>
      <b-col lg="6" md="12">
        <pegawai-dinas :data="dataPegawaiJadin" />
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col lg="6" md="12">
        <penyelesaian-kegiatan :data="penyelesaianKegiatan" />
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
import PenyerapanAnggaran from './PenyerapanAnggaran.vue'
import PenyelesaianKegiatan from './PenyelesaianKegiatan.vue'
import RincianPegawaiBidang from './RincianPegawaiBidang.vue'
import PegawaiDinas from './PegawaiDinas.vue'

export default {
  components: {
    BRow,
    BCol,
    PenyerapanAnggaran,
    PegawaiDinas,
    PenyelesaianKegiatan,
    RincianPegawaiBidang,
    vSelect,
  },
  data() {
    return {
      data: {},
    }
  },

  mounted() {
    this.loadMAK()
    this.loadTahun()
    this.loadPerjadin()
    this.loadPegawai()
  },
  computed: {
    penyerapanAnggaran() {
      let totalPagu = 0
      let totalRealisasi = 0
      this.dataMak.forEach(x => {
        totalPagu += x.pagu
        x.rincian
          .filter(d => d.status === 'SELESAI')
          .forEach(y => {
            totalRealisasi += y.total_realisasi
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
          console.info(tt)
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
      const rincian = b.filter(x => x.bidang.id === this.userData.bidang_id)
      return {
        rincian,
        series: [53, 16, 1, 10, 10, 10],
      }
    },
  },
  methods: {
    formatRupiah,
    kFormatter,
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
            console.info(this.dataMak)
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
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const dataMak = ref([])
    const dataPerjadin = ref([])

    const tahun = ref({
      id: 1,
      nama: '2021',
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
