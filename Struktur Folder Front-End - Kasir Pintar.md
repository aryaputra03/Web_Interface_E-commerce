# Struktur Folder Front-End — Kasir Pintar (Next.js)

Prinsip yang dipakai: **feature-based modular architecture**. Setiap fitur (auth, pos-session, products, dst) itu folder mandiri isi lengkap (component, hook, service, schema, type sendiri) — bukan dipisah per-jenis-file (semua component di satu folder besar, semua hook di folder lain, dst). Tujuannya: kalau ada bug di fitur X, semua kode terkait X ada di satu tempat — nggak perlu loncat ke 5 folder berbeda buat trace satu alur.

Aturan folder:

- `app/` → HANYA routing & layout (page.tsx, layout.tsx). Tidak ada logic bisnis di sini — cuma import dari `features/`.
- `features/` → jantung aplikasi. Modular per-fitur.
- `components/` → HANYA komponen yang benar-benar dipakai lintas fitur (button, input, modal generik). Kalau cuma dipakai 1 fitur, taruh di dalam `features/<fitur>/components/`.
- `lib/` → utilitas generik & konfigurasi klien (axios instance, query client).
- `store/` → HANYA global store lintas fitur (authStore). Store yang spesifik 1 fitur taruh di `features/<fitur>/store/`.

---

## 1. Struktur Direktori Lengkap

