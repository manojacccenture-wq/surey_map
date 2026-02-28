// Request
export interface LoginRequest {
  username: string;
  password: string;
}

// Response
export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

