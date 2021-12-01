<template>
  <section>
    <b-row>
      <b-col lg="12" sm="12">
        <b-card title="Realisasi Kegiatan" footer-tag="footer" v-if="fake">
          <b-card-body>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Tanggal Kegiatan" label-cols-md="3">
                  <b-form-datepicker
                    v-if="edit"
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    v-model="fake.tanggal_realisasi_kegiatan"
                    placeholder="Tanggal Kegiatan"
                    :disabled="!edit"
                  />
                  <b-form-input v-if="!edit" :value="$moment(fake.tanggal_realisasi_kegiatan).format('DD MMMM YYYY')" type="text" :readonly="!edit" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Total Realisasi" label-cols-md="3">
                  <b-form-input v-if="edit" v-model="fake.total_realisasi" type="number" @blur="cek" :disabled="!edit" />
                  <b-form-input v-if="!edit" :value="formatRupiah(fake.total_realisasi)" type="text" :disabled="!edit" />
                  <small v-if="info" class="text-danger">Realisasi melebihi sisa Pagu MAK {{ data.mak.kode }}</small>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Diperiksa Oleh" label-cols-md="3">
                  <v-select v-if="edit" v-model="fake.checker" placeholder="Nama Atasan Langsung" :options="pegawaiOption" label="nama" />
                  <b-form-input v-if="!edit" :value="fake.checker.nama" type="text" :disabled="!edit" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Pejabat Pembuat Komitmen" label-cols-md="3">
                  <v-select v-if="edit" v-model="fake.ppk" placeholder="Nama PPK" :options="pegawaiOption" label="nama" />
                  <b-form-input v-if="!edit" :value="fake.ppk.nama" type="text" :disabled="!edit" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Bendahara" label-cols-md="3">
                  <v-select v-if="edit" v-model="fake.bendahara" placeholder="Nama Bendahara" :options="pegawaiOption" label="nama" />
                  <b-form-input v-if="!edit" :value="fake.bendahara.nama" type="text" :disabled="!edit" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Lampiran" label-cols-md="3">
                  <b-form-input value="Bisa di lihat di Tab Lampiran" type="text" plaintext />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <section v-if="data.status === 'PELAKSANAAN'">
                <b-button variant="outline-warning" class="ml-1" @click="edit = !edit" v-if="!edit"> Edit </b-button>
                <b-button variant="outline-danger" class="ml-1" @click="batal()" v-if="edit"> Batal </b-button>
                <b-button variant="outline-primary" class="ml-1" v-if="edit" @click="ubah()"> Simpan </b-button>
              </section>

              <b-button variant="primary" v-b-modal="'modal-spb'" class="ml-1" v-if="!edit"> Cetak SPB </b-button>
            </b-row>
          </b-card-body>
          <template #footer>
            <small
              ><em
                >Created By {{ data.user.pegawai.nama }} - {{ data.bidang.nama }} at <strong>{{ $moment(data.created_at).format('DD MMMM YYYY') }}</strong></em
              ></small
            >
            <br />
            <small
              ><em
                >Updated at <strong>{{ $moment(data.updated_at).format('DD MMMM YYYY') }}</strong></em
              ></small
            >
          </template>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="modal-spb" size="md" centered no-close-on-backdrop ok-variant="success" ok-title="print" hide-footer>
      <b-form-group label="Tanggal Cetak SPB">
        <b-form-datepicker locale="id" v-model="tanggal" />
      </b-form-group>
      <b-button variant="primary" :href="spbGet(data.id, tanggal)" class="ml-1"> Print SPB </b-button>
    </b-modal>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BFormDatepicker, BButton, BCard, BCardBody, BRow, BCol, BFormGroup, BFormInput } from 'bootstrap-vue'
import { formatRupiah, spbGet } from '@core/utils/filter'
import vSelect from 'vue-select'
import _ from 'lodash'

export default {
  components: {
    BFormDatepicker,
    BButton,
    BCard,
    BRow,
    BCol,
    BCardBody,
    BFormGroup,
    BFormInput,
    vSelect,
  },
  computed: {
    max() {
      return parseFloat(this.data.mak.pagu) - parseFloat(this.data.mak.saldo.realisasi)
    },
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.data)
  },
  methods: {
    spbGet,
    formatRupiah,
    printSPB() {
      this.$bvModal.show('spb')
    },
    print() {
      return this.spbGet(this.data.id, this.tanggal)
    },
    cek() {
      if (parseFloat(this.fake.total_realisasi) > parseFloat(this.max)) {
        this.info = true
      } else {
        this.info = false
      }
      if (this.fake.total_realisasi === '') {
        this.fake.total_realisasi = 0
      }
    },
    ubah() {
      this.$swal({
        title: 'Ubah Data ?',
        text: 'Data realisasi akan di ubah ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch('app-kegiatan/editRealisasi', this.fake).then(res => {
            if (res.status === 200) {
              this.$store.commit('app-kegiatan/SET_DETAIL', this.fake)
              this.$swal({
                title: 'Sukses!',
                text: 'Realisasi berhasil di ubah',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.edit = !this.edit
            }
          })
        }
      })
    },
    batal() {
      this.edit = !this.edit
      this.fake = _.cloneDeep(this.data)
    },
  },
  setup() {
    const fake = ref(null)
    const edit = ref(false)
    const info = ref(false)
    const tanggal = ref(null)
    return {
      fake,
      edit,
      info,
      tanggal,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
