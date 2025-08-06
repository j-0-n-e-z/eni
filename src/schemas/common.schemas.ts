import { z } from 'zod'

export const passwordScheme = z
	.string()
	.min(1, 'Password is required')
	.min(6, 'Password is too short')
	.max(24, 'Password is too long')
	.regex(/[A-Z]/, 'At least one capital letter required')
	.regex(/\d/, 'At least one digit required')
	.regex(/[!@#$%^&*]/, 'At least one special character required')

export const emailScheme = z
	.string()
	.min(1, 'Email is required')
	.refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Invalid email')
