<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card title="Revisi Anggaran">
          <b-form-group label="Pool Anggaran" label-cols-lg="3">
            <b-form-input :value="formatRupiah(maxPool)" readonly />
            <small>Ini adalah Total Anggaran yang bisa di distribusikan ke Mata Anggaran lainnya</small>
          </b-form-group>
          <b-form-group label="Total Anggaran" label-cols-lg="3">
            <b-form-input :value="formatRupiah(maxPool2)" readonly />
          </b-form-group>
          <b-form-group label="Wilayah / Bagian" label-cols-lg="3">
            <v-select v-model="bidangFilter" label="nama" :options="bidangOption" :clearable="false" />
          </b-form-group>
          <b-form-group label="Interval" label-cols-lg="3">
            <b-form-input v-model="interval" />
          </b-form-group>

          <b-row>
            <b-col cols="6" md="1" class="mb-2">
              <b-button variant="success" class="btn-icon" size="md" @click="proses"> Proses </b-button>
            </b-col>
            <b-col cols="6" md="1" class="mb-2">
              <b-button variant="danger" class="btn-icon" size="md" @click="reset"> Batal </b-button>
            </b-col>
          </b-row>

          <b-table small responsive :fields="tableColumns" :items="dataMak" show-empty empty-text="Tidak ada data" class="position-relative">
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
            <template #cell(kode)="data">
              <span>
                {{ data.item.kode }}
                <br />
                {{ data.item.nama }}
              </span>
            </template>
            <template #cell(pagu)="data">
              <b-row>
                <b-col cols="6">
                  <b-form-group label="Sebelum" class="text-primary">
                    <!-- <b-form-input :value="formatRupiah(data.item.passive_pagu)" /> -->
                    <cleave
                      v-model="data.item.passive_pagu"
                      :options="{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }"
                      class="form-control"
                      @blur="cek(data.item.pagu, data.item.realisasi, max(data.item.pagu), data.index)"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="Sesudah" :class="data.item.passive_pagu === data.item.pagu ? 'text-primary' : 'text-success'">
                    <cleave
                      v-model="data.item.pagu"
                      :options="{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }"
                      class="form-control"
                      @blur="cek(data.item.pagu, data.item.realisasi, max(data.item.pagu), data.index)"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <vue-slider
                silent
                v-model="data.item.pagu"
                :interval="interval"
                :min="data.item.realisasi"
                :max="max(data.item.pagu)"
                :tooltip-formatter="formatRupiah(data.item.pagu / 1000000) + 'K'"
                :contained="true"
              />
            </template>

            <template #cell(bidang)="data">
              <span>
                {{ data.item.bidang.nama }}
              </span>
            </template>
            <!-- Column: Actions -->
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatRupiah } from '@core/utils/filter'
import { BButton, BFormGroup, BSpinner, BCard, BRow, BCol, BFormInput, BTable } from 'bootstrap-vue'
import VueSlider from 'vue-slider-component'
import Cleave from 'vue-cleave-component'
import vSelect from 'vue-select'

export default {
  components: {
    BButton,
    BFormGroup,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    VueSlider,
    Cleave,
    vSelect,
  },
  data() {
    return {}
  },
  // watch: {
  //   bidangFilter(x) {
  //     this.dataMak = this.dataTemp.filter(item => item.bidang.id === x.id)
  //   },
  // },
  computed: {
    dataTemp() {
      return this.$store.getters['app-mak/getMak']
    },
    dataMak() {
      if (this.bidangFilter.id === 0) {
        return this.dataTemp
      }
      return this.dataTemp.filter(item => item.bidang.id === this.bidangFilter.id)
    },
    maxPool() {
      let max = 0
      this.dataMak.forEach(x => {
        max += parseFloat(x.pagu)
      })
      return this.maxPool2 - max
    },
    maxPool2() {
      let max = 0
      this.dataMak.forEach(x => {
        max += parseFloat(x.passive_pagu)
      })
      return max
    },
    bidangOption() {
      return [{ id: 0, nama: 'SEMUA' }, ...this.$store.getters['app-general/getBidang']]
    },
  },

  methods: {
    formatRupiah,
    cek(x, y, z, i) {
      if (y > x) {
        this.dataTemp[i].pagu = y
      } else if (x > z) {
        this.dataTemp[i].pagu = z
      }
    },
    max(x) {
      return parseFloat(x) + parseFloat(this.maxPool)
    },
    datax(x, y) {
      return [0, x, y]
    },
    reset() {
      this.$emit('reset')
    },
    proses() {
      if (this.maxPool > 0) {
        this.$swal({
          title: 'Error!',
          text: `Pool Anggaran masih tersisa!! ${this.formatRupiah(this.maxPool)}`,
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        return
      }
      this.$swal({
        title: 'Proses ?',
        text: 'Revisi anggaran akan di Proses!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.show = !this.show
          this.$store.dispatch('app-mak/storeRevisiMak', { data: this.dataMak }).then(res => {
            if (res.status === 200) {
              this.$swal({
                title: 'Success!',
                text: 'Anggaran berhasil di Revisi',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.$emit('reload')
            } else {
              this.$swal({
                title: 'Error!',
                text: res.status,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
          })
        }
      })
    },
  },

  setup() {
    const interval = 10000
    const min = 0
    const value = 0
    const tableColumns = [
      { key: 'id', label: '#', tdClass: 'nomorClass' },
      { key: 'bidang', label: 'Wilayah/Bagian', tdClass: 'bidangClass' },
      { key: 'kode', tdClass: 'kodeClass' },
      { key: 'pagu', tdClass: 'sliderClass' },
    ]
    const bidangFilter = ref({
      id: 0,
      nama: 'SEMUA',
    })
    return {
      interval,
      min,
      value,
      tableColumns,
      bidangFilter,
    }
  },
}
</script>

<style>
.sliderClass {
  width: 55%;
}
.kodeClass {
  width: 25%;
}
.bidangClass {
  width: 15%;
}
.nomorClass {
  width: 5%;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
