export interface Device {
  id: string;
  deviceId: string;
  name: string;
  storeId: string;
  isActive: boolean;
  lastSeenAt: string | null;
}