```
kasir-pintar-fe/
├── app/
│   ├── (public)/                          # route group — halaman customer, layout beda dari admin
│   │   ├── layout.tsx                     # navbar/footer customer
│   │   ├── page.tsx                       # "/" — etalase produk
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # detail produk
│   │   ├── cart/
│   │   │   └── page.tsx                   # keranjang
│   │   ├── checkout/
│   │   │   └── page.tsx                   # checkout online
│   │   └── feedback/
│   │       └── page.tsx
│   │
│   ├── (auth)/                            # route group — layout minimal (tanpa navbar)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── profile/
│   │   ├── layout.tsx
│   │   ├── page.tsx                       # data profil
│   │   ├── orders/
│   │   │   └── page.tsx                   # riwayat pesanan
│   │   └── addresses/
│   │       └── page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx                     # sidebar admin + auth guard
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx                   # list produk
│   │   │   ├── new/
│   │   │   │   └── page.tsx               # tambah produk (form + barcode)
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── history/
│   │   │   └── page.tsx                   # GET /stock/history
│   │   ├── pos/
│   │   │   └── page.tsx                   # Kasir Offline — GET /pos-sessions/active
│   │   ├── scans/
│   │   │   └── page.tsx                   # Log scan device
│   │   └── devices/
│   │       └── page.tsx                   # Manajemen device ESP32-S3
│   │
│   ├── layout.tsx                         # root layout (providers, fonts, metadata)
│   ├── globals.css
│   ├── not-found.tsx
│   └── error.tsx                          # global error boundary
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── GoogleLoginButton.tsx
│   │   ├── hooks/
│   │   │   ├── useLogin.ts
│   │   │   ├── useRegister.ts
│   │   │   ├── useRefreshToken.ts
│   │   │   └── useAuthGuard.ts            # client-side route protection
│   │   ├── services/
│   │   │   └── auth.service.ts            # POST /auth/login, /register, /google, /refresh, /logout
│   │   ├── schemas/
│   │   │   └── auth.schema.ts             # Zod: loginSchema, registerSchema
│   │   ├── store/
│   │   │   └── authStore.ts               # Zustand —
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts                       # barrel export
│   │
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilterBar.tsx
│   │   │   ├── ProductForm.tsx            # form admin (termasuk field barcode)
│   │   │   └── ProductJsonEditor.tsx      # Monaco editor metadata mentah
│   │   ├── hooks/
│   │   │   ├── useProducts.ts             # GET /products (list + filter)
│   │   │   ├── useProductDetail.ts        # GET /products/:idOrSlug
│   │   │   ├── useCreateProduct.ts
│   │   │   ├── useUpdateProduct.ts
│   │   │   └── useDeleteProduct.ts
│   │   ├── services/
│   │   │   └── product.service.ts
│   │   ├── schemas/
│   │   │   └── product.schema.ts          # termasuk validasi barcode wajib
│   │   ├── types/
│   │   │   └── product.types.ts
│   │   └── index.ts
│   │
│   ├── categories/
│   │   ├── components/
│   │   │   └── CategorySelect.tsx
│   │   ├── hooks/
│   │   │   └── useCategories.ts
│   │   ├── services/
│   │   │   └── category.service.ts
│   │   ├── types/
│   │   │   └── category.types.ts
│   │   └── index.ts
│   │
│   ├── cart/
│   │   ├── components/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartDrawer.tsx
│   │   ├── hooks/
│   │   │   ├── useCart.ts
│   │   │   ├── useAddToCart.ts
│   │   │   └── useUpdateCartItem.ts
│   │   ├── services/
│   │   │   └── cart.service.ts
│   │   ├── store/
│   │   │   └── cartStore.ts               # Zustand — sinkron dengan server saat checkout
│   │   ├── types/
│   │   │   └── cart.types.ts
│   │   └── index.ts
│   │
│   ├── orders/
│   │   ├── components/
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   └── OrderStatusBadge.tsx
│   │   ├── hooks/
│   │   │   ├── useOrders.ts
│   │   │   ├── useOrderDetail.ts
│   │   │   ├── useCreateOrder.ts
│   │   │   └── useCancelOrder.ts
│   │   ├── services/
│   │   │   └── order.service.ts
│   │   ├── types/
│   │   │   └── order.types.ts
│   │   └── index.ts
│   │
│   ├── payments/
│   │   ├── components/
│   │   │   └── PaymentSimulateButton.tsx
│   │   ├── hooks/
│   │   │   └── useSimulatePayment.ts      # POST /payments/:id/simulate
│   │   ├── services/
│   │   │   └── payment.service.ts
│   │   ├── types/
│   │   │   └── payment.types.ts
│   │   └── index.ts
│   │
│   ├── stock/
│   │   ├── components/
│   │   │   ├── StockHistoryTable.tsx
│   │   │   └── LowStockBanner.tsx
│   │   ├── hooks/
│   │   │   ├── useStockHistory.ts         # GET /stock/history?referenceType=
│   │   │   └── useLowStock.ts
│   │   ├── services/
│   │   │   └── stock.service.ts
│   │   ├── types/
│   │   │   └── stock.types.ts
│   │   └── index.ts
│   │
│   ├── pos-session/                       # Kasir Offline — /admin/pos
│   │   ├── components/
│   │   │   ├── PosSessionCard.tsx         # 1 kartu = 1 sesi device
│   │   │   ├── PosSessionItemList.tsx
│   │   │   ├── PosSessionSubtotal.tsx
│   │   │   ├── CheckoutButton.tsx
│   │   │   └── CancelSessionButton.tsx
│   │   ├── hooks/
│   │   │   ├── useActiveSessions.ts       # polling 5 detik
│   │   │   ├── useCheckoutSession.ts      # POST /pos-sessions/:id/checkout
│   │   │   └── useCancelSession.ts        # POST /pos-sessions/:id/cancel
│   │   ├── services/
│   │   │   └── posSession.service.ts
│   │   ├── types/
│   │   │   └── posSession.types.ts
│   │   └── index.ts
│   │
│   ├── device-scans/                      # Log Scan — /admin/scans
│   │   ├── components/
│   │   │   ├── ScanLogTable.tsx
│   │   │   ├── ScanFilterBar.tsx          # filter deviceId, status, mode, tanggal
│   │   │   ├── MapProductModal.tsx        # modal pencarian produk utk unmatched
│   │   │   └── ScanStatusBadge.tsx
│   │   ├── hooks/
│   │   │   ├── useDeviceScans.ts          # GET /device/scans
│   │   │   └── useMapProduct.ts           # PATCH /device/scans/:id/map-product
│   │   ├── services/
│   │   │   └── deviceScan.service.ts
│   │   ├── types/
│   │   │   └── deviceScan.types.ts
│   │   └── index.ts
│   │
│   ├── devices/                           # Manajemen Device — /admin/devices
│   │   ├── components/
│   │   │   ├── DeviceTable.tsx
│   │   │   ├── DeviceStatusToggle.tsx
│   │   │   ├── RegisterDeviceForm.tsx
│   │   │   ├── ApiKeyRevealModal.tsx      # tampil sekali, tombol copy clipboard
│   │   │   └── RegenerateKeyDialog.tsx    # konfirmasi sebelum regenerate
│   │   ├── hooks/
│   │   │   ├── useDevices.ts              # polling 15-30 detik (cek lastSeenAt)
│   │   │   ├── useRegisterDevice.ts
│   │   │   ├── useToggleDeviceStatus.ts
│   │   │   └── useRegenerateKey.ts
│   │   ├── services/
│   │   │   └── device.service.ts
│   │   ├── types/
│   │   │   └── device.types.ts
│   │   └── index.ts
│   │
│   ├── notifications/
│   │   ├── components/
│   │   │   ├── NotificationBell.tsx
│   │   │   └── NotificationDropdown.tsx
│   │   ├── hooks/
│   │   │   ├── useNotifications.ts        # polling 15-30 detik
│   │   │   ├── useMarkAsRead.ts
│   │   │   └── useMarkAllAsRead.ts
│   │   ├── services/
│   │   │   └── notification.service.ts
│   │   ├── types/
│   │   │   └── notification.types.ts
│   │   └── index.ts
│   │
│   ├── users/
│   │   ├── components/
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── AddressList.tsx
│   │   │   └── AddressForm.tsx
│   │   ├── hooks/
│   │   │   ├── useProfile.ts
│   │   │   ├── useUpdateProfile.ts
│   │   │   └── useAddresses.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── types/
│   │   │   └── user.types.ts
│   │   └── index.ts
│   │
│   └── feedback/
│       ├── components/
│       │   └── FeedbackForm.tsx
│       ├── hooks/
│       │   └── useSubmitFeedback.ts
│       ├── services/
│       │   └── feedback.service.ts
│       ├── schemas/
│       │   └── feedback.schema.ts
│       ├── types/
│       │   └── feedback.types.ts
│       └── index.ts
│
├── components/                            # HANYA lintas-fitur, generik
│   ├── ui/                                # design system dasar
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Dialog.tsx
│   │   ├── Toast.tsx
│   │   ├── Badge.tsx
│   │   ├── Table.tsx                      # wrapper TanStack Table generik
│   │   ├── Pagination.tsx
│   │   ├── Skeleton.tsx                   # loading state generik
│   │   └── EmptyState.tsx                 # "Belum ada transaksi aktif", dst
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── AdminGuard.tsx                 # wrapper client-side guard utk /admin/*
│   └── feedback-ui/                       # UI state generik (bukan folder "feedback" fitur)
│       ├── ErrorMessage.tsx               # tampilkan "Tidak dapat terhubung ke server" dsb
│       └── LoadingSpinner.tsx
│
├── lib/
│   ├── axios.ts                           # instance axios + baseURL dari env
│   ├── axios-interceptors.ts              # request: inject Bearer token; response: handle 401 & retry refresh
│   ├── query-client.ts                    # TanStack Query client config (default staleTime, retry, dst)
│   ├── query-keys.ts                      # central query key factory (hindari typo key di banyak file)
│   ├── constants.ts                       # POLLING_INTERVAL, RATE_LIMIT_GROUPS, dst
│   └── utils.ts                           # formatCurrency, formatDate, dst
│
├── store/                                 # HANYA store global lintas-fitur
│   └── uiStore.ts                         # contoh: sidebar open/close, global modal state
│
├── types/
│   ├── api.types.ts                       # ApiResponse<T>, ApiError generik
│   └── global.d.ts
│
├── middleware.ts                          # redirect awal berbasis flag ringan (bukan validasi keamanan)
│
├── public/
│   └── ...
│
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. Kenapa Disusun Begini (Alasan per Keputusan)

| Keputusan                                                          | Alasan untuk Debugging                                                                                                                                                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `features/<nama>/` isi lengkap (component + hook + service + type) | Bug di POS Session? Buka `features/pos-session/`, semua penyebab ada di situ. Tidak perlu grep lintas folder.                                                                                                 |
| `services/` terpisah dari `hooks/` di tiap fitur                   | Kalau response API berubah bentuk, cukup ubah 1 file `*.service.ts` — hook & komponen tidak disentuh. Memisahkan "bug di pemanggilan API" vs "bug di state/UI".                                               |
| `schemas/` (Zod) terpisah dari `types/`                            | Validasi form vs kontrak tipe data API adalah dua hal beda — kalau validasi salah tapi tipe API benar (atau sebaliknya), gampang isolasi.                                                                     |
| `index.ts` (barrel export) di tiap fitur                           | Fitur lain hanya boleh import dari `features/x` (bukan dalam-dalam ke `features/x/hooks/useFoo`). Kalau ada import "nyasar" lintas internal fitur, itu tanda arsitektur bocor — gampang ketahuan saat review. |
| `lib/axios-interceptors.ts` terpisah dari `lib/axios.ts`           | Bug auth/refresh-token (yang paling sering bikin pusing) punya 1 titik investigasi tunggal.                                                                                                                   |
| `lib/query-keys.ts` sentral                                        | Query key yang salah ketik itu penyebab #1 data "nggak update-update" di TanStack Query. Sentralisasi = 1 tempat cek.                                                                                         |
| Route group `(public)` vs `(auth)` vs `admin/`                     | Layout beda (navbar customer vs sidebar admin vs kosong di login) tidak saling tabrak; bug layout admin tidak bisa "bocor" ke halaman publik.                                                                 |
| `components/ui/` vs `features/*/components/`                       | Kalau bug tampil di banyak halaman → cek `components/ui/`. Kalau bug cuma di 1 halaman → cek `features/<itu-saja>/components/`. Lokasi bug langsung kepersempit dari nama folder.                             |
| `AdminGuard.tsx` sebagai 1 komponen wrapper                        | Semua route admin lewat 1 pintu proteksi — kalau ada admin yang "kebobolan" akses tanpa login, cukup 1 file untuk dicek.                                                                                      |

---

## 3. Konvensi Penamaan (Supaya Konsisten)

- Komponen: `PascalCase.tsx` — `ProductCard.tsx`
- Hook: `useCamelCase.ts` — `useProducts.ts`
- Service: `camelCase.service.ts` — `product.service.ts` (1 file = 1 resource API)
- Schema (Zod): `camelCase.schema.ts`
- Types: `camelCase.types.ts`
- Store (Zustand): `camelCaseStore.ts`

Tiap `service.ts` isinya **hanya** fungsi pemanggil axios (tidak ada logic UI/state di dalamnya):

```ts
// features/pos-session/services/posSession.service.ts
import { axiosInstance } from "@/lib/axios";
import type { PosSession, CheckoutResponse } from "../types/posSession.types";

export const posSessionService = {
  getActive: () =>
    axiosInstance.get<{ success: boolean; data: PosSession[] }>(
      "/pos-sessions/active",
    ),

  checkout: (id: string, voucherCode: string | null) =>
    axiosInstance.post<CheckoutResponse>(`/pos-sessions/${id}/checkout`, {
      voucherCode,
    }),

  cancel: (id: string) => axiosInstance.post(`/pos-sessions/${id}/cancel`),
};
```

---

## 4. Script Scaffold (Opsional)

Bisa langsung dijalankan untuk generate seluruh folder kosong sekaligus (tinggal isi file-nya satu-satu):

```bash
#!/bin/bash
# scaffold-fe.sh — jalankan dari root project

FEATURES=(auth products categories cart orders payments stock pos-session device-scans devices notifications users feedback)

for f in "${FEATURES[@]}"; do
  mkdir -p "features/$f/components" "features/$f/hooks" "features/$f/services" "features/$f/schemas" "features/$f/types" "features/$f/store"
  touch "features/$f/index.ts"
done

mkdir -p app/\(public\)/product/\[slug\] app/\(public\)/cart app/\(public\)/checkout app/\(public\)/feedback
mkdir -p app/\(auth\)/login app/\(auth\)/register
mkdir -p app/profile/orders app/profile/addresses
mkdir -p app/admin/dashboard app/admin/products/new "app/admin/products/[id]/edit" app/admin/history app/admin/pos app/admin/scans app/admin/devices
mkdir -p components/ui components/layout components/feedback-ui
mkdir -p lib store types public

echo "Struktur folder selesai dibuat."
```

> Catatan: folder `store/` dan `schemas/` di tiap fitur bersifat opsional — hapus kalau fitur itu tidak butuh (misalnya `categories` tidak butuh Zustand store sendiri).
