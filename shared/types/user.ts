export interface UserDto {
  id: string
  email: string
  isEmailConfirmed: boolean
  username: string
}

export interface User extends UserDto {
	password: string
	emailConfirmationLink: string | null
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
