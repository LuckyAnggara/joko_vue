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
      <tab-content title="Account Details" :before-change="beforeTabSwitch">
        <detail-konsumen :data-order="dataOrder" />
      </tab-content>

      <!-- personal info tab -->
      <tab-content title="Keranjang">
        <keranjang />
      </tab-content>
      <!-- social link -->
      <tab-content title="Review Order">
        <review-order />
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
// import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import store from '@/store'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DetailKonsumen from './DetailKonsumen.vue'
import ReviewOrder from './ReviewOrder.vue'
import Keranjang from './Keranjang.vue'

export default {
  components: {
    FormWizard,
    DetailKonsumen,
    ReviewOrder,
    TabContent,
    Keranjang,
    // BFormTextarea,

    // vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      dataOrder: {
        startIndex: 0,
        nomor: 0,
        status: false, // untuk Status Draft atau Proses
        pelanggan: {
          kodePelanggan: '',
          nama: '',
          alamat: '',
          nomorTelepon: '',
        },
        invoice: '',
        orders: {},
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
      this.dataOrder.nomor = parseFloat(store.getters['app-transaksi/getJumlahPenjualan']) + parseFloat(1)

      store.commit('app-transaksi/SET_ACTIVE_PENJUALAN', this.dataOrder)

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
