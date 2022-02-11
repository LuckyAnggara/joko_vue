<template>
  <b-card v-if="data" no-body class="card-company-table">
    <b-card-header>
      <h4 class="mb-0">
        Pegawai yang belum menyelesaikan realisasi Perjadin
      </h4>
    </b-card-header>

    <b-table small :items="data" responsive :fields="fields" show-empty empty-text="Tidak ada data" class="mb-0">
      <!-- Nomor -->
      <template #cell(no)="data">
        <div class="d-flex align-items-center">
          {{ data.index + 1 }}
        </div>
      </template>

      <!-- Nama Pegawai -->
      <template #cell(nama_pegawai)="data">
        <div class="d-flex align-items-center">
          <span>{{ data.item.pegawai.nama }}</span>
        </div>
      </template>

      <!-- Tujuan -->
      <template #cell(tujuan)="data">
        <div class="d-flex flex-column">
          <span>{{ data.item.tujuan }}</span>
        </div>
      </template>

      <!-- Tanggal Berangkat -->
      <template #cell(tanggal_berangkat)="data">
        <div class="d-flex flex-column">
          <span>{{ $moment(data.item.anggaran.tanggal_berangkat).format('DD MMMM YYYY') }}</span>
        </div>
      </template>

      <!-- Tanggal Kembali -->
      <template #cell(tanggal_kembali)="data">
        <div class="d-flex flex-column">
          <span>{{ $moment(data.item.anggaran.tanggal_kembali).format('DD MMMM YYYY') }}</span>
        </div>
      </template>
      <!-- sales -->
    </b-table>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BTable } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BTable,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [{ key: 'no' }, { key: 'nama_pegawai' }, { key: 'tujuan' }, { key: 'total_anggaran' }, { key: 'status' }],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
</style>
