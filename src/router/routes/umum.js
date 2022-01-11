export default [
  {
    path: '/persediaan/barang',
    name: 'barang-daftar',
    component: () => import('@/views/persediaan/barang/Daftar.vue'),
    meta: {
      resource: 'admin_umum',
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
      resource: 'admin_umum',
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
      resource: 'admin_umum',
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
    path: '/persediaan/pembelian/tambah',
    name: 'pembelian-tambah',
    component: () => import('@/views/persediaan/pembelian/Tambah.vue'),
    meta: {
      resource: 'admin_umum',
      pageTitle: 'Pembelian',
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
    path: '/persediaan/pembelian/daftar',
    name: 'pembelian-daftar',
    component: () => import('@/views/persediaan/pembelian/Daftar.vue'),
    meta: {
      resource: 'admin_umum',
      pageTitle: 'Pembelian',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/persediaan/pembelian/detail',
    name: 'pembelian-detail',
    component: () => import('@/views/persediaan/pembelian/Detail.vue'),
    meta: {
      resource: 'admin_umum',
      pageTitle: 'Pembelian',
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
    path: '/persediaan/permintaan/daftar',
    name: 'permintaan-persediaan-daftar',
    component: () => import('@/views/persediaan/permintaan/Daftar.vue'),
    meta: {
      resource: 'permintaan_persediaan',
      pageTitle: 'Permintaan Persediaan',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/persediaan/permintaan/tambah',
    name: 'permintaan-persediaan-tambah',
    component: () => import('@/views/persediaan/permintaan/Tambah.vue'),
    meta: {
      resource: 'permintaan_persediaan',
      pageTitle: 'Permintaan Persediaan',
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
    path: '/persediaan/permintaan/detail',
    name: 'permintaan-persediaan-detail',
    component: () => import('@/views/persediaan/permintaan/Detail.vue'),
    meta: {
      resource: 'permintaan_persediaan',
      pageTitle: 'Permintaan Persediaan',
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
    path: '/bmn/kendaraandinas/',
    name: 'bmn-kendaraan-dinas',
    component: () => import('@/views/bmn/kendaraandinas/Daftar.vue'),
    meta: {
      resource: 'admin_umum',
      pageTitle: 'Kendaraan Dinas',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/umum/perawatan/',
    name: 'perawatan',
    component: () => import('@/views/perawatan/Daftar.vue'),
    meta: {
      resource: 'user',
      pageTitle: 'Perawatan',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/umum/perawatan/tambah',
    name: 'perawatan-tambah',
    component: () => import('@/views/perawatan/Tambah.vue'),
    meta: {
      resource: 'user',
      pageTitle: 'Perawatan',
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
    path: '/service',
    name: 'service',
    component: () => import('@/views/pages/authentication/ComingSoon.vue'),
    meta: {
      resource: 'user',
      // pageTitle: 'Data Diri',
      // breadcrumb: [
      //   {
      //     text: 'Data Diri',
      //     active: true,
      //   },
      // ],
    },
  },
]
