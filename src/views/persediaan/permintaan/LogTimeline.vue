<template>
  <app-timeline>
    <!-- <app-timeline-item v-for="log in logs" :key="log.id" :title="log.status" :subtitle="log.keterangan.toLowerCase()" :time="log.ago" :variant="random()"> -->
    <app-timeline-item v-for="log in logs" :key="log.id" :variant="random()">
      <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
        <h6>{{ log.status }}</h6>
        <small class="text-muted">{{ log.ago }}</small>
      </div>
      <p>{{ log.keterangan.toLowerCase() }}</p>
      <template v-if="log.catatan === null ? false : true">
        <b-button v-b-toggle="`catatan-${log.id}`" v-ripple.400="'rgba(113, 102, 240, 0.15)'" size="sm" variant="outline-primary">
          Catatan
        </b-button>
        <b-collapse class="mt-1" :id="`catatan-${log.id}`">
          <small
            ><b
              ><i>{{ log.pegawai.nama }}</i></b
            >
            - {{ log.catatan }}
          </small>
        </b-collapse>
      </template>
    </app-timeline-item>
  </app-timeline>
</template>

<script>
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import { VBToggle, BCollapse, BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BCollapse,
    AppTimeline,
    AppTimelineItem,
  },
  directives: { 'b-toggle': VBToggle, Ripple },
  methods: {
    random() {
      const b = Math.floor(Math.random() * 5)
      const color = ['primary', 'danger', 'warning', 'success', 'secondary', 'info']
      return color[b]
    },
  },

  computed: {
    logs() {
      return this.$store.getters['app-barang/getPermintaanLog']
    },
  },
}
</script>
