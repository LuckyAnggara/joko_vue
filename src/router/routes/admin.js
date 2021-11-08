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
  {
    path: '/pegawai/daftar',
    name: 'pegawai-daftar',
    component: () => import('@/views/admin/pegawai/Daftar.vue'),
    meta: {
      pageTitle: 'Pegawai',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/pegawai/tambah',
    name: 'pegawai-tambah',
    component: () => import('@/views/admin/pegawai/Tambah.vue'),
    meta: {
      pageTitle: 'Pegawai',
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
