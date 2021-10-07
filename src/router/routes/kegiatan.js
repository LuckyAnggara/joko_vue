export default [
  {
    path: '/kegiatan/daftar',
    name: 'kegiatan-daftar',
    component: () => import('@/views/kegiatan/Daftar.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Realisasi Kegiatan',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kegiatan/tambah',
    name: 'kegiatan-tambah',
    component: () => import('@/views/kegiatan/Tambah.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Tambah Kegiatan',
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
