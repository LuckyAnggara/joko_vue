export default [
  {
    header: 'Etc',
    resource: 'user',
  },
  {
    title: 'Laporan',
    icon: 'ShieldIcon',
    children: [
      {
        resource: 'user',
        title: 'Realisasi Kegiatan',
        route: 'laporan-rincian',
      },
    ],
  },
  {
    title: 'DIPA',
    icon: 'ShieldIcon',
    route: 'dipa-daftar',
    resource: 'mak',
  },
]
