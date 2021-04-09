<template>
  <div>
    <form-wizard
      color="#7367F0"
      :start-index="dataOrder.startIndex"
      :title="null"
      :subtitle="null"
      layout="vertical"
      finish-button-text="Proses"
      custom-buttons-right="assd"
      back-button-text="Previous"
      class="wizard-vertical mb-3"
      @on-complete="formSubmitted"
    >
      <!-- account datails tab -->
      <tab-content title="Account Details" :before-change="beforeTabSwitch1">
        <detail-konsumen :data-order="dataOrder" />
      </tab-content>

      <!-- personal info tab -->
      <tab-content title="Keranjang" :before-change="beforeTabSwitch2">
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
        pembayaran: {
          bank: '',
          jenisPembayaran: { title: 'Tunai', value: '0' },
          kredit: false,
          downPayment: 0,
          tanggalJatuhTempo: '',
          statusPembayaran: { title: 'Lunas', value: '0' },
        },
        orders: {},
      },
    }
  },

  methods: {
    beforeTabSwitch1() {
      if (this.dataOrder.pelanggan.nama !== '' || this.dataOrder.pelanggan.alamat !== '') {
        this.dataOrder.nomor = parseFloat(store.getters['app-transaksi/getJumlahPenjualan']) + parseFloat(1)

        store.commit('app-transaksi/SET_ACTIVE_PENJUALAN', this.dataOrder)
        return true
      }
      this.$swal({
        icon: 'error',
        title: 'Oopss Data Pelanggan Masih Kosong',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      })
      return false
    },
    beforeTabSwitch2() {
      const data = store.getters['app-transaksi/getActivePenjualan']
      if (data.orders.length > 0) {
        return true
      }
      this.$swal({
        icon: 'error',
        title: 'Oopss Data Order Masih Kosong',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      })
      return false
    },
    formSubmitted() {
      this.store()
      // this.$toast({
      //   component: ToastificationContent,
      //   props: {
      //     title: 'Form Submitted',
      //     icon: 'EditIcon',
      //     variant: 'success',
      //   },
      // })
    },
    store() {
      store.dispatch('app-transaksi/addTransaksi', this.dataOrder).then(res => {
        if (res.status === 200) {
          console.info(res)
          // store.commit('app-barang/UPDATE_LIST_BARANG', res.data)
          // this.success()
        } else {
          // this.error()
        }
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
