export default [
  {
    path: '/persediaan/barang',
    name: 'barang-daftar',
    component: () => import('@/views/persediaan/barang/Daftar.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Barang',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/persediaan/barang/tambah',
    name: 'barang-tambah',
    component: () => import('@/views/persediaan/barang/Tambah.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Barang',
      breadcrumb: [
        {
          text: 'Daftar',
        },
        {
          text: 'Tambah',
          active: true,
        },
      ],
    },
  },
  {
    path: '/persediaan/barang/detail',
    name: 'barang-detail',
    component: () => import('@/views/persediaan/barang/Detail.vue'),
    meta: {
      // resource: 'ACL',
      pageTitle: 'Barang',
      breadcrumb: [
        {
          text: 'Daftar',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
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
