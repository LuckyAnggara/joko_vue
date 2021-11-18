export default [
  {
    path: '/perjadin/daftar',
    name: 'perjadin-daftar',
    component: () => import('@/views/perjadin/Daftar.vue'),
    meta: {
      resource: 'perjadin',
      pageTitle: 'Perjadin',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/perjadin/tambah',
    name: 'perjadin-tambah',
    component: () => import('@/views/perjadin/Tambah.vue'),
    meta: {
      resource: 'perjadin',
      pageTitle: 'Perjadin',
      breadcrumb: [
        {
          text: 'Daftar',
        },
        {
          text: 'Tambah Data',
          active: true,
        },
      ],
    },
  },
  {
    path: '/perjadin/detail/',
    name: 'perjadin-detail',
    component: () => import('@/views/perjadin/Detail.vue'),
    meta: {
      resource: 'perjadin',
      pageTitle: 'Perjadin',
      breadcrumb: [
        {
          text: 'Daftar',
        },
        {
          text: 'Detail Data',
          active: true,
        },
      ],
    },
  },
]
