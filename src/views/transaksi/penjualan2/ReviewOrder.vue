<template>
  <b-form>
    <b-col cols="12" class="mb-2">
      <h5 class="mb-0">
        Review Order
      </h5>
      <small class="text-muted">Cek kembali order sebelum ke Proses selanjutnya</small>
    </b-col>
    <b-row>
      <b-col cols="12" md="6">
        <div class="checkout-options">
          <b-card>
            <div class="price-details">
              <h6 class="price-title">
                Data Pelanggan
              </h6>
              <hr />
              <ul class="list-unstyled">
                <li class="price-detail">
                  <div class="detail-title mb-1">
                    {{ data.pelanggan.nama }}
                  </div>
                </li>
                <li class="price-detail">
                  <div class="detail-title mb-1" style="white-space:pre-line;">
                    {{ data.pelanggan.alamat }}
                  </div>
                </li>
                <li class="price-detail">
                  <div class="detail-title">
                    {{ data.pelanggan.nomorTelepon }}
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div class="checkout-options">
          <b-card>
            <div class="price-details">
              <h6 class="price-title">
                Detail Pembayaran
              </h6>
              <hr />
              <ul class="list-unstyled">
                <li class="price-detail">
                  <div class="detail-title">
                    Item
                  </div>
                  <div class="detail-amt">{{ data.orders.length }} item</div>
                </li>
                <li class="price-detail">
                  <div class="detail-title">
                    Total
                  </div>
                  <div class="detail-amt">
                    {{ formatRupiah(data.invoice.total) }}
                  </div>
                </li>
                <li class="price-detail">
                  <div class="detail-title text-danger">
                    Diskon
                  </div>
                  <div class="detail-amt discount-amt text-danger">
                    {{ formatRupiah(data.invoice.diskon) }}
                  </div>
                </li>
                <hr />
                <li class="price-detail">
                  <div class="detail-title">
                    <b>Sub Total</b>
                  </div>
                  <div class="detail-amt">
                    <b> {{ formatRupiah(subTotal) }}</b>
                  </div>
                </li>
                <li class="price-detail mt-1">
                  <div class="detail-title text-primary">
                    Pajak
                  </div>
                  <div class="detail-amt text-primary">
                    {{ formatRupiah(data.invoice.pajak) }}
                  </div>
                </li>
                <li class="price-detail">
                  <div class="detail-title">
                    Ongkos Kirim
                  </div>
                  <div class="detail-amt">
                    {{ formatRupiah(data.invoice.ongkir) }}
                  </div>
                </li>
              </ul>
              <hr />
              <ul class="list-unstyled">
                <li class="price-detail">
                  <div class="detail-title detail-total">
                    Grand Total
                  </div>
                  <div class="detail-amt font-weight-bolder">
                    {{ formatRupiah(data.invoice.grandTotal) }}
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="12" md="8">
        <b-form-group label="Metode Pembayaran" label-cols-md="4">
          <v-select
            v-model="data.pembayaran.statusPembayaran"
            :value="data.pembayaran.statusPembayaran.value"
            placeholder="Cara Pembayaran"
            label="title"
            :options="pembayaranOption"
            @input="cekStatusPembayaran"
            :clearable="false"
          />
        </b-form-group>
        <hr />
      </b-col>
    </b-row>
    <b-row v-show="data.pembayaran.kredit">
      <b-col cols="12" md="8">
        <b-form-group label="Tanggal Jatuh Tempo" label-for="tanggalJatuhTempo" label-cols-md="4">
          <b-form-datepicker id="tanggalJatuhTempo" v-model="data.pembayaran.tanggalJatuhTempo" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-show="data.pembayaran.kredit">
      <b-col cols="12" md="8">
        <b-form-group label="Down Payment" label-for="down-payment" label-cols-md="4">
          <b-form-input type="number" id="down-payment" @change="dpOnChange($event)" v-model="data.pembayaran.downPayment" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="8">
        <b-form-group label="Jumlah Pembayaran" label-for="down-payment" label-cols-md="4">
          <b-form-input type="number" id="jumlah-pembayaran" v-model="jumlahPembayaran" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="8">
        <b-form-group label="Kembalian" label-for="down-payment" label-cols-md="4">
          <b-form-input readonly type="text" id="kembalian" v-model="kembalian" />
        </b-form-group>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="8">
        <b-form-group label="Jumlah Pembayaran" label-for="down-payment" label-cols-md="4">
          <v-select
            v-model="data.pembayaran.jenisPembayaran"
            :value="data.pembayaran.jenisPembayaran.value"
            placeholder="Cara Pembayaran"
            label="title"
            :options="jenisPembayaranOption"
            :clearable="false"
            @input="cekJenisPembayaran"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-show="transfer">
      <b-col cols="12" md="8">
        <b-form-group label="Transfer ke" label-for="down-payment" label-cols-md="4">
          <v-select placeholder="Nama Bank" v-model="data.pembayaran.bank" label="title" :clearable="false" :options="bankOption" />
        </b-form-group>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-end">
      <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="warning">
        Simpan
      </b-button>
    </div>
  </b-form>
