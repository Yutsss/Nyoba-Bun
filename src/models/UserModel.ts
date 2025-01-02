export interface IRegisterUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface IRegisterUserResponse {
  id: number;
  email: string;
  name: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  accessToken: string;
}

export interface IGetUserResponse {
  id: number;
  email: string;
  name: string;
}

export interface IUpdateUserRequest {
  name: string;
}

export interface IUpdateUserResponse {
  id: number;
  email: string;
  name: string;
}
