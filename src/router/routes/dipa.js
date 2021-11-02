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
]
