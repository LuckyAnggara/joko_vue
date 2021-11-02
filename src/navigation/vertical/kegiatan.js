export default [
  {
    header: 'Layanan Keuangan',
  },
  {
    title: 'Kegiatan',
    icon: 'ShieldIcon',
    route: 'kegiatan-daftar',
  },
  {
    title: 'Perjalanan Dinas',
    icon: 'ShieldIcon',
    route: 'perjadin-daftar',
  },
  {
    title: 'DIPA',
    icon: 'ShieldIcon',
    route: 'dipa-daftar',
  },

  {
    title: 'Laporan',
    icon: 'ShieldIcon',
    children: [
      {
        title: 'Realisasi Kegiatan',
        route: 'laporan-rincian',
      },
    ],
  },
]
