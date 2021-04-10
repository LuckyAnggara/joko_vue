export default [
  {
    path: '/transaksi/penjualan',
    name: 'transaksi-penjualan',
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
