export interface RegisterUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterUserResponse {
  id: number;
  email: string;
  name: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  accessToken: string;
}

export interface GetUserResponse {
  id: number;
  email: string;
  name: string;
}

export interface UpdateUserRequest {
  name: string;
}

export interface UpdateUserResponse {
  id: number;
  email: string;
  name: string;
}
