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
  recipientName: string;
  phone: string;
  addressLine: string;
  city: string;
  postalCode: string;
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

export type UpdateAddressPayload = Partial<CreateAddressPayload>;
