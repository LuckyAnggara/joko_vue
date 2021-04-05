<template>
  <!-- <b-row class="match-height"> -->
  <b-form
    autocomplete="off"
    @submit.prevent
    @submit="store"
  >
    <b-row>
      <b-col lg="9">
        <b-card>
          <form-data ref="info" />
          <form-satuan-jual ref="harga" />
        </b-card>
      </b-col>
      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        class="invoice-actions mt-md-0 mt-2"
      >
        <!-- Action Buttons -->
        <b-card>
          <!-- Button: Send Invoice -->
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mb-75"
            block
            type="submit"
          >
            Submit
          </b-button>

          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="mb-75"
            type="reset"
            block
          >
            Reset
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BForm, BCard, BRow, BCol, BButton,
} from 'bootstrap-vue'
// import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import FormData from './FormData.vue'
import FormSatuanJual from './FormSatuanJual.vue'

export default {
  components: {
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    FormData,
    FormSatuanJual,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      form: [],
      harga: [],
    }
  },
  methods: {
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Data has been created!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      this.$router.push({
        name: 'screen-barang',
      })
    },
    error() {
      this.$swal({
        title: 'Error!',
        text: "Oopss there' a problem!",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    store() {
      this.form = this.$refs.info.form
      this.form.harga = this.$refs.harga.harga
      store.dispatch('app-barang/addBarang', this.form).then(res => {
        if (res.status === 200) {
          store.commit('app-barang/UPDATE_LIST_BARANG', res.data)
          this.success()
        } else {
          this.error()
        }
      })
    },
  },
}
</script>
