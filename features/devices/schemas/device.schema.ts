import { z } from "zod";

export const registerDeviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID wajib diisi"),
  name: z.string().min(1, "Nama device wajib diisi"),
  storeId: z.string().min(1, "Store ID wajib diisi"),
});

export type RegisterDeviceSchema = z.infer<typeof registerDeviceSchema>;
