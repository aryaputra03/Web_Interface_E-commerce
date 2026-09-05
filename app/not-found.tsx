import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 font-mono text-sm text-ink-muted">404</p>
      <h1 className="mb-2 text-2xl font-semibold text-ink">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mb-6 text-sm text-ink-muted">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="rounded-md bg-till px-4 py-2 text-sm font-medium text-paper hover:bg-till-dark"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
