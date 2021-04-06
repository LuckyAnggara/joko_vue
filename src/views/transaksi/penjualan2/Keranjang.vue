<template>
  <div>
    <!-- <e-commerce-checkout-step-cart-products /> -->
    <!-- Products List -->
    <b-form>
      <b-row>
        <b-col cols="12" class="mb-2">
          <h5 class="mb-0">
            Keranjang Belanja
          </h5>
          <small class="text-muted">
            Masukan Daftar Barang Penjualan.
          </small>
        </b-col>
        <b-col>
          <b-form-group label="Nama / Kode Barang" label-cols-md="3">
            <v-select
              placeholder="Nama / Kode Barang"
              label="nama"
              :filter-by="myFilter"
              :reduce="barang => barang.id"
              :options="loadDataBarang()"
              @input="showModal"
            >
              <template v-slot:option="option">
                {{ option.kode_barang }} - <b>{{ option.nama }}</b>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mb-2">
          <vue-good-table
            :columns="columns"
            :rows="order"
            :search-options="{
              enabled: false,
            }"
            :pagination-options="{
              enabled: false,
            }"
          >
            <template slot="table-row" slot-scope="props">
              <!-- Column: Action -->
              <span v-if="props.column.field === 'action'">
                <div>
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="danger" class="btn-icon" @click="del(props.index, props.row.id)">
                    <feather-icon icon="TrashIcon" />
                  </b-button>
                </div>
              </span>
              <!-- Column: Common -->
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </b-col>
        <b-col cols="12" md="6">
          <div class="checkout-options">
            <b-card>
              <div class="price-details">
                <h6 class="price-title">
                  Detail Harga
                </h6>
                <hr />
                <ul class="list-unstyled">
                  <li class="price-detail">
                    <div class="detail-title">
                      Total
                    </div>
                    <div class="detail-amt">
                      {{ formatRupiah(invoice.total) }}
                    </div>
                  </li>
                  <li class="price-detail">
                    <div class="detail-title">
                      Diskon
                    </div>
                    <div class="detail-amt discount-amt text-danger">
                      {{ formatRupiah(invoice.diskon) }}
                    </div>
                  </li>
                  <li class="price-detail">
                    <div class="detail-title">
                      Pajak
                    </div>
                    <div class="detail-amt">
                      {{ formatRupiah(invoice.pajak) }}
                    </div>
                  </li>
                  <li class="price-detail">
                    <div class="detail-title mt-1">
                      Ongkos Kirim
                    </div>
                    <div class="detail-amt">
                      <b-form-input v-model="invoice.ongkir" trim type="number" />
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
                      {{ formatRupiah(invoice.grandTotal) }}
                    </div>
                  </li>
                </ul>
              </div>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-form>

    <b-modal
      id="modal-prevent-closing"
      ref="my-modal"
      title="Submit Your Name"
      ok-title="Submit"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <!-- <b-modal id="modal-default" ref="my-modal" ok-only ok-title="Submit" centered :title="detailBarang.nama"> -->
      <b-card-body>
        <b-col cols="12">
          <b-form-group label="Quantity" label-for="quantity" class="mb-2">
            <b-form-input v-model="qty" trim type="number" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Harga Satuan" label-for="nama-pelanggan-lama" class="mb-2">
            <v-select
              v-model="selectHarga"
              placeholder="Satuan"
              label="nama_satuan"
              :options="select.harga"
              :reduce="harga => harga.id"
              :value="select.harga.id"
              @input="setHarga"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Harga Jual" label-for="harga-jual" class="mb-2">
            <b-form-input v-model="hargaJual" trim type="number" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Diskon" label-for="diskon" class="mb-2">
            <b-form-input v-model="diskon" trim type="number" />
          </b-form-group>
        </b-col>
      </b-card-body>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BButton,
  BModal,
  BFormGroup,
  BForm,
  BCard,
  BCardBody,
  // BInputGroup,
  BFormInput,
  // BInputGroupAppend,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

