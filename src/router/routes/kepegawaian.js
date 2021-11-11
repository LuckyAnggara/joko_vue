export default [
  {
    path: '/kepegawaian/peta-kompetensi',
    name: 'peta-kompetensi',
    component: () => import('@/views/admin/pegawai/Detail.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Data Diri',
      breadcrumb: [
        {
          text: 'Data Diri',
          active: true,
        },
      ],
    },
  },
]
