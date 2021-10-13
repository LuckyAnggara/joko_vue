import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import Loading from 'vue-loading-overlay'
import VueMoment from 'vue-moment'
import BOverlay from 'bootstrap-vue'

Vue.use(Loading, {
  // props
  canCancel: true,
  color: '#000000',
  loader: 'bars',
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
  zIndex: 999,
  lockScroll: true,
  enforceFocus: true,
})
Vue.use(VueMoment)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('BOverlay', BOverlay)
