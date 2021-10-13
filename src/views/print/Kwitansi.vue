<template>
  <section>
    <b-row class="mt-2">
      <b-card title="Card Title" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-row>
  </section>
</template>

<script>
import { BCard, BCardText, BRow } from 'bootstrap-vue'

export default {
  components: {
    BCardText,
    BCard,
    BRow,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
