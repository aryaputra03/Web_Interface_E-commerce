export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export interface UpdateProfilePayload {
  name: string;
  phone?: string;
}

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

export interface CreateAddressPayload {
  label: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  city: string;
  postalCode: string;
  isDefault?: boolean;
}

export type CreateAddressPayload = Omit<Address, "id">;
