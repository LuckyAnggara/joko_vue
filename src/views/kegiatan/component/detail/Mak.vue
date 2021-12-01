<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Mata Anggaran Kegiatan" footer-tag="footer" v-if="fake">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Kode Anggaran Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input v-if="!edit" :value="fake.mak.kode" placeholder="-" readonly />
                <v-select v-if="edit" v-model="fake.mak" placeholder="Kode Mak" label="kode" :options="makOption">
                  <template v-slot:option="option"> {{ option.kode }} - {{ option.nama }} </template>
                </v-select>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="fake.mak.nama" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Pagu" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(fake.mak.pagu)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Realisasi" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(fake.mak.saldo.realisasi)" placeholder="-" readonly />
              </b-form-group>
            </b-col>
          </b-row>
          <hr />

          <b-row>
            <b-col cols="12">
              <b-form-group label="Anggaran Kegiatan Ini" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(fake.total_anggaran)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Sisa Saldo Perkiraan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(sisa_saldo_perkiraan)" placeholder="-" readonly />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-2" v-if="data.status !== 'PENGAJUAN' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'VERIFIKATOR PPK')">
            <b-col cols="12">
              <b-button variant="outline-primary" @click="showModalMak()"> Cek MAK </b-button>
            </b-col>

            <b-col cols="12">
              <small>Cek Daftar MAK pada {{ data.bidang.nama }}</small>
            </b-col>
          </b-row>

          <b-row>
            <section v-if="data.status === 'RENCANA'">
              <b-button variant="outline-warning" class="ml-1" @click="edit = !edit" v-if="!edit"> Edit </b-button>
              <b-button variant="outline-danger" class="ml-1" @click="batal()" v-if="edit"> Batal </b-button>
              <b-button variant="outline-primary" class="ml-1" v-if="edit" @click="ubah()"> Simpan </b-button>
            </section>
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
    <daftar-mak :tahun="data.tahun" :bidang="data.bidang" />
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  BButton,
  BCard,
  BCardBody,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
  // BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { urlGet, formatRupiah } from '@core/utils/filter'
import DaftarMak from '@/views/mak/DaftarMak.vue'
import _ from 'lodash'

export default {
  components: {
    BButton,
    BCard,
    BCardBody,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    vSelect,
    DaftarMak,
    // BFormTextarea,
  },
  directives: {
    Ripple,
  },
  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    sisa_saldo() {
      return parseFloat(this.fake.mak.pagu) - parseFloat(this.fake.mak.saldo.realisasi)
    },
    sisa_saldo_perkiraan() {
      return parseFloat(this.fake.mak.pagu) - parseFloat(this.fake.mak.saldo.realisasi) - parseFloat(this.fake.total_anggaran)
    },
    makOption() {
      return this.$store.getters['app-general/getMak']
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.data)
  },
  methods: {
    urlGet,
    formatRupiah,
    showModalMak() {
      this.$bvModal.show('modal-daftar-mak')
    },
    batal() {
      this.edit = !this.edit
      this.fake = _.cloneDeep(this.data)
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
          this.$store.dispatch('app-kegiatan/editMak', this.fake).then(res => {
            if (res.status === 200) {
              this.$store.commit('app-kegiatan/SET_DETAIL', this.fake)
              this.$swal({
                title: 'Sukses!',
                text: 'Mak berhasil di ubah',
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
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const edit = ref(false)
    const fake = ref(null)

    return {
      fake,
      edit,
      userData,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
