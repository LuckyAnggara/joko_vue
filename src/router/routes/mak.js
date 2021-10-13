export default [
  {
    path: '/mak/daftar',
    name: 'mak-daftar',
    component: () => import('@/views/mak/Daftar.vue'),
    meta: {
      pageTitle: 'Mata Anggaran Kegiatan',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/mak/tambah',
    name: 'mak-tambah',
    component: () => import('@/views/mak/Tambah.vue'),
    meta: {
      pageTitle: 'Mata Anggaran Kegiatan',
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
]
