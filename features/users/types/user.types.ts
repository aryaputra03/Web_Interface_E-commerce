export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  addresses: Address[];
}

export interface UpdateProfilePayload {
  name: string;
  phone?: string;
}

export interface CreateAddressPayload {
  label: string;
  fullAddress: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export type UpdateAddressPayload = Partial<CreateAddressPayload>;
