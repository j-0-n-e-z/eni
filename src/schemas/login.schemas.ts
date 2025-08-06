import { z } from 'zod'

import { emailScheme, passwordScheme } from './common.schemas'

export const loginSchema = z.object({
	email: emailScheme,
	password: passwordScheme
})

export type LoginValues = z.infer<typeof loginSchema>
