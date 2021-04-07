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
    <b-row>
      <b-col cols="12" md="6">
        <b-form-group label="Pembayaran" label-for="nama-pelanggan-lama" class="mb-2" label-cols-md="5">
          <v-select v-model="statusPembayaran" placeholder="Cara Pembayaran" label="title" :options="pembayaranOption" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6">
        <b-form-group label="Tanggal Jatuh Tempo" label-for="nama-pelanggan-lama" class="mb-2" label-cols-md="5">
          <flat-pickr v-model="tanggalJatuhTempo" class="form-control" />
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { BFormGroup, BCard, BForm, BRow, BCol } from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    // BSV
    BForm,
    BFormGroup,
    BRow,
    BCol,
    BCard,
    flatPickr,
    // 3rd party
    vSelect,
  },
  data() {
    return {
      tanggalJatuhTempo: '',
      statusPembayaran: '',
      pembayaranOption: [
        { title: 'Lunas', value: '0' },
        { title: 'Kredit', value: '2' },
        { title: 'Cash On Delivery (COD)', value: '3' },
        { title: 'Transfer', value: '4' },
      ],
    }
  },
  computed: {
    subTotal() {
      return parseFloat(this.data.invoice.total) - parseFloat(this.data.invoice.diskon)
    },
    data() {
      return store.getters['app-transaksi/getActivePenjualan']
    },
  },
  methods: {
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
