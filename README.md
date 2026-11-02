# UPPRIME

**Premium Services. Better Life.**

UPPRIME adalah toko layanan dan langganan digital premium. Website menggunakan Next.js App Router, React, TypeScript, Supabase, dan GitHub Pages.

## Menjalankan secara lokal

Pastikan Node.js 22 atau versi LTS yang kompatibel telah terpasang.

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk memeriksa build statis:

```bash
npm run build
```

## Komponen utama

- `src/app/page.tsx` — katalog, detail produk, dan pemesanan.
- `src/app/admin/page.tsx` — login dan panel admin.
- `src/app/globals.css` — desain responsif.
- `supabase/functions/` — Edge Functions untuk pembuatan pesanan dan pembayaran.
- `supabase/SETUP.md` — konfigurasi backend, pembayaran, dan notifikasi.

## Konfigurasi deployment

Workflow GitHub Actions membangun situs statis untuk GitHub Pages di `/upprime/`. Variabel frontend yang boleh dipublikasikan hanya URL Supabase dan publishable/anon key. Jangan pernah memasukkan service-role key atau Midtrans Server Key ke frontend, GitHub source, maupun variabel `NEXT_PUBLIC_*`.

Jika Supabase tidak terhubung atau katalog gagal dimuat, website tidak akan menampilkan produk demo atau membuat pesanan palsu.

## Status pembayaran

Integrasi Midtrans Snap dan webhook sudah tersedia di source dan Edge Functions. Pembayaran otomatis baru aktif setelah akun merchant, Server Key, mode Sandbox/Production, dan Payment Notification URL dikonfigurasi serta diuji. Aktivasi produk tetap dilakukan manual oleh admin setelah status pembayaran diverifikasi.

## Sebelum menerima pelanggan

- Pastikan seluruh produk, harga, stok, foto, dan metode aktivasi benar serta diperoleh secara sah.
- Lengkapi konfigurasi Midtrans dan uji alur pembayaran Sandbox.
- Uji login kedua admin, pemesanan, webhook, pembatalan, refund, dan aktivasi.
- Tinjau kebijakan privasi, syarat layanan, serta kanal dukungan pelanggan.
- Jalankan pemeriksaan keamanan Supabase secara berkala.
