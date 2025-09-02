export type AuthView = 'signin' | 'signup' | 'forgot-password' | 'verify';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Credentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

