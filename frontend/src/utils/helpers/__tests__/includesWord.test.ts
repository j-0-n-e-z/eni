import { describe, expect, test } from 'vitest'

import { includesWord } from '@/utils'

describe('includesWord', () => {
	test('should return TRUE with [match case] on "go" and "gold"', () => {
		const word = 'go'
		const text = "Thror's love of gold had grown too fierce."
		expect(includesWord(text, word, true)).toBe(true)
	})

	test('should return FALSE with [match case] on "go" and "Gold"', () => {
		const word = 'go'
		const text = "Thror's love of Gold had grown too fierce."
		expect(includesWord(text, word, true)).toBe(false)
	})

	test('should return TRUE with [no match case] on "go" and "Gold"', () => {
		const word = 'go'
		const text = "Thror's love of Gold had grown too fierce."
		expect(includesWord(text, word, false)).toBe(true)
	})

	test('should return TRUE with [no match case] on "go" and "gold"', () => {
		const word = 'go'
		const text = "Thror's love of gold had grown too fierce."
		expect(includesWord(text, word, false)).toBe(true)
	})

	test('should return FALSE with [no match case] on "go" and "g"', () => {
		const word = 'go'
		const text = "Thror's love of g had grown too fierce."
		expect(includesWord(text, word, false)).toBe(false)
	})

	test('should return TRUE with [match case, match whole word] on "gold" and "gold"', () => {
		const word = 'gold'
		const text = "Thror's love of gold had grown too fierce."
		expect(includesWord(text, word, true, true)).toBe(true)
	})

	test('should return TRUE with [no match case, match whole word] on "gold" and "Gold"', () => {
		const word = 'gold'
		const text = "Thror's love of Gold things had grown too fierce."
		expect(includesWord(text, word, false, true)).toBe(true)
	})

	test('should return FALSE with [match case, match whole word] on "gold" and "golden"', () => {
		const word = 'gold'
		const text = "Thror's love of golden things had grown too fierce."
		expect(includesWord(text, word, true, true)).toBe(false)
	})
})
