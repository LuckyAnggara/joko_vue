<template>
  <section>
    <b-card
      no-body
      class="border-primary"
    >
      <b-card-header
        class="d-flex justify-content-between align-items-center pt-75 pb-25"
      >
        <h5 class="mb-2">
          Harga Jual
        </h5>
        <!-- <b-badge variant="light-primary">
        Basic
      </b-badge> -->
      </b-card-header>

      <b-card-body>
        <div style="position:relative; overflow-y:auto; height:150px">
          <b-list-group
            v-for="(item, index) in dataBarang.harga"
            :key="index"
            flush
          >
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
            >
              <h5>
                {{ index + 1 }} . <b>{{ formatRupiah(item.harga) }} </b> per
                <b>{{ item.nama_satuan }} </b> || catatan : {{ item.catatan }}
              </h5>
              <feather-icon
                size="16"
                icon="XIcon"
                class="cursor-pointer"
                @click="removeItem(index, item.id)"
              />
            </b-list-group-item>
          </b-list-group>
        </div>

        <div class="mt-1">
          <b-button
            v-b-toggle.sidebar-add-harga
            variant="primary"
          >
            Tambah Harga
          </b-button>
        </div>
      </b-card-body>
    </b-card>
  </section>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardBody,
  BButton,
  BListGroup,
  BListGroupItem,
  VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BCard,
    BListGroup,
    BListGroupItem,
    BCardHeader,
    BCardBody,
    BButton,
  },
  props: {
    dataBarang: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatRupiah(value) {
      return `Rp. ${value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    removeItem(index, id) {
      this.$swal({
        title: 'Hapus harga ?',
        text: 'Harga barang akan di hapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          store
            .dispatch('app-barang/removeHarga', {
              id,
            })
            .then(response => {
              if (response.status === 200) {
                // hapus data dari state data
                this.dataBarang.harga.splice(index, 1)
                this.$swal({
                  icon: 'success',
                  title: 'Terhapus!',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              }
            })
            .catch(error => {
              if (error.response.status === 404) {
                this.$swal({
                  title: 'Error!',
                  text: "Oopss there' a problem!",
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            })
        }
      })
    },
  },
}
</script>

<style></style>
