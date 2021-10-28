<template>
  <b-modal
    id="modal-log"
    scrollable
    hide-backdrop
    ok-only
    no-close-on-backdrop
    content-class="shadow"
    title="Log Pengajuan Perjadin"
    ok-variant="danger"
    ok-title="Tutup"
    lazy
  >
    <app-timeline>
      <app-timeline-item v-for="log in logs" :key="log.id" :title="log.status" :subtitle="log.keterangan.toLowerCase()" :time="log.ago" :variant="random()" />
    </app-timeline>
  </b-modal>
</template>

<script>
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import { BModal } from 'bootstrap-vue'
// import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    AppTimeline,
    AppTimelineItem,
  },
  methods: {
    random() {
      const b = Math.floor(Math.random() * 5)
      const color = ['primary', 'danger', 'warning', 'success', 'secondary', 'info']
      return color[b]
    },
  },
  mounted() {
    console.info(this.logs)
  },
  computed: {
    logs() {
      return this.$store.getters['app-perjadin/getLog']
    },
  },
}
</script>
