export interface User {
  _id?: string;
  username: string;
  password: string;
  email: string;
  address: string;
  isAdmin?: boolean;
}
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ValidationErrorDetail {
  message: string;
  path: string[];
  type: string;
  context: {
    limit?: number;
    value: string;
    label: string;
    key: string;
  };
}

export interface ValidationError {
  _original: {
    username?: string;
    email?: string;
    password?: string;
    address?: string;
  };
  details: ValidationErrorDetail[];
}

export interface UserResponse {
  user?: User;
  message: string;
  token: string;
  error?: ValidationError;
}

export interface UsersResponse {
  allUsers: User[];
}
