<template>
  <!-- <b-row class="match-height"> -->
  <b-overlay :show="show" rounded="lg" variant="transparent" blur="15px" opacity="0.70">
    <b-row>
      <b-col lg="12" sm="12">
        <b-card title="Lampiran" footer-tag="footer">
          <b-card-body>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Surat Perintah" label-cols-md="3">
                  <template v-if="lampiran_sp.length > 0 ? true : false">
                    <ul>
                      <li v-for="(item, index) in lampiran_sp" :key="item.id">
                        <b-link :href="urlGet(item.id, 'perjadin')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                        <template v-if="item.pegawai === undefined ? false : true">
                          <small
                            ><i
                              >uploaded by <span>{{ item.pegawai === undefined ? '' : item.pegawai.nama }}</span></i
                            ></small
                          >
                        </template>
                        <template v-else>
                          <b-badge variant="secondary" class="badge-glow">
                            New
                          </b-badge>
                        </template>
                        <span v-if="parseInt(item.user_id) === userData.id" @click="destroy(item.id, index)">
                          - <feather-icon icon="TrashIcon" size="18" class="mx-1 text-danger" />
                        </span>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    <span>Tidak ada lampiran</span>
                  </template>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Rancangan Anggaran Biaya" label-cols-md="3">
                  <template v-if="lampiran_rab.length > 0 ? true : false">
                    <ul>
                      <li v-for="item in lampiran_rab" :key="item.id">
                        <b-link :href="urlGet(item.id, 'perjadin')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                        <template v-if="item.pegawai === undefined ? false : true">
                          <small
                            ><i
                              >uploaded by <span>{{ item.pegawai === undefined ? '' : item.pegawai.nama }}</span></i
                            ></small
                          >
                        </template>
                        <template v-else>
                          <b-badge variant="secondary" class="badge-glow">
                            New
                          </b-badge>
                        </template>
                        <span v-if="parseInt(item.user_id) === userData.id" @click="destroy(item.id, index)">
                          - <feather-icon icon="TrashIcon" size="18" class="mx-1 text-danger" />
                        </span>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    <span>Tidak ada lampiran</span>
                  </template>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Lainnya" label-cols-md="3">
                  <template v-if="lampiran_lainnya.length > 0 ? true : false">
                    <ul>
                      <li v-for="item in lampiran_lainnya" :key="item.id">
                        <b-link :href="urlGet(item.id, 'perjadin')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                        <template v-if="item.pegawai === undefined ? false : true">
                          <small
                            ><i
                              >uploaded by <span>{{ item.pegawai === undefined ? '' : item.pegawai.nama }}</span></i
                            ></small
                          >
                        </template>
                        <template v-else>
                          <b-badge variant="secondary" class="badge-glow">
                            New
                          </b-badge>
                        </template>
                        <span v-if="parseInt(item.user_id) === userData.id" @click="destroy(item.id, index)">
                          - <feather-icon icon="TrashIcon" size="18" class="mx-1 text-danger" />
                        </span>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    <span>Tidak ada lampiran</span>
                  </template>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row class="mt-2" v-if="form.status !== 'PENGAJUAN' && form.status !== 'SELESAI'">
              <b-button variant="outline-primary" class="ml-1" @click="showModalLampiran()"> Tambah Lampiran </b-button>
            </b-row>
          </b-card-body>
          <template #footer>
            <small
              ><em
                >Created By {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
              ></small
            >
          </template>
        </b-card>
      </b-col>
      <b-modal
        id="modal-lampiran"
        size="md"
        scrollable
        hide-backdrop
        ok-only
        centered
        no-close-on-backdrop
        content-class="shadow"
        title="Tambah Lampiran "
        ok-variant="success"
        ok-title="submit"
        @ok="submit"
        @hidden="resetModal"
        lazy
      >
        <b-row>
          <b-col cols="12">
            <b-form-group label="Jenis Lampiran">
              <v-select v-model="upload.jenis" placeholder="Jenis Lampiran" label="name" :options="jenisOption" />
            </b-form-group>
            <hr />
          </b-col>
          <b-col cols="12">
            <b-form-group label="Lampiran / Bukti">
              <b-form-file
                @change="uploadLampiran"
                placeholder="Pilih data atau Drag and Drop di sini.. bisa Upload Sekaligus"
                drop-placeholder="Drop file disini..."
                multiple
                ref="file_input"
              >
                <template slot="file-name" slot-scope="{ names }">
                  <b-badge variant="dark">{{ names[0] }}</b-badge>
                  <b-badge v-if="names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
                </template>
              </b-form-file>
            </b-form-group>
          </b-col>
        </b-row>
      </b-modal>
    </b-row>
    <template #overlay>
      <div class="text-center rounded">
        <feather-icon icon="UploadIcon" size="4x" />
        <h4>Upload Lampiran ...</h4>
      </div>
    </template>
  </b-overlay>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  BOverlay,
  BModal,
  BBadge,
  BButton,
  BLink,
  BCard,
  BCardBody,
  BRow,
  BCol,
  // BFormInput,
  BFormFile,
  BFormGroup,
  // BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { urlGet, formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BOverlay,
    BModal,
    BBadge,
    BButton,
    BLink,
    BCard,
    BCardBody,
    BRow,
    BCol,
    BFormFile,
    // BFormInput,
    BFormGroup,
    // BFormTextarea,
    vSelect,
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
    lampiran_sp() {
      return this.form.lampiran.filter(x => x.jenis === 'SP')
    },
    lampiran_lainnya() {
      return this.form.lampiran.filter(x => x.jenis === 'LAINNYA')
    },
  },

  methods: {
    urlGet,
    formatRupiah,
    resetModal() {
      this.upload.jenis = null
      this.upload.lampiran = []
    },
    showModalLampiran() {
      this.$bvModal.show('modal-lampiran')
    },
    /* eslint-disable */
    uploadLampiran(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.upload.lampiran.push(selectedFiles[i])
      }
      /* eslint-enable */
    },
    submit(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.upload.jenis !== null && this.upload.lampiran.length > 0) {
        this.$bvModal.hide('modal-lampiran')
        this.show = !this.show
        const file = new FormData()
        if (this.upload.jenis.key === 'LAINNYA') {
          for (let i = 0; i < this.upload.lampiran.length; i += 1) {
            file.append('lampiran_lainnya[]', this.upload.lampiran[i])
          }
        } else if (this.upload.jenis.key === 'SP') {
          for (let i = 0; i < this.upload.lampiran.length; i += 1) {
            file.append('lampiran_sp[]', this.upload.lampiran[i])
          }
        } else if (this.upload.jenis.key === 'RAB') {
          for (let i = 0; i < this.upload.lampiran.length; i += 1) {
            file.append('lampiran_rab[]', this.upload.lampiran[i])
          }
        }
        file.append('id', this.form.id)
        file.append('user_id', this.userData.id)
        this.$store.dispatch('app-perjadin/storeLampiranPerjadin', file).then(x => {
          if (x.status === 200) {
            this.$swal({
              title: 'Sukses!',
              text: 'File berhasil di Upload!',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          } else {
            this.show = !this.show
            this.$swal({
              title: 'Error!',
              text: 'Oopss ada kesalahan!',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
          this.show = !this.show
          this.$bvModal.hide('modal-lampiran')
          this.$store.commit('app-perjadin/UPDATE_LAMPIRAN', x.data)
        })
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Cek file yang akan di Upload',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
    destroy(id, i) {
      this.$swal({
        title: 'Delete ?',
        text: 'Lampiran akan di hapus!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('app-perjadin/deleteLampiran', id).then(res => {
            if (res.status === 200) {
              this.$store.commit('app-perjadin/DELETE_LAMPIRAN', i)
            }
          })
        }
      })
    },
  },
  setup() {
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const upload = ref({
      jenis: null,
      lampiran: [],
    })
    const jenisOption = [
      { key: 'SP', name: 'SURAT PERINTAH' },
      { key: 'RAB', name: 'RANCANGAN ANGGARAN BIAYA' },
      { key: 'LAINNYA', name: 'LAINNYA' },
    ]
    return {
      show,
      userData,
      upload,
      jenisOption,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
