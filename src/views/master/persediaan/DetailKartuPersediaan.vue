<template>
  <section>
    <template>
      <b-card>
        <kartu-persediaan :data-persediaan="dataPersediaan" :id="id" />
      </b-card>
    </template>
  </section>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { BCard } from 'bootstrap-vue'
import KartuPersediaan from './component/KartuPersediaan.vue'

export default {
  components: {
    BCard,
    KartuPersediaan,
  },
  data() {
    return {
      dataPersediaan: [],
    }
  },
  computed: {
    dataBarang() {
      if (!this.data) return null
      return this.data
    },
    id() {
      return router.currentRoute.params.id
    },
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const { id } = router.currentRoute.params
      store.dispatch('app-persediaan/fetchKartuPersediaan', { id }).then(res => {
        store.commit('app-persediaan/SET_KARTU_PERSEDIAAN', res.data)
        this.dataPersediaan = store.getters['app-persediaan/getKartuPersediaan']
      })
    },
  },
}
</script>
