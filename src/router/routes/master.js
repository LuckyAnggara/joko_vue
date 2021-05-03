export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/master/barang/tambah',
    name: 'master-barang-tambah',
    component: () => import('@/views/master/barang/Tambah/Tambah.vue'),
    meta: {
      resource: 'ACL',
      pageTitle: 'Tambah',
      breadcrumb: [
        {
          text: 'Barang',
          to: '/master/barang/',
        },
        {
          text: 'Tambah',
          active: true,
        },
      ],
    },
  },
  {
    path: '/master/barang/',
    name: 'master-barang',
    component: () => import('@/views/master/barang/Daftar.vue'),
    meta: {
      resource: 'ACL',
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          active: true,
          text: 'Barang',
          to: '/master/barang/',
        },
      ],
    },
  },
  {
    path: '/master/barang/detail/:id',
    name: 'master-barang-detail',
    component: () => import('@/views/master/barang/Detail/Detail.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          text: 'Barang',
          to: '/master/barang/',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/master/kontak/',
    name: 'master-kontak',
    component: () => import('@/views/master/kontak/Daftar.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          active: true,
          text: 'Kontak',
          to: '/master/kontak/',
        },
      ],
    },
  },
  {
    path: '/master/kontak/tambah',
    name: 'master-kontak-tambah',
    component: () => import('@/views/master/kontak/Tambah/Tambah.vue'),
    meta: {
      pageTitle: 'Tambah',
      breadcrumb: [
        {
          text: 'Kontak',
          to: '/master/kontak/',
        },
        {
          text: 'Tambah',
          active: true,
        },
      ],
    },
  },
  {
    path: '/master/persediaan/',
    name: 'master-persediaan',
    component: () => import('@/views/master/persediaan/Daftar.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          active: true,
          text: 'Persediaan',
          to: '/master/persediaan/',
        },
      ],
    },
  },
  {
    path: '/master/persediaan/detail/:id',
    name: 'master-persediaan-detail',
    component: () => import('@/views/master/persediaan/Detail.vue'),
    meta: {
      pageTitle: 'Daftar',
      breadcrumb: [
        {
          text: 'Persediaan',
          to: '/master/persediaan/',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
