export default [
  {
    path: '/mak/daftar',
    name: 'mak-daftar',
    component: () => import('@/views/mak/Daftar.vue'),
    meta: {
      resource: 'admin_keuangan',
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
      resource: 'admin_keuangan',
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
    path: '/mak/detail',
    name: 'mak-detail',
    component: () => import('@/views/mak/Detail.vue'),
    meta: {
      resource: 'admin_keuangan',
      pageTitle: 'Mata Anggaran Kegiatan',
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
    path: '/revisi-anggaran/daftar',
    name: 'revisi-anggaran-daftar',
    component: () => import('@/views/mak/revisi/Daftar.vue'),
    meta: {
      resource: 'revisi_anggaran',
      pageTitle: 'Revisi Anggaran',
      breadcrumb: [
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/revisi-anggaran/detail',
    name: 'revisi-anggaran-detail',
    component: () => import('@/views/mak/revisi/Detail.vue'),
    meta: {
      resource: 'revisi_anggaran',
      pageTitle: 'Detail Revisi Anggaran',
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
    path: '/revisi-anggaran/detail/revisi',
    name: 'revisi-anggaran-detail-revisi',
    component: () => import('@/views/mak/revisi/DetailRevisi.vue'),
    meta: {
      resource: 'revisi_anggaran',
      pageTitle: 'Detail Revisi Anggaran',
      breadcrumb: [
        {
          text: 'Daftar',
        },
        {
          text: 'Detail',
        },
        {
          text: 'Revisi',
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
      resource: 'admin_kepegawaian',
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
  {
    path: '/pegawai/detail',
    name: 'pegawai-detail',
    component: () => import('@/views/admin/pegawai/Detail.vue'),
    meta: {
      resource: 'user',
      pageTitle: 'Pegawai',
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
]