// import ECommerceCheckoutStepCartProducts from './ECommerceCheckoutStepCartProducts.vue'

export default {
  components: {
    // BSV
    BCard,
    BCardBody,
    BForm,
    BRow,
    BCol,
    BButton,
    vSelect,
    VueGoodTable,
    BFormInput,
    BFormGroup,
    BModal,
    // SFC
    // ECommerceCheckoutStepCartProducts,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      select: {
        barang: [],
        harga: [],
      },
      invoice: {
        total: 1000,
        diskon: 0,
        pajak: 0,
        ongkir: 0,
        grandTotal: 0,
      },
      selectHarga: '',
      qty: 1,
      diskon: 0,
      hargaJual: 0,
      detailBarang: {
        nama: null,
        qty: null,
      },
      columns: [
        {
          label: 'Kode',
          field: 'kode_barang',
        },
        {
          label: 'Nama Barang',
          field: 'nama_barang',
        },
        {
          label: 'Qty',
          field: 'jumlah',
        },
        {
          label: 'Harga Jual',
          field: 'harga_jual',
          formatFn: this.formatRupiah,
        },
        {
          label: 'Diskon',
          field: 'diskon',
        },
        {
          label: 'Total',
          field: 'total',
          formatFn: this.formatRupiah,
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      order: [],
    }
  },
  computed: {
    ongkir() {
      return this.invoice.ongkir
    },
    ongkir2() {
      return this.formatRupiah(this.invoice.ongkir)
    },
  },
  watch: {
    ongkir() {
      if (this.invoice.ongkir === '') {
        this.invoice.ongkir = 0
      } else {
        this.invoice.grandTotal =
          parseFloat(this.invoice.total) - parseFloat(this.invoice.diskon) + parseFloat(this.invoice.pajak) + parseFloat(this.invoice.ongkir)
      }
    },
  },
  mounted() {
    this.loadDataBarang()
  },
  methods: {
    resetModal() {
      this.invoice.ongkir = 0
      this.detailBarang.qty = 1
      this.selectHarga = ''
      this.hargaJual = 0
      this.qty = 1
    },
    handleInput(event) {
      this.invoice.ongkir = this.formatRupiah(event)
    },
    formatRupiah(value) {
      return `Rp. ${value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    setHarga(id) {
      if (id !== null) {
        const data = this.detailBarang.harga.find(d => d.id === id)
        this.hargaJual = data.harga
      }
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Push the name to submitted names
      const nomor = this.order.length + 1
      const total = this.qty * this.hargaJual - this.diskon
      const data = {
        id: nomor,
        kode_barang: this.detailBarang.kode_barang,
        nama_barang: this.detailBarang.nama,
        jumlah: this.qty,
        harga_jual: this.hargaJual,
        diskon: this.diskon,
        total,
      }
      this.order.push(data)
      this.invoice.total = parseFloat(this.invoice.total) + parseFloat(total)
      store.commit('app-transaksi/ADD_ORDER', this.id)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
    showModal(id) {
      if (id !== null) {
        this.detailBarang = this.select.barang.find(d => d.id === id)
        this.select.harga = this.detailBarang.harga
        this.$refs['my-modal'].show()
      } else {
        console.info('error id tidak ditemukan')
      }
    },
    myFilter: (option, label, search) => {
      const temp = search.toLowerCase()
      return option.nama.toLowerCase().indexOf(temp) > -1 || option.kode_barang.toLowerCase().indexOf(temp) > -1
    },
    loadDataBarang() {
      if (this.$store.getters['app-barang/getListBarang'].length === 0) {
        this.$store.dispatch('app-barang/fetchListBarang').then(res => {
          this.$store.commit('app-barang/SET_LIST_BARANG', res.data)
          const data = this.$store.getters['app-barang/getListBarang']
          this.select.barang = data
          return data
        })
      }
      this.select.barang = this.$store.getters['app-barang/getListBarang']
      return this.$store.getters['app-barang/getListBarang']
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
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
