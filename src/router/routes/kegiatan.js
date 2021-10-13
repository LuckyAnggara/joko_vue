export default [
  {
    path: '/kegiatan/daftar',
    name: 'kegiatan-daftar',
    component: () => import('@/views/kegiatan/Daftar.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Kegiatan',
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
      pageTitle: 'Kegiatan',
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
    path: '/kegiatan/detail?:id',
    name: 'kegiatan-detail',
    component: () => import('@/views/kegiatan/Detail.vue'),
    meta: {
      pageTitle: 'Kegiatan',
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
