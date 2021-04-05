<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="dataBarang.avatar"
            :text="avatarText(dataBarang.nama)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h2 class="mb-0">
                {{ dataBarang.nama }}
              </h2>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'apps-users-edit', params: { id: dataBarang.id } }"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
                @click="del(dataBarang.id)"
              >
                Delete
              </b-button>
            </div>
          </div>
        </div>

        <!-- User Stats -->
        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="DollarSignIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                23.3k
              </h5>
              <small>Penjualan Bulanan</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="TrendingUpIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                $99.87k
              </h5>
              <small>Profit Tahunan</small>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100 table-striped">
          <tr>
            <th class="pb-50">
              <h4 class="font-weight-bold">
                Jenis
              </h4>
            </th>
            <td class="pb-50">
              <h4 class="font-weight-normal">
                {{ dataBarang.nama_jenis }}
              </h4>
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <h4 class="font-weight-bold">
                Merek
              </h4>
            </th>
            <td class="pb-50">
              <h4 class="font-weight-normal">
                {{ dataBarang.nama_merek }}
              </h4>
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <h4 class="font-weight-bold">
                Gudang
              </h4>
            </th>
            <td class="pb-50">
              <h4 class="font-weight-normal">
                {{ dataBarang.nama_gudang }}
              </h4>
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <h4 class="font-weight-bold">
                Rak Penyimpanan
              </h4>
            </th>
            <td class="pb-50">
              <h4 class="font-weight-normal">
                {{ dataBarang.rak }}
              </h4>
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import store from '@/store'

// import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
  },
  props: {
    dataBarang: String,
  },
  setup() {
    // const { resolveUserRoleVariant } = useUsersList()
    return {
      avatarText,
      // resolveUserRoleVariant,
    }
  },
  methods: {
    formatRupiah(value) {
      return `Rp. ${value
        .toFixed(0)
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    del(id) {
      this.$swal({
        title: 'Delete data ?',
        text: 'Data barang akan di hapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          store
            .dispatch('app-barang/removeBarang', {
              id,
            })
            .then(res => {
              if (res.status === 200) {
                // store.commit('app-barang/REMOVE_LIST_BARANG', index)
                this.$swal({
                  icon: 'success',
                  title: 'Deleted!',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
                this.$router.push({
                  name: 'screen-barang',
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
