export default [
  {
    header: 'Transaksi',
  },
  {
    title: 'Penjualan',
    icon: 'HomeIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Daftar',
        route: 'transaksi-penjualan-daftar',
      },
      {
        title: 'Transaksi Baru',
        route: 'transaksi-penjualan-tambah',
      },
      {
        title: 'Draft Transaksi',
        route: 'transaksi-penjualan-draft',
      },
    ],
  },
  {
    title: 'Pembelian',
    icon: 'HomeIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Daftar',
        route: 'transaksi-pembelian-daftar',
      },
      {
        title: 'Transaksi Baru',
        route: 'transaksi-pembelian-tambah',
      },
      {
        title: 'Draft Transaksi',
        route: 'transaksi-pembelian-draft',
      },
    ],
  },
]
