<template>
  <div>
    <form-wizard
      color="#7367F0"
      :start-index="dataOrder.startIndex"
      :title="null"
      :subtitle="null"
      layout="vertical"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="wizard-vertical mb-3"
      @on-complete="formSubmitted"
    >
      <!-- account datails tab -->
      <tab-content
        title="Account Details"
        :before-change="beforeTabSwitch"
      >
        <detail-konsumen :data-order="dataOrder" />
        <!-- <b-row>
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
        </b-row> -->
      </tab-content>

      <!-- personal info tab -->
      <tab-content title="Keranjang">
        <keranjang />
      </tab-content>

      <!-- social link -->
      <tab-content title="Review Order">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Social Links
            </h5>
            <small class="text-muted">Enter Your Social Links</small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Twitter"
              label-for="v-twitter"
            >
              <b-form-input
                id="v-twitter"
                placeholder="https://twitter.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Facebook"
              label-for="v-facebook"
            >
              <b-form-input
                id="v-facebook"
                placeholder="https://facebook.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Google+"
              label-for="v-google-plus"
            >
              <b-form-input
                id="v-google-plus"
                placeholder="https://plus.google.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="LinkedIn"
              label-for="v-linked-in"
            >
              <b-form-input
                id="v-linked-in"
                placeholder="https://linkedin.com/abc"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
// import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import store from '@/store'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  // BFormTextarea,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DetailKonsumen from './DetailKonsumen.vue'
import Keranjang from './Keranjang.vue'

export default {
  components: {
    FormWizard,
    DetailKonsumen,
    TabContent,
    Keranjang,
    // BFormTextarea,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    // vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      dataOrder: {
        startIndex: 0,
        nomor: 0,
        pelanggan: {
          kodePelanggan: '',
          nama: '',
          alamat: '',
          nomorTelepon: '',
        },
        order: {},
      },
      selectedContry: 'select_value',
      selectedLanguage: 'nothing_selected',
      countryName: [
        { value: 'select_value', text: 'Select Value' },
        { value: 'Russia', text: 'Russia' },
        { value: 'Canada', text: 'Canada' },
        { value: 'China', text: 'China' },
        { value: 'United States', text: 'United States' },
        { value: 'Brazil', text: 'Brazil' },
        { value: 'Australia', text: 'Australia' },
        { value: 'India', text: 'India' },
      ],
      languageName: [
        { value: 'nothing_selected', text: 'Nothing Selected' },
        { value: 'English', text: 'English' },
        { value: 'Chinese', text: 'Mandarin Chinese' },
        { value: 'Hindi', text: 'Hindi' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'Arabic', text: 'Arabic' },
        { value: 'Malay', text: 'Malay' },
        { value: 'Russian', text: 'Russian' },
      ],
    }
  },

  methods: {
    beforeTabSwitch() {
      this.dataOrder.nomor = parseFloat(store.getters['app-transaksi/getJumlahOrder']) + parseFloat(1)

      store.commit('app-transaksi/ADD_ORDER', this.dataOrder)

      console.info(store.getters['app-transaksi/getOrder'])
      return true
    },
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.add-new-data-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;

  &:hover {
    background-color: rgba($success, 0.12);
  }
}
</style>
