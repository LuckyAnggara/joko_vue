export default [
  {
    path: '/transaksi/penjualan',
    name: 'transaksi-penjualan',
    component: () => import('@/views/transaksi/penjualan2/Penjualan.vue'),
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
]
