/* =========================================================
   config.js — PENGATURAN UJIAN EKONOMI KELAS XII
   Versi A
   ========================================================= */

const EXAM_DURATION_MINUTES = 20;
const WARNING_THRESHOLD_SECONDS = 60;

const CLASS_OPTIONS = ["XII.1", "XII.2", "XII.3", "XII.4", "XII.5", "XII.6", "XII.7", "XII.8", "XII.9", "XII.10", "XII.11"];

const questions = [
  {
    "q": "APBD ditetapkan melalui persetujuan bersama antara pemerintah daerah dengan...",
    "options": [
      "Kementerian Keuangan",
      "BPK",
      "DPRD",
      "Bank Indonesia",
      "DPR RI"
    ],
    "answer": 2,
    "topic": "APBD",
    "explanation": "APBD adalah anggaran pendapatan dan belanja daerah. Rancangan APBD dibahas dan ditetapkan melalui persetujuan bersama pemerintah daerah dan DPRD."
  },
  {
    "q": "Pemerintah mengenakan tarif impor terhadap suatu barang untuk melindungi produsen dalam negeri. Kebijakan tersebut merupakan bentuk...",
    "options": [
      "Deregulasi pajak",
      "Devaluasi mata uang",
      "Subsidi ekspor",
      "Liberalisasi perdagangan",
      "Proteksi perdagangan"
    ],
    "answer": 4,
    "topic": "Ekonomi Internasional",
    "explanation": "Tarif impor adalah pungutan atas barang yang masuk dari luar negeri. Tarif merupakan instrumen proteksi karena dapat membuat barang impor lebih mahal dan memberi perlindungan relatif kepada produsen dalam negeri."
  },
  {
    "q": "Perhatikan indikator berikut: peningkatan kualitas pendidikan, perbaikan layanan kesehatan, dan meningkatnya kesempatan kerja. Indikator tersebut lebih tepat digunakan untuk menilai...",
    "options": [
      "Perdagangan internasional",
      "Pertumbuhan ekonomi semata",
      "Kebijakan moneter",
      "Neraca perdagangan",
      "Pembangunan ekonomi"
    ],
    "answer": 4,
    "topic": "Pembangunan Ekonomi",
    "explanation": "Pembangunan ekonomi tidak hanya mengejar kenaikan output, tetapi juga perubahan kualitas hidup. Pendidikan, kesehatan, kesempatan kerja, dan kesejahteraan merupakan indikator penting pembangunan."
  },
  {
    "q": "Contoh kegiatan yang paling mencerminkan penerapan ekonomi digital adalah...",
    "options": [
      "Barter antarpedagang di pasar tradisional",
      "Penggunaan uang logam untuk semua transaksi",
      "Distribusi barang tanpa menggunakan teknologi",
      "Pembayaran dan transaksi jual beli melalui platform digital",
      "Pencatatan usaha hanya dalam buku tulis"
    ],
    "answer": 3,
    "topic": "Ekonomi Digital",
    "explanation": "Ekonomi digital memanfaatkan teknologi digital dalam aktivitas ekonomi, misalnya marketplace, pembayaran digital, perbankan digital, dan layanan berbasis platform."
  },
  {
    "q": "Pajak berbeda dari pungutan yang memberikan imbalan langsung kepada pembayar karena pajak pada dasarnya...",
    "options": [
      "Tidak memberikan kontraprestasi langsung kepada pembayar",
      "Hanya dibayar oleh perusahaan besar",
      "Hanya digunakan untuk kegiatan perdagangan",
      "Bersifat sukarela",
      "Dipungut berdasarkan kesepakatan antarperusahaan"
    ],
    "answer": 0,
    "topic": "Perpajakan",
    "explanation": "Pajak bersifat wajib berdasarkan ketentuan peraturan perundang-undangan dan tidak memberikan kontraprestasi atau imbalan langsung kepada pembayar pajak."
  },
  {
    "q": "Jika nilai rupiah menguat terhadap dolar AS, dengan faktor lain tetap, dampak yang cenderung terjadi adalah...",
    "options": [
      "Ekspor Indonesia pasti meningkat",
      "Barang impor menjadi relatif lebih murah bagi konsumen Indonesia",
      "Barang impor menjadi lebih mahal",
      "Nilai devisa hasil ekspor pasti menjadi nol",
      "Perdagangan internasional berhenti"
    ],
    "answer": 1,
    "topic": "Ekonomi Internasional",
    "explanation": "Ketika rupiah menguat terhadap dolar AS, diperlukan lebih sedikit rupiah untuk membeli barang atau jasa yang harganya dinyatakan dalam dolar. Dengan faktor lain tetap, impor menjadi relatif lebih murah."
  },
  {
    "q": "Salah satu manfaat kegiatan ekspor bagi perekonomian suatu negara adalah...",
    "options": [
      "Menambah penerimaan devisa dan memperluas pasar",
      "Mengurangi penerimaan devisa",
      "Menghilangkan seluruh impor",
      "Mempersempit pasar produk dalam negeri",
      "Menurunkan kapasitas produksi nasional"
    ],
    "answer": 0,
    "topic": "Ekonomi Internasional",
    "explanation": "Ekspor menghasilkan penerimaan devisa dan memungkinkan produsen dalam negeri menjangkau pasar yang lebih luas di luar negeri."
  },
  {
    "q": "Kebijakan pembangunan dikatakan semakin inklusif apabila pertumbuhan ekonomi disertai dengan...",
    "options": [
      "Pembatasan kegiatan ekonomi masyarakat",
      "Kenaikan harga barang secara umum",
      "Peningkatan ketimpangan pendapatan",
      "Penurunan produksi nasional",
      "Pemerataan kesempatan dan peningkatan kesejahteraan masyarakat"
    ],
    "answer": 4,
    "topic": "Pembangunan Ekonomi",
    "explanation": "Pertumbuhan yang inklusif berarti manfaat pertumbuhan dapat dirasakan lebih luas. Karena itu, pemerataan kesempatan dan peningkatan kesejahteraan masyarakat menjadi bagian penting."
  },
  {
    "q": "Suatu negara mengekspor kopi karena mampu memproduksinya dengan biaya relatif lebih rendah dibandingkan negara lain. Prinsip yang menjelaskan manfaat perdagangan tersebut adalah...",
    "options": [
      "Politik dumping",
      "Proteksi absolut",
      "Keunggulan komparatif",
      "Kuota impor",
      "Devaluasi"
    ],
    "answer": 2,
    "topic": "Ekonomi Internasional",
    "explanation": "Keunggulan komparatif menjelaskan bahwa perdagangan dapat menguntungkan ketika suatu negara berspesialisasi pada barang yang dapat diproduksinya dengan biaya peluang relatif lebih rendah."
  },
  {
    "q": "Pajak memiliki fungsi regulerend, yaitu fungsi untuk...",
    "options": [
      "Menghapus seluruh kewajiban masyarakat",
      "Mengatur atau memengaruhi kegiatan ekonomi masyarakat",
      "Menentukan jumlah uang kartal",
      "Membiayai seluruh kegiatan ekspor",
      "Membiayai perusahaan swasta secara langsung"
    ],
    "answer": 1,
    "topic": "Perpajakan",
    "explanation": "Fungsi regulerend berarti pajak digunakan sebagai alat kebijakan untuk mengatur atau memengaruhi kegiatan ekonomi, misalnya melalui tarif pajak tertentu."
  },
  {
    "q": "Pemerintah menggunakan APBN untuk membangun sekolah, rumah sakit, dan jalan di daerah yang membutuhkan. Tindakan tersebut terutama menunjukkan fungsi APBN sebagai fungsi...",
    "options": [
      "Perdagangan",
      "Pengawasan",
      "Alokasi",
      "Stabilisasi",
      "Distribusi"
    ],
    "answer": 2,
    "topic": "APBN",
    "explanation": "Fungsi alokasi APBN berkaitan dengan penyediaan barang dan jasa publik serta pengalokasian sumber daya untuk kebutuhan masyarakat, seperti sekolah, rumah sakit, dan infrastruktur."
  },
  {
    "q": "Salah satu manfaat utama digitalisasi dalam kegiatan ekonomi bagi pelaku usaha adalah...",
    "options": [
      "Mempersempit jangkauan pasar",
      "Membatasi informasi bagi konsumen",
      "Menghilangkan seluruh risiko usaha",
      "Meningkatkan efisiensi dan memperluas akses pasar",
      "Menghapus kebutuhan akan inovasi"
    ],
    "answer": 3,
    "topic": "Ekonomi Digital",
    "explanation": "Digitalisasi dapat membuat proses usaha lebih efisien dan membantu penjual menjangkau konsumen yang lebih luas tanpa terbatas oleh lokasi fisik."
  },
  {
    "q": "Suatu negara mengalami kenaikan produksi barang dan jasa secara terus-menerus yang ditunjukkan oleh meningkatnya PDB riil. Kondisi tersebut merupakan...",
    "options": [
      "Stabilitas ekonomi",
      "Modernisasi ekonomi",
      "Pembangunan ekonomi",
      "Pertumbuhan ekonomi",
      "Pemerataan pendapatan"
    ],
    "answer": 3,
    "topic": "Pertumbuhan Ekonomi",
    "explanation": "Pertumbuhan ekonomi adalah kenaikan output atau produksi barang dan jasa suatu negara secara berkelanjutan, biasanya diukur melalui PDB riil. Fokus utamanya adalah peningkatan kapasitas produksi."
  },
  {
    "q": "Manakah pasangan yang tepat antara jenis pajak dan contohnya?",
    "options": [
      "Pajak langsung — PPN",
      "Pajak tidak langsung — PPh orang pribadi",
      "Pajak pusat — Pajak Hotel dan Restoran",
      "Pajak daerah — Bea Masuk",
      "Pajak langsung — PPh"
    ],
    "answer": 4,
    "topic": "Perpajakan",
    "explanation": "PPh termasuk pajak langsung karena beban pajaknya ditanggung sendiri oleh wajib pajak dan tidak dapat dialihkan kepada pihak lain seperti pajak tidak langsung."
  },
  {
    "q": "Neraca perdagangan suatu negara mengalami surplus apabila...",
    "options": [
      "Investasi asing lebih kecil daripada investasi domestik",
      "Pendapatan pajak lebih besar daripada belanja negara",
      "Nilai ekspor lebih besar daripada nilai impor",
      "Ekspor dan impor sama-sama nol",
      "Nilai impor lebih besar daripada nilai ekspor"
    ],
    "answer": 2,
    "topic": "Ekonomi Internasional",
    "explanation": "Surplus neraca perdagangan terjadi ketika nilai ekspor lebih besar daripada nilai impor. Sebaliknya, jika impor lebih besar daripada ekspor, terjadi defisit."
  }
];
