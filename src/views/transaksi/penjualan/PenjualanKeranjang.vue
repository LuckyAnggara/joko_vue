<template>
  <div class="list-view product-checkout mt-0">
    <!-- <e-commerce-checkout-step-cart-products /> -->
    <!-- Products List -->
    <b-row>
      <b-col cols="12" md="8">
        <!-- Left Form -->
        <b-card>
          <div>
            <h6>
              Keranjang
            </h6>
            <hr />
          </div>
          <b-card-body>
            <!-- Full Name -->
            <b-form-group label="Nama / Kode Barang" label-cols-md="3">
              <v-select
                placeholder="Nama / Kode Barang"
                label="nama"
                :filter-by="myFilter"
                :reduce="dataBarang => dataBarang.id"
                :options="loadDataBarang()"
                @input="showModal"
              >
                <template v-slot:option="option">
                  {{ option.kode_barang }} - <b>{{ option.nama }}</b>
                </template>
              </v-select>
            </b-form-group>
            <vue-good-table
              :columns="columns"
              :rows="rows"
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
            <!-- Submit Button -->
            <hr />
          </b-card-body>
        </b-card>
      </b-col>
      <!-- Checkout Options -->

      <b-col cols="12" md="4">
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
                    {{ detailHarga.total }}
                  </div>
                </li>
                <li class="price-detail">
                  <div class="detail-title">
                    Diskon
                  </div>
                  <div class="detail-amt discount-amt text-danger">
                    {{ detailHarga.diskon }}
                  </div>
                </li>
                <li class="price-detail">
                  <div class="detail-title">
                    Pajak
                  </div>
                  <div class="detail-amt">
                    {{ detailHarga.pajak }}
                  </div>
                </li>
                <li class="price-detail">
                  <div class="detail-title mt-1">
                    Ongkos Kirim
                  </div>
                  <div class="detail-amt">
                    <b-form-input v-model="detailHarga.ongkir" trim type="number" />
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
                    {{ Number(detailHarga.grandTotal).toLocaleString() }}
                  </div>
                </li>
              </ul>
              <b-button variant="primary" block @click="$emit('next-step')">
                Place Order
              </b-button>
            </div>
          </b-card>
        </div>
      </b-col>
    </b-row>
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
              placeholder="Satuan"
              label="nama_satuan"
              :options="dataHarga"
              @input="setHarga"
              :reduce="dataHarga => dataHarga.id"
              v-model="selectHarga"
              v-bind:value="dataHarga.id"
            >
            </v-select>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Harga Jual" label-for="harga-jual" class="mb-2">
            <b-form-input v-model="hargaJual.harga" trim type="number" />
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
  BCard,
  BCardBody,
  BModal,
  BFormGroup,
  // BInputGroup,
  BFormInput,
  // BInputGroupAppend,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

// import ECommerceCheckoutStepCartProducts from './ECommerceCheckoutStepCartProducts.vue'

export default {
  components: {
    // BSV
    BRow,
    BCol,
    BButton,
    BCard,
    BCardBody,
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
      detailHarga: {
        total: 2000,
        diskon: 1000,
        pajak: 0,
        ongkir: 0,
        grandTotal: 0,
      },
      selectHarga: '',
      qty: 0,
      diskon: 0,
      hargaJual: {
        harga: 0,
      },
      detailBarang: {
        nama: null,
        qty: null,
      },
      dataHarga: [],
      dataBarang: [],
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
        },
        {
          label: 'Diskon',
          field: 'diskon',
        },
        {
          label: 'Total',
          field: 'total',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
    }
  },
  computed: {
    ongkir() {
      return this.detailHarga.ongkir
    },
    total() {
      let total = 0
      total = this.rows.reduce(this.sum)
      return total
    },
  },
  watch: {
    ongkir() {
      if (this.detailHarga.ongkir === '') {
        this.detailHarga.ongkir = 0
      } else {
        this.detailHarga.grandTotal =
          parseFloat(this.detailHarga.total) - parseFloat(this.detailHarga.diskon) + parseFloat(this.detailHarga.pajak) + parseFloat(this.detailHarga.ongkir)
      }
    },
  },
  mounted() {
    this.loadDataBarang()
  },
  methods: {
    sum(total, num) {
      return parseFloat(total.total) + parseFloat(num.total)
    },
    resetModal() {
      this.detailHarga.ongkir = 0
      this.detailBarang.qty = 0
      this.selectHarga = ''
      this.hargaJual.harga = 0
      this.qty = 0
    },
    setHarga(id) {
      if (id !== null) {
        this.hargaJual = this.detailBarang.harga.find(d => d.id === id)
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
      const nomor = this.rows.length + 1
      this.rows.push({
        id: nomor,
        kode_barang: this.detailBarang.kode_barang,
        nama_barang: this.detailBarang.nama,
        jumlah: this.qty,
        harga_jual: this.hargaJual.harga,
        diskon: this.diskon,
        total: this.qty * this.hargaJual.harga - this.diskon,
      })
      this.detailHarga.total = this.total
      console.info(this.total)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
    showModal(id) {
      if (id !== null) {
        this.detailBarang = this.dataBarang.find(d => d.id === id)
        this.dataHarga = this.detailBarang.harga
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
          this.dataBarang = data
          return data
        })
      }
      this.dataBarang = this.$store.getters['app-barang/getListBarang']
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
