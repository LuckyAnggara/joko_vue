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
            :text="avatarText(dataBarang.nama)"
            size="104px"
            rounded
          />
          <div class="d-flex justify-content-center flex-column ml-1">
            <div class="mb-1">
              <h2 class="mb-0">
                {{ dataBarang.nama }}
              </h2>
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
                Saldo Terakhir (Qty)
              </h4>
            </th>
            <td class="pb-50">
              <h4 class="font-weight-normal">
                {{ dataBarang.saldo_akhir }}
              </h4>
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <h4 class="font-weight-bold">
                Saldo Terakhir (Rp.)
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
                Klasifikasi Akun
              </h4>
            </th>
            <td class="pb-50">
              <h4 class="font-weight-normal">
                Persediaan
              </h4>
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <h4 class="font-weight-bold">
                Nomor Akun
              </h4>
            </th>
            <td class="pb-50">
              <h4 class="font-weight-normal">
                4-1005-22
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
  BCard, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
  },
  props: {
    dataBarang: Object,
  },
  setup() {
    return {
      avatarText,
    }
  },
  created() {
    console.info(this.dataBarang)
  },
  methods: {
    formatRupiah(value) {
      return `Rp. ${value
        .toFixed(0)
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
  },
}
</script>

<style></style>
