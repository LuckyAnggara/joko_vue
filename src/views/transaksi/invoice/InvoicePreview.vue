<template>
  <section class="invoice-preview-wrapper">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="dataInvoice === undefined">
      <h4 class="alert-heading">
        Error fetching invoice data
      </h4>
      <div class="alert-body">
        Tidak ada Invoice di temukan, silahkan pilih kembali Invoice di
        <b-link class="alert-link" :to="{ name: 'transaksi-penjualan-daftar' }">
          <span class="text-primary">Daftar Transaksi</span>
        </b-link>
        untuk Invoice lainnya.
      </div>
    </b-alert>

    <b-row v-if="dataInvoice" class="invoice-preview">
      <!-- Col: Left (Invoice Container) -->
      <b-col cols="12" xl="10" md="10">
        <b-card no-body class="invoice-preview-card">
          <!-- Header -->
          <b-card-body class="invoice-padding pb-0">
            <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <logo />
                  <h3 class="text-primary invoice-logo">
                    PT. Berkah Baja Makmur
                  </h3>
                </div>
                <p class="card-text mb-25">
                  Jl. Raya Limbangan Nomor xx Garut, Jawa Barat
                </p>
                <p class="card-text mb-25">
                  Nomor Telepon : 08211xxxx Fax : xxxxx Email : asdasd@gmail.com
                </p>
              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-1">
                <h6 class="invoice-title">
                  Invoice
                  <span class="invoice-number">#{{ dataInvoice.nomorTransaksi }}</span>
                </h6>
                <div class="invoice-date-wrapper">
                  <table>
                    <tbody>
                      <tr>
                        <td class="pr-1">
                          Tanggal Terbit:
                        </td>
                        <td>
                          <span class="font-weight-bold"> {{ this.$moment(dataInvoice.tanggalTransaksi).format('DD MMMM YYYY') }}</span>
                        </td>
                      </tr>
                      <tr v-show="dataInvoice.pembayaran.statusPembayaran.value === '1' ? true : false">
                        <td class="pr-1">
                          Tanggal Tempo:
                        </td>
                        <td>
                          <span class="font-weight-bold"> {{ this.$moment(dataInvoice.pembayaran.tanggalJatuhTempo).format('DD MMMM YYYY') }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing" />

          <!-- Invoice Client & Payment Details -->
          <b-card-body class="invoice-padding pt-0">
            <b-row class="invoice-spacing">
              <!-- Col: Invoice To -->
              <b-col cols="12" xl="6" class="p-0">
                <h6 class="mb-1">
                  Invoice Ke:
                </h6>
                <h6 class="mb-25">
                  {{ dataInvoice.pelanggan.nama }}
                </h6>
                <p class="card-text mb-25">
                  <span style="white-space: pre-line;"> {{ dataInvoice.pelanggan.alamat }}</span>
                </p>

                <p class="card-text mb-25">
                  {{ dataInvoice.pelanggan.nomorTelepon }}
                </p>
              </b-col>

              <!-- Col: Payment Details -->
              <b-col xl="6" cols="12" class="p-0 mt-xl-0 mt-2 d-flex justify-content-xl-end">
                <div>
                  <h6 class="mb-1">
                    Detail Pembayaran:
                  </h6>
                  <table>
                    <tbody>
                      <tr>
                        <td class="pr-1">
                          Total Tagihan:
                        </td>
                        <td>
                          <span class="font-weight-bold"> {{ formatRupiah(dataInvoice.invoice.grandTotal) }}</span>
                        </td>
                      </tr>
                      <tr v-show="dataInvoice.pembayaran.statusPembayaran.value === '1' ? false : true">
                        <td class="pr-1">
                          Jenis Pembayaran:
                        </td>
                        <td>{{ dataInvoice.pembayaran.jenisPembayaran.title }}</td>
                      </tr>
                      <tr v-show="dataInvoice.pembayaran.bank === '' || dataInvoice.pembayaran.bank === null ? false : true">
                        <td class="pr-1">
                          Bank:
                        </td>
                        <td>{{ bank }}</td>
                      </tr>
                      <tr>
                        <td class="pr-1">
                          Status Pembayaran:
                        </td>
                        <td>
                          <b>{{ dataInvoice.pembayaran.statusPembayaran.title }}</b>
                        </td>
                      </tr>
                      <section v-show="dataInvoice.pembayaran.statusPembayaran.value === '1' ? true : false">
                        <tr>
                          <td class="pr-1">
                            Down Payment:
                          </td>
                          <td>
                            {{ formatRupiah(dataInvoice.pembayaran.downPayment) }}
                          </td>
                        </tr>
                        <tr>
                          <td class="pr-1">
                            Sisa Tagihan:
                          </td>
                          <td>
                            <b>{{ sisaTagihan }}</b>
                          </td>
                        </tr>
                      </section>
                    </tbody>
                  </table>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Invoice Description: Table -->
          <b-table-lite responsive :items="dataInvoice.orders" :fields="['nama_barang', 'harga', 'jumlah', 'total']">
            <template #cell(harga)="data">
              <span class="text-nowrap">
                {{ formatRupiah(data.value) }}
              </span>
            </template>
            <template #cell(total)="data">
              <span class="text-nowrap">
                {{ formatRupiah(data.value) }}
              </span>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Total -->
          <b-card-body class="invoice-padding pb-0">
            <b-row class="invoice-spacing">
              <!-- Col: Sales Persion -->
              <b-col cols="12" xl="6" class="p-0">
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Kasir</span>
                </b-card-text>
                <br />
                <br />
                <br />
                <span class="font-weight-bold">Lucky Anggara</span>
              </b-col>

              <!-- Col: Total -->
              <b-col xl="6" cols="12" class="p-0 mt-xl-0 mt-2 d-flex justify-content-xl-end">
                <table>
                  <tbody>
                    <tr>
                      <td class="pr-1">
                        Sub Total:
                      </td>
                      <td>
                        <span class="font-weight-bold">{{ formatRupiah(dataInvoice.invoice.total) }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 text-danger">
                        Diskon:
                      </td>
                      <td class="pr-1 text-danger">
                        {{ formatRupiah(dataInvoice.invoice.diskon) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1">
                        Pajak:
                      </td>
                      <td>{{ formatRupiah(dataInvoice.invoice.pajak) }}</td>
                    </tr>
                    <tr>
                      <td class="pr-1">
                        Ongkos Kirim:
                      </td>
                      <td>
                        {{ formatRupiah(dataInvoice.invoice.ongkir) }}
                      </td>
                    </tr>
                    <hr />
                    <tr>
                      <td class="pr-1">
                        Total:
                      </td>
                      <td>
                        <b>{{ formatRupiah(dataInvoice.invoice.grandTotal) }}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing" />

          <!-- Note -->
          <b-card-body class="invoice-padding pt-0">
            <span class="font-weight-bold">Note: </span>
            <span>..</span>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col cols="12" md="2" xl="2" class="invoice-actions">
        <b-card>
          <!-- Button: Send Invoice -->
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" v-b-toggle.sidebar-send-invoice variant="primary" class="mb-75" block>
            Send Invoice
          </b-button>

          <!-- Button: DOwnload -->
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mb-75" block>
            Download
          </b-button>

          <!-- Button: Print -->
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mb-75" block @click="printInvoice">
            Print
          </b-button>

          <!-- Button: Edit -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            :to="{ name: 'apps-invoice-edit', params: { id: $route.params.id } }"
          >
            Edit
          </b-button>

          <!-- Button: Add Payment -->
          <b-button v-b-toggle.sidebar-invoice-add-payment v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="mb-75" block>
            Add Payment
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import router from '@/router'

import { ref } from '@vue/composition-api'

import { BRow, BCol, BCard, BCardBody, BTableLite, BCardText, BButton, BAlert, BLink, VBToggle } from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,

    Logo,
  },
  data() {
    return {
      return: {
        transfer: false,
      },
    }
  },
  computed: {
    sisaTagihan() {
      return this.formatRupiah(parseFloat(this.dataInvoice.invoice.grandTotal) - parseFloat(this.dataInvoice.pembayaran.downPayment))
    },
    bank() {
      if (this.dataInvoice.pembayaran.bank === '' || this.dataInvoice.pembayaran.bank === null) {
        return ''
      }
      return this.dataInvoice.pembayaran.bank.title
    },
  },
  methods: {
    cekTransfer() {
      if (this.dataInvoice.pembayaran.bank === '') {
        this.transfer = false
      }
      this.transfer = true
    },
    formatRupiah(value) {
      return `Rp. ${value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    printInvoice() {},
  },
  setup() {
    if (router.currentRoute.params.id !== undefined) {
      store.commit('app-transaksi/SET_DATA_INVOICE_FROM_DAFTAR', router.currentRoute.params.id)
    }
    const dataInvoice = ref(store.getters['app-transaksi/getDataInvoice'])
    return {
      dataInvoice,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/pages/app-invoice.scss';
</style>

<style lang="scss">
@media print {
  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 1rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
            > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>
