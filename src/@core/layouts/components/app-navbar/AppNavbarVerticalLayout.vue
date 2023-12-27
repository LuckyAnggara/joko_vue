<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <b-navbar-nav class="nav align-items-center">
      <!-- <p class="ml-2 user-name font-weight-bolder mb-0">Selamat Datang {{ userData.role !== 'USER' ? '' : 'di ' + userData.bidang.nama }}</p> -->
    </b-navbar-nav>
    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <locale /> -->
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <search-bar /> -->
      <!-- <cart-dropdown /> -->
      <!-- <notification-dropdown /> -->
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import { BLink, BNavbarNav } from 'bootstrap-vue'
import DarkToggler from './components/DarkToggler.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,
    BNavbarNav,
    DarkToggler,
    UserDropdown,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    userData() {
      return JSON.parse(localStorage.getItem('userData'))
    },
  },
}
</script>
