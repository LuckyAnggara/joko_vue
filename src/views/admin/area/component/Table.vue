<template>
  <section>
    <b-table ref="refTable" responsive primary-key="id" bordered striped :fields="tableColumns" :items="dataTable" empty-text="Tidak ada data">
      <!-- Column: Id -->
      <template #cell(id)="data">
        <span>
          {{ data.index + 1 }}
        </span>
      </template>

      <!-- Column: Id -->
      <template #cell(lampiran)="data">
        <li v-for="item in data.item.lampiran" :key="item.id">
          <b-link :href="urlGet(item.url)" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>

          <b-button v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant="flat-danger" class="btn-icon" size="sm" @click="deleteData(item)">
            <feather-icon icon="TrashIcon" />
          </b-button>
        </li>
      </template>

      <!-- Column: Id -->
      <template #cell(deskripsi)="data">
        <span style="white-space: pre-wrap;">
          {{ data.item.deskripsi }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <feather-icon :id="`rkt-row-${data.item.id}-preview-icon`" icon="UploadIcon" size="16" class="mx-1" @click="showModal(data.item.id)" />
          <b-tooltip title="Upload Data Dukung" :target="`rkt-row-${data.item.id}-preview-icon`" />
        </div>
      </template>
    </b-table>
    <div>
      <b-modal ref="upload-modal" title="Upload Data" centered no-close-on-backdrop no-close-on-esc ok-only ok-title="Close" size="lg">
        <vue-dropzone
          ref="myVueDropzone"
          v-on:vdropzone-sending="sendingEvent"
          v-on:vdropzone-success="sendingSuccess"
          id="dropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>
      </b-modal>
    </div>
  </section>
</template>

<script>
import store from '@/store'

import { BLink, BTable, BButton, BModal, VBModal, BTooltip } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    vueDropzone: vue2Dropzone,
    BModal,
    BTable,
    BLink,
    // BDropdown,
    // BDropdownItem,
    BButton,
    BTooltip,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'http://127.0.0.1:8000/api/rkt/upload',
        thumbnailWidth: 200,
        addRemoveLinks: true,
      },
      modalId: '',
      url: 'http://127.0.0.1:8000',
    }
  },
  props: {
    dataTable: {
      type: Array,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
  },
  methods: {
    deleteData(item) {
      this.$swal({
        title: 'Anda yakin?',
        text: 'Lampiran akan di delete!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, delete !!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          store.dispatch('app-rkt/deleteLampiran', item.id).then(res => {
            if (res.status === 200) {
              store.commit('app-rkt/DELETE_LAMPIRAN', {
                lampiran_id: item.id,
                rkt_id: item.rkt_id,
                area_id: this.area,
              })
              this.$swal({
                icon: 'success',
                title: 'Deleted!',
                text: 'Lampiran berhasil di delete !',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            }
          })
        }
      })
    },
    showModal(id) {
      this.$refs['upload-modal'].show()
      this.modalId = id
    },
    sendingEvent(file, xhr, formData) {
      formData.append('id', this.modalId)
    },
    sendingSuccess(file, response) {
      if (response.success === true) {
        store.commit('app-rkt/NEW_LAMPIRAN', { area_id: this.area, rkt_id: this.modalId, data: response.data })
      }
    },
    urlGet(id) {
      return `${this.url}${id}`
    },
  },
  setup() {
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'target', label: 'Target' },
      { key: 'nama', label: 'recana kerja' },
      { key: 'deskripsi', tdClass: 'nameOfTheClass' },
      { key: 'lampiran', label: 'data dukung' },
      { key: 'actions' },
    ]
    return {
      tableColumns,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.nameOfTheClass {
  max-width: 50px;
}

.rkt-filter-select {
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
