import type { User } from '@prisma/client'

export class UserDto {
	readonly id: string

	readonly email: string

	readonly username: string

	readonly isEmailConfirmed: boolean

	constructor(user: User) {
		this.id = user.id
		this.username = user.username
		this.email = user.email
		this.isEmailConfirmed = user.isEmailConfirmed
	}
}
