export default [
  {
    path: '/rkt/daftar',
    name: 'rkt-daftar',
    component: () => import('@/views/rkt/Daftar.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Rencana Kerja Tahunan',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/master/area',
    name: 'master-area',
    component: () => import('@/views/admin/area/Daftar.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Master Area',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/master/rkt',
    name: 'master-rkt',
    component: () => import('@/views/admin/rkt/Daftar.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Master Rencana Kerja Tahunan',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
]
