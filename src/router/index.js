import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import dashboard from './routes/dashboard'
import kegiatan from './routes/kegiatan'
import dipa from './routes/dipa'
import laporan from './routes/laporan'
import admin from './routes/admin'
import perjadin from './routes/perjadin'
import kepegawaian from './routes/kepegawaian'
import umum from './routes/umum'
import auth from './routes/auth'

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
    ...kegiatan,
    ...laporan,
    ...dipa,
    ...dashboard,
    ...admin,
    ...perjadin,
    ...kepegawaian,
    ...umum,
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
    return next({ name: 'auth-login ' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

export default router
