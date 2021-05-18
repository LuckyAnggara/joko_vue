import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
// import apps from './routes/apps'
import dashboard from './routes/dashboard'
import keuangan from './routes/keuangan'
import transaksi from './routes/transaksi'
import auth from './routes/auth'
// import uiElements from './routes/ui-elements/index'
// import pages from './routes/pages'
// import chartsMaps from './routes/charts-maps'
// import formsTable from './routes/forms-tables'
// import others from './routes/others'
import master from './routes/master'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard-ecommerce' } },
    ...auth,
    ...master,
    ...transaksi,
    ...keuangan,
    ...dashboard,
    // ...apps,
    // ...pages,
    // ...chartsMaps,
    // ...formsTable,
    // ...uiElements,
    // ...others,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })
    // If logged in => not authorized
    return next({ name: 'master-barang' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

export default router
