// Tipe data kategori, mengikuti skema `categories` di dokumentasi Backend
// (Bab 6.7): { name, slug, imageUrl, createdAt }.

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  createdAt: string;
}
