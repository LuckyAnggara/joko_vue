<template>
  <!-- <b-row class="match-height"> -->
  <b-overlay :show="show" rounded="lg" variant="transparent" blur="15px" opacity="0.70">
    <b-row>
      <b-col lg="12" sm="12" md="12" cols="12">
        <b-card title="Lampiran" footer-tag="footer">
          <b-card-body>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Lampiran">
                  <template v-if="lampiran.length > 0 ? true : false">
                    <ul>
                      <li v-for="(item, index) in lampiran" :key="item.id">
                        <b-link :href="urlGet(item.id, 'kegiatan')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
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
            <b-row class="mt-2" v-if="data.status !== 'PENGAJUAN' && data.status !== 'SELESAI'">
              <b-button variant="outline-primary" class="ml-1" @click="showModalLampiran()"> Tambah Lampiran </b-button>
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
import { BOverlay, BModal, BBadge, BButton, BLink, BCard, BCardBody, BRow, BCol, BFormFile, BFormGroup } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { urlGet, formatRupiah } from '@core/utils/filter'

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
    BFormGroup,
  },
  directives: {
    Ripple,
  },
  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    lampiran() {
      return this.data.lampiran
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
    submit() {
      if (this.upload.lampiran.length > 0) {
        this.show = !this.show

        const file = new FormData()

        for (let i = 0; i < this.upload.lampiran.length; i += 1) {
          file.append('lampiran[]', this.upload.lampiran[i])
        }

        file.append('id', this.data.id)
        file.append('user_id', this.userData.id)

        this.$store
          .dispatch('app-kegiatan/storeLampiranKegiatan', file)
          .then(x => {
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
              this.show = !this.show
              this.$store.commit('app-kegiatan/UPDATE_LAMPIRAN', x.data)
            }
          })
          .catch(err => {
            this.show = !this.show
            this.$swal({
              title: 'Error!',
              text: err,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
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
          this.$store.dispatch('app-kegiatan/deleteLampiran', id).then(res => {
            if (res.status === 200) {
              this.$store.commit('app-kegiatan/DELETE_LAMPIRAN', i)
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
