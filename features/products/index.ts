// Barrel export — halaman di app/ HANYA boleh import dari '@/features/products',
// jangan import dalam-dalam (lihat aturan di dokumen Struktur Folder Bab 2).

export * from "./components/ProductCard";
export * from "./components/ProductGrid";
export * from "./components/ProductFilterBar";
export * from "./components/ProductForm";
export * from "./components/ProductJsonEditor";

export * from "./hooks/useProducts";
export * from "./hooks/useProductDetail";
export * from "./hooks/useCreateProduct";
export * from "./hooks/useUpdateProduct";
export * from "./hooks/useDeleteProduct";

export * from "./services/product.service";
export * from "./schemas/product.schema";
export * from "./types/product.types";
