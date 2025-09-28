import type { JwtPayload } from 'jsonwebtoken'

interface UserJwtPayload extends JwtPayload {
	id: string
	email: string
}

declare global {
	namespace Express {
		interface Request {
			user?: UserJwtPayload
		}
	}
}
