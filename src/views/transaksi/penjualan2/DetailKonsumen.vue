<template>
  <b-form>
    <b-row>
      <b-col
        cols="12"
        class="mb-2"
      >
        <h5 class="mb-0">
          Detail Konsumen
        </h5>
        <small class="text-muted">
          Masukan Detail Konsumen.
        </small>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Pelanggan Lama"
          label-for="nama-pelanggan-lama"
          class="mb-2"
        >
          <v-select
            v-model="namaPelanggan"
            placeholder="Nama Pelanggan"
            label="title"
            :options="option"
          >
            <template #list-header>
              <li class="add-new-data-header d-flex align-items-center my-50">
                <feather-icon
                  icon="PlusIcon"
                  size="16"
                />
                <span class="align-middle ml-25">Tambah Pelanggan</span>
              </li>
            </template>
          </v-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-form-group
          label="Nama Pelanggan"
          label-for="nama-pelanggan"
          class="mb-2"
        >
          <b-form-input
            id="nama-pelanggan"
            v-model="dataOrder.pelanggan.nama"
            trim
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-form-group
          label="Alamat Pelanggan"
          label-for="alamat-pelanggan"
          class="mb-2"
        >
          <b-form-textarea
            id="alamat-pelanggan"
            v-model="dataOrder.pelanggan.alamat"
            rows="4"
            trim
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-form-group
          label="Nomor Telepon"
          label-for="nomor-telepon"
          class="mb-2"
        >
          <b-form-input
            id="nomor-telepon"
            v-model="dataOrder.pelanggan.nomorTelepon"
            type="number"
            trim
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormTextarea, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    // BSV
    BForm,
    BRow,
    BCol,
    BFormTextarea,

    BFormGroup,
    BFormInput,

    // 3rd party
    vSelect,
  },
  props: {
    dataOrder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      namaPelanggan: '',
      option: [{ title: 'Square' }, { title: 'Rectangle' }, { title: 'Rombo' }, { title: 'Romboid' }],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.add-new-data-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;

  &:hover {
    background-color: rgba($success, 0.12);
  }
}
</style>
