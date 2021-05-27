export default [
  {
    path: '/kepegawaian/daftar',
    name: 'kepegawaian-daftar',
    component: () => import('@/views/kepegawaian/Daftar.vue'),
    meta: {
      resource: 'ACL',
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
