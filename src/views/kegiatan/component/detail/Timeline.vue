<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Log Timeline" footer-tag="footer">
        <b-card-body><log-timeline /> </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ data.user.pegawai.nama }} - {{ data.bidang.nama }} at <strong>{{ $moment(data.created_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BCard, BCardBody, BRow, BCol } from 'bootstrap-vue'
import LogTimeline from '../LogTimeline.vue'

export default {
  components: {
    BCard,
    BCardBody,
    BRow,
    BCol,
    LogTimeline,
  },
  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
  },
  methods: {
    log() {
      this.$store.commit('app-kegiatan/SET_LOG', this.data.log)
    },
  },
  mounted() {
    this.log()
  },
}
</script>
