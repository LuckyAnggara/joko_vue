<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="12" sm="12">
      <b-card-body>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Surat Perintah" label-cols-md="3">
              <b-form-file
                @change="uploadFilesSuratPerintah"
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
          <b-col cols="12">
            <b-form-group label="Rencana Anggaran Biaya" label-cols-md="3">
              <b-form-file
                @change="uploadFilesRab"
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
          <b-col cols="12">
            <b-form-group label="Lainnya" label-cols-md="3">
              <b-form-file
                @change="UploadFilesLainnya"
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
      </b-card-body>
    </b-col>
  </b-row>
</template>

<script>
import { BCardBody, BBadge, BFormFile, BRow, BCol, BFormGroup } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import usePerjadinStore from '@/store/pinia/perjadinStore'

export default {
  components: {
    BCardBody,
    BBadge,
    BFormFile,
    BRow,
    BCol,
    BFormGroup,
  },
  directives: {
    Ripple,
  },
  props: {
    form: Object,
  },
  methods: {
    /* eslint-disable */
    uploadFilesSuratPerintah(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.perjadinStore.form.lampiran.surat_perintah.push(selectedFiles[i])
      }
    },
    uploadFilesRab(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.perjadinStore.form.lampiran.rab.push(selectedFiles[i])
      }
    },
    UploadFilesLainnya(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.perjadinStore.form.lampiran.lainnya.push(selectedFiles[i])
      }
    },
    /* eslint-enable */
  },
  setup() {
    const perjadinStore = usePerjadinStore()

    return {
      perjadinStore,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
