# 📅 AgendaKu - Aplikasi Daftar Kegiatan (React)

**AgendaKu** adalah aplikasi web modern berbasis **React** yang dirancang khusus untuk membantu mahasiswa dalam mengelola daftar tugas, acara, kegiatan, dan pengingat harian secara terstruktur. Proyek ini dikembangkan dengan menerapkan konsep *Component-Based UI Development*, manajemen state, *props*, dan fitur interaktif yang responsif.

---

## 👨‍💻 Identitas Pembuat
* **Nama:** Faiz Muhammad Ilham Hariry
* **NIM:** 1247050032
* **Kelas:** IF A 24 (Informatika 2024)
* **Mata Kuliah:** Pengembangan Aplikasi Web
* **Materi:** Component-Based UI Development with React

---

## 🚀 Fitur Utama & Interaktif
1. **Manajemen Kegiatan (CRUD):** Tambah, edit, hapus, dan perbarui status kegiatan secara dinamis.
2. **Dashboard Statistik:** Ringkasan jumlah kegiatan hari ini, kegiatan mendatang, tugas selesai, dan total keseluruhan kegiatan.
3. **Pencarian & Filter Pintar:** Cari judul atau lokasi kegiatan secara *real-time* serta filter berdasarkan jenis kegiatan dan urutan tanggal.
4. **Navigasi Beranda & Kalender:** Beralih mulus antara tampilan daftar kegiatan utama dan kalender interaktif.
5. **Modal Konfirmasi & Notifikasi:** Dialog pop-up kustom yang elegan untuk konfirmasi penghapusan dan *toast notification*.

---

## 🧩 Struktur Komponen React (Component-Based UI)
Aplikasi ini dipecah ke dalam beberapa komponen modular yang terpisah dan dapat digunakan kembali (*reusable components*):
* **Profil & Header (`Header.tsx`):** Menampilkan informasi sambutan, nama lengkap, NIM, dan kelas mahasiswa.
* **Kartu Statistik (`StatsCard.tsx`):** Merangkum jumlah status kegiatan secara visual.
* **Kartu Kegiatan (`TaskCard.tsx`):** Menampilkan detail setiap kegiatan beserta tombol aksi (ubah status, detail, edit, hapus).
* **Formulir Kegiatan (`TaskForm.tsx`):** Formulir interaktif untuk menambah dan memperbarui data kegiatan.
* **Tampilan Kalender (`CalendarView.tsx`):** Navigasi kalender interaktif untuk memantau agenda berdasarkan tanggal.

---

## ⚙️ Konsep React yang Diterapkan
* **Components:** Memecah antarmuka pengguna menjadi modul-modul komponen file terpisah.
* **Props:** Mengirimkan data dari komponen induk (*parent*) ke komponen anak (*child*).
* **State (`useState`):** Mengelola data dinamis seperti daftar kegiatan, status filter, input pencarian, dan visibilitas modal.
* **Event Handling:** Menangani interaksi pengguna seperti klik tombol, pengisian formulir, dan pencarian teks secara langsung.
* **Conditional & List Rendering:** Menampilkan elemen secara kondisional serta merender array data kegiatan menggunakan metode `.map()`.

---

## 🛠️ Cara Menjalankan Proyek

### 1. Mode Pengembangan (Development)
Digunakan saat aktif mengembangkan aplikasi di komputer dengan fitur *Hot Module Replacement (HMR)*:
```bash
# Clone repository
git clone [https://github.com/faizmmly/pengelola-daftar-tugas-kuliah.git](https://github.com/faizmmly/pengelola-daftar-tugas-kuliah.git)

# Masuk ke direktori proyek
cd pengelola-daftar-tugas-kuliah

# Install dependencies
npm install

# Jalankan server pengembangan
npm run dev