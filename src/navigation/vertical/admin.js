export default [
  {
    header: 'Admin Keuangan',
  },
  {
    title: 'Anggaran',
    icon: 'ShieldIcon',
    children: [
      {
        title: 'Daftar',
        resource: 'admin_keuangan',
        route: 'mak-daftar',
      },
      {
        title: 'Revisi Anggaran',
        route: 'revisi-anggaran-daftar',
        resource: 'revisi_anggaran',
      },
    ],
  },
]
