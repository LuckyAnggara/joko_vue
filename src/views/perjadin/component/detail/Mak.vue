<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card v-if="fake" title="Mata Anggaran Kegiatan" footer-tag="footer">
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
              <b-form-group label="Saldo Realisasi" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(fake.mak.saldo.realisasi)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Saldo Belum Realisasi" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(fake.mak.saldo.unrealisasi)" placeholder="-" readonly />
              </b-form-group>

              <hr />
            </b-col>

            <b-col cols="12">
              <b-form-group label="Sisa Saldo Tersedia" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(fake.mak.saldo.saldo)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Untuk Kegiatan Ini" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(fake.total_anggaran)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Sisa Saldo Setelah Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(parseFloat(fake.mak.saldo.saldo) - parseFloat(fake.total_anggaran))" placeholder="-" readonly />
              </b-form-group>
              <hr />
            </b-col>
          </b-row>

          <b-row class="mt-2" v-if="form.status !== 'PENGAJUAN' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'VERIFIKATOR PPK')">
            <b-col cols="12">
              <b-button variant="outline-primary" @click="showModalMak()"> Cek MAK </b-button>
            </b-col>

            <b-col cols="12">
              <small>Cek Daftar MAK pada {{ form.bidang.nama }}</small>
            </b-col>
          </b-row>
          <b-row>
            <section v-if="form.status === 'RENCANA'">
              <b-button variant="outline-warning" class="ml-1" @click="edit = !edit" v-if="!edit"> Edit </b-button>
              <b-button variant="outline-danger" class="ml-1" @click="batal()" v-if="edit"> Batal </b-button>
              <b-button variant="outline-primary" class="ml-1" v-if="edit" @click="ubah()"> Simpan </b-button>
            </section>
          </b-row>
        </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
          <br />
          <small
            ><em
              >Updated at <strong>{{ $moment(form.updated_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
        </template>
      </b-card>
    </b-col>
    <daftar-mak :tahun="form.tahun" :bidang="form.bidang" />
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
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import DaftarMak from '@/views/mak/DaftarMak.vue'
import vSelect from 'vue-select'
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
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    lampiran_rab() {
      return this.form.lampiran.filter(x => x.jenis === 'RAB')
    },
    makOption() {
      return this.$store.getters['app-general/getMak']
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.form)
  },
  methods: {
    formatRupiah,
    showModalMak() {
      this.$bvModal.show('modal-daftar-mak')
    },
    batal() {
      this.edit = !this.edit
      this.fake = _.cloneDeep(this.form)
    },
    ubah() {
      this.$swal({
        title: 'Ubah Data ?',
        text: 'Data MAK akan di ubah ?',
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
          this.$store.dispatch('app-perjadin/editMak', this.fake).then(res => {
            if (res.status === 200) {
              this.$store.commit('app-perjadin/SET_DETAIL', this.fake)
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
