export default [
  {
    header: 'Etc',
    resource: 'user',
  },
  {
    title: 'Laporan',
    icon: 'ShieldIcon',
    resource: 'user',
    children: [
      {
        title: 'Anggaran',
        icon: 'ShieldIcon',
        route: 'laporan-anggaran-daftar',
        resource: 'user',
      },
    ],
    route: 'laporan-rincian',
  },
]
