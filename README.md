# Dokumentasi API untuk Aplikasi Manajemen Inventaris

### Spesifikasi Aplikasi
Aplikasi ini adalah sistem manajemen inventaris yang dibangun menggunakan teknologi berikut:
- **Backend Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Containerization**: Docker Compose untuk mempermudah proses pengembangan dan deployment.

### Persiapan dan Instalasi
1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Setup Docker Compose**:
   Jalankan perintah berikut untuk menjalankan aplikasi dengan Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
3. **Jalankan Migrasi Prisma**:
   Setelah aplikasi berjalan, jalankan migrasi database menggunakan Prisma:
   ```bash
   docker-compose exec app npx prisma migrate dev
   ```
4. **Environment Variables**:
   Pastikan file `.env` sudah diisi dengan konfigurasi berikut:
   ``` 
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   JWT_SECRET=<your_jwt_secret>
   ```

### Urutan Flow Aplikasi dari Login
1. **User mengakses halaman login**.
2. **User mengisi form login** dengan `username` dan `password`.
3. **Request dikirim ke endpoint login**:
   - **Path**: `POST /auth/login`
   ```http
   POST http://localhost:3001/auth/login
   Content-Type: application/json

   {
     "username": "jhondoe",
     "password": "securePassword123",
     "email": "jhondoe@example.com"
   }
   ```
4. **Server memproses permintaan** dan memvalidasi kredensial.
5. **Jika valid**, server mengembalikan token JWT sebagai respons.
6. **User menyimpan token JWT** untuk digunakan dalam permintaan API selanjutnya.

### Penggunaan File untuk Pengujian
Untuk memudahkan pengujian API, Anda dapat menggunakan file `AUTH.http` untuk login dan register, setelah login akan mendapatkan token. Paste-kan token di dalam authorization `ITEM.http` untuk menguji endpoint terkait manajemen barang. File-file ini dapat digunakan dengan tools seperti **Postman** atau **VS Code dengan extension HTTP**.

#### 1. **AUTH.http** (Login dan Register)
   - Gunakan file ini untuk menguji proses login dan register.
   - **Login**:
     ```http
     POST http://localhost:3001/auth/login
     Content-Type: application/json

     {
       "username": "jhondoe",
       "password": "securePassword123",
       "email": "jhondoe@example.com"
     }
     ```

   - **Register**:
     ```http
     POST http://localhost:3001/auth/register
     Content-Type: application/json

     {
       "username": "jhondoe",
       "password": "securePassword123",
       "email": "jhondoe@example.com"
     }
     ```

#### 2. **ITEM.http** (Endpoint untuk Manajemen Barang)
   Gunakan file ini untuk menguji berbagai endpoint yang terkait dengan manajemen item, seperti membuat item, mendapatkan daftar item, melihat ringkasan stok, dan lainnya.

   - **Membuat Kategori Baru**:
     ```http
     POST http://localhost:3001/api/categories
     Content-Type: application/json
     Authorization: Bearer <token>

     {
       "name": "Elektronik",
       "description": "Kategori untuk barang elektronik"
     }
     ```

   - **Membuat Pemasok Baru**:
     ```http
     POST http://localhost:3001/api/suppliers
     Content-Type: application/json
     Authorization: Bearer <token>

     {
       "name": "ABC Supplier",
       "contact": "contact@abc-supplier.com",
       "address": "Jl. ABC No. 123"
     }
     ```

   - **Membuat Item Baru**:
     ```http
     POST http://localhost:3001/api/items
     Content-Type: application/json
     Authorization: Bearer <token>

     {
       "name": "MACBOOK AIR",
       "description": "Ini Laptop",
       "price": 50000.00,
       "quantity": 5,
       "categoryId": 1,
       "supplierId": 1,
       "createdBy": 1
     }
     ```

   - **Mendapatkan Semua Item**:
     ```http
     GET http://localhost:3001/api/items
     Authorization: Bearer <token>
     ```

   - **Menampilkan Ringkasan Stok Barang**:
     ```http
     GET http://localhost:3001/api/items/summary
     Authorization: Bearer <token>
     ```

   - **Menampilkan Barang dengan Stok di Bawah Ambang Batas**:
     ```http
     GET http://localhost:3001/api/items/low-stock?condition=lessThan&threshold=5
     Authorization: Bearer <token>
     ```

   - **Menampilkan Barang Berdasarkan Kategori**:
     ```http
     GET http://localhost:3001/api/items/category/1
     Authorization: Bearer <token>
     ```

   - **Menampilkan Ringkasan Per Kategori**:
     ```http
     GET http://localhost:3001/api/items/category-summary
     Authorization: Bearer <token>
     ```

   - **Menampilkan Ringkasan Barang Berdasarkan Pemasok**:
     ```http
     GET http://localhost:3001/api/items/supplier-summary
     Authorization: Bearer <token>
     ```

### Penjelasan Singkat Fitur Aplikasi
- **Manajemen Barang**: CRUD item dengan validasi data.
- **Ringkasan Stok**: Melihat total stok, nilai stok, dan rata-rata harga.
- **Filter Stok**: Melihat barang dengan stok kurang dari, sama dengan, atau lebih dari ambang batas tertentu.
- **Kategori dan Pemasok**: Menampilkan barang berdasarkan kategori dan pemasok, serta ringkasannya.
- **Autentikasi**: Sistem login dan pendaftaran menggunakan JWT.

Pastikan API berjalan di port `3001` seperti yang disetel dalam Docker Compose, atau sesuaikan dengan konfigurasi Anda.

---

Dengan penambahan informasi tentang penggunaan file `AUTH.http` dan `ITEM.http`, pengujian dan penggunaan API menjadi lebih terstruktur dan mudah diikuti.
