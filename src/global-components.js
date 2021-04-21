import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import Loading from 'vue-loading-overlay'
import VueMoment from 'vue-moment'

Vue.use(Loading, {
  // props
  color: 'red',
})
Vue.use(VueMoment)
Vue.component(FeatherIcon.name, FeatherIcon)
