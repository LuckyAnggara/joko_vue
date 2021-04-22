export default [
  {
    path: '/keuangan/jurnal/daftar',
    name: 'keuangan-jurnal-daftar',
    component: () => import('@/views/keuangan/jurnal/Daftar.vue'),
    meta: {
      pageTitle: 'Keuangan',
      breadcrumb: [
        {
          text: 'Jurnal',
        },
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keuangan/ledger/',
    name: 'keuangan-ledger',
    component: () => import('@/views/keuangan/ledger/Daftar.vue'),
    meta: {
      pageTitle: 'Keuangan',
      breadcrumb: [
        {
          text: 'Ledger',
        },
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
]
