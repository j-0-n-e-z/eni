export interface User {
  id: string
  email: string
  isEmailConfirmed: boolean
  username: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  username: string
}
