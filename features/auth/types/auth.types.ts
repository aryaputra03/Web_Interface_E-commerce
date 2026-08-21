export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatarUrl?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface GoogleLoginPayload {
  idToken: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
