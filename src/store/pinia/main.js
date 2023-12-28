import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    limitDataOptions: [5, 50, 100, 100000],
    tahunOptions: [2023, 2024, 2025],
    bulanOptions: [
      { id: 1, label: 'Januari' },
      { id: 2, label: 'Februari' },
      { id: 3, label: 'Maret' },
      { id: 4, label: 'April' },
      { id: 5, label: 'Mei' },
      { id: 6, label: 'Juni' },
      { id: 7, label: 'Juli' },
      { id: 8, label: 'Agustus' },
      { id: 9, label: 'September' },
      { id: 10, label: 'Oktober' },
      { id: 11, label: 'November' },
      { id: 12, label: 'Desember' },
    ],
    jenisKegiatanOptions: [
      'RAPAT INTERNAL',
      'RAPAT EKSTERNAL',
      'FORUM GROUP DISCUSION',
      'DINAS LUAR',
      'KOORDINASI',
      'KONSINYERING',
      'SOSIALISASI',
      'FASILITASI KEGIATAN',
      'HELPDESK TI',
    ],
    jenisMediaOptions: ['SOSIAL MEDIA', 'WEBSITE'],
    jenisKegiatanArsipOptions: ['PENGARSIPAN', 'PEMUSNAHAN'],
    jenisPengawasanOptions: ['AUDIT', 'AUDIT TUJUAN TERTENTU / KHUSUS', 'REVIU', 'PEMANTAUAN / MONITORING', 'EVALUASI', 'PENGAWASAN LAINNYA'],
    eselonOptions: ['ESELON I', 'ESELON II'],
  }),
  actions: {},
})
