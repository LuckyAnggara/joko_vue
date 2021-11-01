<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Log Timeline" footer-tag="footer">
        <b-card-body><log-timeline /> </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
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
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
  },
  methods: {
    log() {
      this.$store.commit('app-perjadin/SET_LOG', this.form.log)
    },
  },
  mounted() {
    this.log()
  },
}
</script>
