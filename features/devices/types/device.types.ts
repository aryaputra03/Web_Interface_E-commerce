export interface Device {
  id: string;
  deviceId: string;
  name: string;
  storeId: string;
  isActive: boolean;
  lastSeenAt: string | null;
}

export interface RegisterDevicePayload {
  deviceId: string;
  name: string;
  storeId: string;
}

export interface RegisterDeviceResponseData {
  id: string;
  deviceId: string;
  apiKey: string;
  note: string;
}

export interface RegenerateKeyResponseData {
  apiKey: string;
  note?: string;
}
