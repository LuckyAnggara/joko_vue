export default [
  {
    path: '/laporan/rincian',
    name: 'laporan-rincian',
    component: () => import('@/views/laporan/Rincian.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Laporan',
      breadcrumb: [
        {
          text: 'Rincian',
          active: true,
        },
      ],
    },
  },
]
