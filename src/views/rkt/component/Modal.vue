<template> </template>

<script>
import { BModal, VBModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
}
</script>
