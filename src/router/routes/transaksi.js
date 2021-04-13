export default [
  {
    path: '/transaksi/penjualan/daftar',
    name: 'transaksi-penjualan-daftar',
    component: () => import('@/views/transaksi/penjualan/Daftar.vue'),
    meta: {
      pageTitle: 'Transaksi',
      breadcrumb: [
        {
          text: 'Penjualan',
        },
        {
          text: 'Daftar',
          active: true,
        },
      ],
    },
  },
  {
    path: '/transaksi/penjualan/draft',
    name: 'transaksi-penjualan-draft',
    component: () => import('@/views/transaksi/penjualan/DaftarDraft.vue'),
    meta: {
      pageTitle: 'Transaksi',
      breadcrumb: [
        {
          text: 'Penjualan',
        },
        {
          text: 'Draft',
          active: true,
        },
      ],
    },
  },
  {
    path: '/transaksi/penjualan/tambah',
    name: 'transaksi-penjualan-tambah',
    component: () => import('@/views/transaksi/penjualan/Penjualan.vue'),
    meta: {
      pageTitle: 'Penjualan',
      breadcrumb: [
        {
          text: 'Transaksi',
        },
        {
          text: 'Penjualan',
          active: true,
        },
      ],
    },
  },
  {
    path: '/transaksi/invoice',
    name: 'transaksi-penjualan-invoice',
    component: () => import('@/views/transaksi/invoice/InvoicePreview.vue'),
    meta: {
      pageTitle: 'Penjualan',
      breadcrumb: [
        {
          text: 'Transaksi',
        },
        {
          text: 'Invoice',
          active: true,
        },
      ],
    },
  },
]
