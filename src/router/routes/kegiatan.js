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
    path: '/kegiatan/rencana',
    name: 'kegiatan-rencana',
    component: () => import('@/views/kegiatan/TambahRencana.vue'),
    meta: {
      pageTitle: 'Kegiatan',
      breadcrumb: [
        {
          text: 'Daftar',
        },
        {
          text: 'Rencana Kegiatan',
          active: true,
        },
        {
          text: 'Tambah Data',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kegiatan/detail',
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
