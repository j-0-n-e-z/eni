export type CreateUserData = {
	username: string
	email: string
	password: string
	emailConfirmationLink: string
}

export type UpdateUserData = {
	isEmailConfirmed?: boolean
	emailConfirmationLink?: string | null
}

export interface IUserRepository<TUser> {
	findByUsername(username: string): Promise<TUser | null>
	findByEmail(email: string): Promise<TUser | null>
	findById(id: string): Promise<TUser | null>
	findByRefreshToken(refreshToken: string): Promise<TUser | null>
	findByEmailConfirmationLink(link: string): Promise<TUser | null>
	create(userData: CreateUserData): Promise<TUser>
	update(id: string, data: UpdateUserData): Promise<TUser>
	delete(id: string): Promise<void>
	findAll(): Promise<TUser[]>
}

export interface ITokenRepository {
	findToken(refreshToken: string): Promise<{ userId: string } | null>
	invalidateToken(userId: string): Promise<void>
	updateToken(userId: string, refreshToken: string): Promise<void>
}
