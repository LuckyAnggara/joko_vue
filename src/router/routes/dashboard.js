export default [
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  },
  {
    path: '/dashboard/ecommerce',
    name: 'dashboard-ecommerce',
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
  },
  {
    path: '/dashboard/user',
    name: 'dashboard-user',
    component: () => import('@/views/dashboard/user/Dashboard.vue'),
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/kwitansi',
    name: 'print-kwitansi',
    component: () => import('@/views/print/Kwitansi2.vue'),
    meta: {
      layout: 'full',
    },
  },
]
