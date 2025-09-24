🕊 Travelin

Travelin adalah platform booking destinasi wisata yang memudahkan pengguna untuk mencari, memesan, dan melakukan pembayaran perjalanan secara online.
Proyek ini dibangun menggunakan Vue 3 + TypeScript + Pinia + Tailwind CSS dan sudah dideploy di Vercel.

🔗 Live Demo: https://travelin-psi.vercel.app/



✨ Fitur Utama

🔐 Autentikasi: Login & Register dengan sistem token.

🏝 Destinasi Wisata: Lihat daftar aktivitas/destinasi lengkap dengan detail, gambar, deskripsi, rating, dan fasilitas.

🛒 Keranjang (Cart): Tambahkan destinasi ke keranjang, ubah jumlah tiket, dan hapus item.

💳 Transaksi: Checkout dengan metode pembayaran virtual account (VA).

📸 Upload Bukti Pembayaran: Bisa upload gambar sebagai proof payment.

📱 Responsive Design: Tampilan mobile full screen, desktop berbasis card dengan UI rapi.

🧭 Navbar & Footer: Navigasi utama + informasi footer.




🛠️ Tech Stack

Vue 3
 (Composition API & <script setup>)

TypeScript

Pinia
 – State management

Vue Router
 – Routing

Tailwind CSS
 – Styling modern & responsive

Vercel
 – Deployment




 📂 Struktur Proyek
 src/
 
├── components/       # Reusable components (Navbar, Footer, Card, dll)

├── store/            # Pinia stores (auth, cart, content)

├── views/            # Halaman (Home, Cart, Transactions, Detail, Login, Register)

├── utils/            # API base URL & helper

├── App.vue           # Root component

└── main.ts           # Entry point
