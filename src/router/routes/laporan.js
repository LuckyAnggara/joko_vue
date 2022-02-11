export default [
  // {
  //   path: '/laporan/rincian',
  //   name: 'laporan-rincian',
  //   component: () => import('@/views/laporan/anggaran/Rincian.vue'),
  //   meta: {
  //     // resource: 'ACL',
  //     pageTitle: 'Laporan',
  //     breadcrumb: [
  //       {
  //         text: 'Rincian',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: '/laporan/anggaran/daftar',
    name: 'laporan-anggaran-daftar',
    component: () => import('@/views/laporan/anggaran/Daftar.vue'),
    meta: {
      resource: 'user',
      pageTitle: 'Laporan',
      breadcrumb: [
        {
          text: 'Anggaran',
          active: true,
        },
      ],
    },
  },
  {
    path: '/laporan/anggaran/detail',
    name: 'laporan-anggaran-detail',
    component: () => import('@/views/laporan/anggaran/Detail.vue'),
    meta: {
      resource: 'user',
      pageTitle: 'Laporan',
      breadcrumb: [
        {
          text: 'Anggaran',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },

  {
    path: '/laporan/kegiata/rencana/daftar',
    name: 'laporan-kegiatan-rencana-daftar',
    component: () => import('@/views/laporan/rencanakegiatan/Daftar.vue'),
    meta: {
      resource: 'user',
      pageTitle: 'Laporan',
      breadcrumb: [
        {
          text: 'Kegiatan',
        },
        {
          text: 'Rencana',
          active: true,
        },
      ],
    },
  },
  {
    path: '/laporan/kegiata/realisasi/daftar',
    name: 'laporan-kegiatan-realisasi-daftar',
    component: () => import('@/views/laporan/realisasikegiatan/Daftar.vue'),
    meta: {
      resource: 'user',
      pageTitle: 'Laporan',
      breadcrumb: [
        {
          text: 'Kegiatan',
        },
        {
          text: 'Realisasi',
          active: true,
        },
      ],
    },
  },
]
