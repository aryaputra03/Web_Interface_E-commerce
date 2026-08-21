import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL && process.env.NODE_ENV !== "production") {
  console.warn(
    "[lib/axios] NEXT_PUBLIC_API_BASE_URL belum diisi di .env.local — request ke Backend akan gagal.",
  );
}

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
