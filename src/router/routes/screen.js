export default [
  {
    path: '/screen/barang/tambah',
    name: 'screen-barang-tambah',
    component: () => import('@/views/screens/barang/Tambah/Tambah.vue'),
    meta: {
      pageTitle: 'Tambah',
      breadcrumb: [
        {
          text: 'Barang',
          to: '/screen/barang/',
        },
        {
          text: 'Tambah',
          active: true,
        },
      ],
    },
  },
  {
    path: '/screen/barang/',
    name: 'screen-barang',
    component: () => import('@/views/screens/barang/Daftar.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          active: true,
          text: 'Barang',
          to: '/screen/barang/',
        },
      ],
    },
  },
  {
    path: '/screen/barang/detail/:id',
    name: 'screen-barang-detail',
    component: () => import('@/views/screens/barang/Detail/Detail.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          text: 'Barang',
          to: '/screen/barang/',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/screen/kontak/',
    name: 'screen-kontak',
    component: () => import('@/views/screens/kontak/Daftar.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          active: true,
          text: 'Kontak',
          to: '/screen/kontak/',
        },
      ],
    },
  },
  {
    path: '/screen/kontak/tambah',
    name: 'screen-kontak-tambah',
    component: () => import('@/views/screens/kontak/Tambah/Tambah.vue'),
    meta: {
      pageTitle: 'Tambah',
      breadcrumb: [
        {
          text: 'Kontak',
          to: '/screen/kontak/',
        },
        {
          text: 'Tambah',
          active: true,
        },
      ],
    },
  },
  {
    path: '/screen/persediaan/',
    name: 'screen-persediaan',
    component: () => import('@/views/screens/persediaan/Daftar.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          active: true,
          text: 'Persediaan',
          to: '/screen/persediaan/',
        },
      ],
    },
  },
  {
    path: '/screen/persediaan/detail/:id',
    name: 'screen-persediaan-detail',
    component: () => import('@/views/screens/persediaan/Detail.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          text: 'Persediaan',
          to: '/screen/persediaan/',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
