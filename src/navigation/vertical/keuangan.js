export default [
  {
    header: 'Keuangan',
  },
  {
    title: 'Akuntansi',
    icon: 'HomeIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Daftar Akun',
        route: 'akuntansi-akun-daftar',
      },
      {
        title: 'Jurnal',
        route: 'akuntansi-jurnal-daftar',
      },

      {
        title: 'Neraca',
        route: 'akuntansi-neraca',
      },
    ],
  },
]
