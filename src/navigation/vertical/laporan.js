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
      {
        title: 'Rencana Kegiatan',
        icon: 'ShieldIcon',
        route: 'laporan-kegiatan-rencana-daftar',
        resource: 'user',
      },
      {
        title: 'Realisasi Kegiatan',
        icon: 'ShieldIcon',
        route: 'laporan-kegiatan-realisasi-daftar',
        resource: 'user',
      },
    ],
    route: 'laporan-rincian',
  },
]
