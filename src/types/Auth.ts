import { Profile } from "next-auth";
import { Tokens } from "./Token";
import { User } from "./User";

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  tokens: Tokens;
  user: User;
  profile: Profile;
}

export interface LoginResponse {
  tokens: Tokens;
  user: User;
  profile: Profile;
}
