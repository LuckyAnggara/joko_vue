export default [
  {
    path: '/kepegawaian/peta-kompetensi',
    name: 'peta-kompetensi',
    component: () => import('@/views/admin/pegawai/Detail.vue'),
    meta: {
      pageTitle: 'Data Diri',
      breadcrumb: [
        {
          text: 'Data Diri',
          active: true,
        },
      ],
    },
  },
  {
    path: '/pegawai/data',
    name: 'pegawai-data',
    component: () => import('@/views/admin/pegawai/Daftar.vue'),
    meta: {
      resource: 'data_pegawai',
      pageTitle: 'Pegawai',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
]
