export default [
  {
    path: '/dipa/daftar',
    name: 'dipa-daftar',
    component: () => import('@/views/dipa/Daftar.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'DIPA',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/dipa/detail',
    name: 'dipa-detail',
    component: () => import('@/views/dipa/Detail.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'DIPA',
      breadcrumb: [
        {
          text: 'Daftar',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
