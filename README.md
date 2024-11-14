Berikut adalah pembaruan dokumentasi dengan langkah tambahan untuk menjalankan migrasi Prisma setelah menjalankan Docker Compose:

---

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

### Workflow Aplikasi (Revised)
Sebelum membuat item, Anda perlu membuat kategori dan pemasok terlebih dahulu. Berikut adalah urutan alur kerja yang harus diikuti:

1. **Membuat Kategori**:
   - Endpoint ini digunakan untuk membuat kategori produk baru.
   - **Path**: `POST /api/categories`
   
2. **Membuat Pemasok**:
   - Endpoint ini digunakan untuk membuat pemasok baru.
   - **Path**: `POST /api/suppliers`

3. **Membuat Item Baru**:
   - Setelah kategori dan pemasok dibuat, Anda dapat membuat item baru.
   - **Path**: `POST /api/items`

### Endpoint dan Contoh Request
Berikut adalah daftar endpoint API beserta contoh request menggunakan format HTTP:

#### 1. Membuat Kategori Baru
**Path**: `POST /api/categories`
```http
POST http://localhost:3001/api/categories
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Elektronik",
  "description": "Kategori untuk barang elektronik"
}
```

#### 2. Membuat Pemasok Baru
**Path**: `POST /api/suppliers`
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

#### 3. Membuat Item Baru
**Path**: `POST /api/items`
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

#### 4. Mendapatkan Semua Item
**Path**: `GET /api/items`
```http
GET http://localhost:3001/api/items
Authorization: Bearer <token>
```

#### 5. Menampilkan Ringkasan Stok Barang
**Path**: `GET /api/items/summary`
```http
GET http://localhost:3001/api/items/summary
Authorization: Bearer <token>
```

#### 6. Menampilkan Barang dengan Stok di Bawah Ambang Batas
**Path**: `GET /api/items/low-stock`
- **Parameter query**: `condition` (lessThan, equalTo, greaterThan), `threshold` (default: 5)
```http
GET http://localhost:3001/api/items/low-stock?condition=lessThan&threshold=5
Authorization: Bearer <token>
```

#### 7. Menampilkan Barang Berdasarkan Kategori
**Path**: `GET /api/items/category/:categoryId`
```http
GET http://localhost:3001/api/items/category/1
Authorization: Bearer <token>
```

#### 8. Menampilkan Ringkasan Per Kategori
**Path**: `GET /api/items/category-summary`
```http
GET http://localhost:3001/api/items/category-summary
Authorization: Bearer <token>
```

#### 9. Menampilkan Ringkasan Barang Berdasarkan Pemasok
**Path**: `GET /api/items/supplier-summary`
```http
GET http://localhost:3001/api/items/supplier-summary
Authorization: Bearer <token>
```

#### 10. Membuat Akun Admin Baru
**Path**: `POST /auth/register`
```http
POST http://localhost:3001/auth/register
Content-Type: application/json

{
  "username": "jhondoe",
  "password": "securePassword123",
  "email": "jhondoe@example.com"
}
```

#### 11. Login Admin
**Path**: `POST /auth/login`
```http
POST http://localhost:3001/auth/login
Content-Type: application/json

{
  "username": "jhondoe",
  "password": "securePassword123",
  "email": "jhondoe@example.com"
}
```

### Penjelasan Singkat Fitur Aplikasi
- **Manajemen Barang**: CRUD item dengan validasi data.
- **Ringkasan Stok**: Melihat total stok, nilai stok, dan rata-rata harga.
- **Filter Stok**: Melihat barang dengan stok kurang dari, sama dengan, atau lebih dari ambang batas tertentu.
- **Kategori dan Pemasok**: Menampilkan barang berdasarkan kategori dan pemasok, serta ringkasannya.
- **Autentikasi**: Sistem login dan pendaftaran menggunakan JWT.

Pastikan API berjalan di port `3001` seperti yang disetel dalam Docker Compose, atau sesuaikan dengan konfigurasi Anda.

---

Dengan penambahan langkah `docker-compose exec app npx prisma migrate dev`, Anda memastikan bahwa database sudah siap untuk digunakan setelah menjalankan aplikasi.