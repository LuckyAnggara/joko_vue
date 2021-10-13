export default [
  {
    header: 'User',
  },
  {
    title: 'Kegiatan',
    icon: 'ShieldIcon',
    children: [
      {
        title: 'Daftar',
        route: 'kegiatan-daftar',
      },
      {
        title: 'Tambah',
        route: 'kegiatan-tambah',
      },
    ],
  },
  {
    title: 'Laporan',
    icon: 'ShieldIcon',
    children: [
      {
        title: 'Laporan Rincian',
        route: 'laporan-rincian',
      },
      {
        title: 'Laporan Global',
      },
    ],
  },
]