</template>

<script>
import { BButton, BFormDatepicker, BFormGroup, BCard, BForm, BFormInput, BRow, BCol } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    // BSV
    BButton,
    BFormDatepicker,
    BForm,
    BFormGroup,
    BRow,
    BCol,
    BCard,
    BFormInput,
    // 3rd party
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      jumlahPembayaran: 0,
      transfer: false,
      pembayaranOption: [
        { title: 'Lunas', value: '0' },
        { title: 'Kredit', value: '1' },
        { title: 'Cash On Delivery (COD)', value: '2' },
      ],
      jenisPembayaranOption: [
        { title: 'Tunai', value: '0' },
        { title: 'Transfer', value: '1' },
      ],
      bankOption: [
        { title: 'BNI - 0542424', value: '0' },
        { title: 'BRI - 0203203020302', value: '1' },
        { title: 'BCA - asdasdasdasd', value: '1' },
      ],
    }
  },

  computed: {
    subTotal() {
      return parseFloat(this.data.invoice.total) - parseFloat(this.data.invoice.diskon)
    },
    kembalian() {
      if (this.jumlahPembayaran === 0) {
        return this.formatRupiah(0)
      }
      return this.formatRupiah(this.jumlahPembayaran - this.data.invoice.grandTotal)
    },
    data() {
      return store.getters['app-transaksi/getActivePenjualan']
    },
  },
  methods: {
    dpOnChange(e) {
      if (e >= this.data.invoice.grandTotal) {
        this.data.pembayaran.downPayment = this.data.invoice.grandTotal
      }
    },
    cekStatusPembayaran(id) {
      if (id.value === '1') {
        this.data.pembayaran.kredit = true
      } else {
        this.data.pembayaran.kredit = false
      }
      this.resetInput()

      // console.info(id.value)
    },
    cekJenisPembayaran(id) {
      console.info(id)
      if (id.value === '1') {
        this.transfer = true
      } else {
        this.transfer = false
      }
      // console.info(id.value)
    },
    resetInput() {
      this.jumlahPembayaran = 0
      this.data.pembayaran.downPayment = 0
      this.data.pembayaran.tanggalJatuhTempo = ''
    },
    formatRupiah(value) {
      return `Rp. ${value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
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

<style lang="scss">
$body-color: #6e6b7b !default;
$font-weight-bolder: 600 !default;
.checkout-options {
  .coupons {
    &:focus-within {
      box-shadow: none;
    }
    input {
      border: none;
      padding-left: 0;
      color: $body-color;
      font-weight: $font-weight-bolder;
      &::placeholder {
        color: $body-color;
        font-weight: $font-weight-bolder;
      }
    }
    .input-group-append {
      margin: 0;
    }
    .input-group-text {
      height: auto;
      font-weight: $font-weight-bolder;
      padding: inherit;
    }
  }
  .price-details {
    .price-title {
      font-weight: $font-weight-bolder;
      // margin-bottom: 0.75rem;
      // margin-top: 1.5rem;
    }
    .price-detail {
      display: flex;
      justify-content: space-between;
      // margin-bottom: 0.75rem;

      .detail-title {
        &.detail-total {
          font-weight: $font-weight-bolder;
        }
      }
    }
  }
}
</style>
