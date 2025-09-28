import { describe, expect, test } from 'vitest'

import {
	DateFormatter,
	formatAgeLimit,
	formatDurationStrToHours,
	formatMinutesToHours,
	formatMoney,
	formatRating,
	NumberFormatter,
	USDFormatter
} from '@/utils'

describe('USD formatter', () => {
	test('should format integers correctly', () => {
		expect(USDFormatter.format(0)).toBe('$0')
		expect(USDFormatter.format(10)).toBe('$10')
		expect(USDFormatter.format(10_000)).toBe('$10,000')
	})

	test('should format decimals with rounding', () => {
		expect(USDFormatter.format(0.01)).toBe('$0')
		expect(USDFormatter.format(0.54)).toBe('$0.5')
		expect(USDFormatter.format(0.55)).toBe('$0.6')
		expect(USDFormatter.format(10.0)).toBe('$10')
		expect(USDFormatter.format(10.54)).toBe('$10.5')
		expect(USDFormatter.format(10.55)).toBe('$10.6')
	})

	test('should format large numbers correctly', () => {
		expect(USDFormatter.format(999_999.3)).toBe('$999,999.3')
		expect(USDFormatter.format(2_999_999)).toBe('$2,999,999')
	})

	test('should format negative numbers', () => {
		expect(USDFormatter.format(-10)).toBe('-$10')
		expect(USDFormatter.format(-10.55)).toBe('-$10.6')
	})

	test('should format invalid numbers', () => {
		expect(USDFormatter.format(NaN)).toBe('$0')
		expect(USDFormatter.format(Infinity)).toBe('$0')
	})
})

describe('US number formatter', () => {
	test('should format integers correctly', () => {
		expect(NumberFormatter.format(0)).toBe('0')
		expect(NumberFormatter.format(10)).toBe('10')
		expect(NumberFormatter.format(999)).toBe('999')
	})

	test('should format decimals correctly', () => {
		expect(NumberFormatter.format(10.0)).toBe('10')
		expect(NumberFormatter.format(10.54)).toBe('10.54')
		expect(NumberFormatter.format(10.55)).toBe('10.55')
	})

	test('should format negative numbers correctly', () => {
		expect(NumberFormatter.format(-10.0)).toBe('-10')
		expect(NumberFormatter.format(-10_999)).toBe('-10,999')
	})

	test('should format invalid numbers', () => {
		expect(NumberFormatter.format(NaN)).toBe('NaN')
		expect(NumberFormatter.format(Infinity)).toBe('∞')
	})

	test('should format large numbers correctly', () => {
		expect(NumberFormatter.format(999_999.3)).toBe('999,999.3')
		expect(NumberFormatter.format(2_999_999)).toBe('2,999,999')
	})
})

describe('Date formatter', () => {
	test('should format dates correctly"', () => {
		expect(DateFormatter.format(new Date(0, 0, 0))).toBe('Dec 31, 1899')
		expect(DateFormatter.format(new Date(2000, 8, 15))).toBe('Sep 15, 2000')
		expect(DateFormatter.format(new Date(2023, 10, 3))).toBe('Nov 3, 2023')
	})

	test('should format number dates correctly', () => {
		expect(DateFormatter.format(0)).toBe('Jan 1, 1970')
		expect(DateFormatter.format(968_999_999_999)).toBe('Sep 15, 2000')
	})
})

describe('formatMinutesToHours', () => {
	test('short duration - show minutes only', () => {
		expect(formatMinutesToHours(0)).toBe('0m')
		expect(formatMinutesToHours(10)).toBe('10m')
		expect(formatMinutesToHours(59)).toBe('59m')
	})

	test('full hour duration - show hours only', () => {
		expect(formatMinutesToHours(60)).toBe('1h')
		expect(formatMinutesToHours(120)).toBe('2h')
		expect(formatMinutesToHours(240)).toBe('4h')
	})

	test('mixed duration - show hours and minutes', () => {
		expect(formatMinutesToHours(80)).toBe('1h 20m')
		expect(formatMinutesToHours(123)).toBe('2h 3m')
		expect(formatMinutesToHours(179)).toBe('2h 59m')
	})
})

describe('formatDurationStrToHours', () => {
	test('short duration - show minutes only', () => {
		expect(formatDurationStrToHours('00:00')).toBe('0m')
		expect(formatDurationStrToHours('00:28')).toBe('28m')
		expect(formatDurationStrToHours('00:59')).toBe('59m')
	})

	test('full hour duration - show hours only', () => {
		expect(formatDurationStrToHours('01:00')).toBe('1h')
		expect(formatDurationStrToHours('02:00')).toBe('2h')
		expect(formatDurationStrToHours('04:00')).toBe('4h')
	})

	test('mixed duration - show hours and minutes', () => {
		expect(formatDurationStrToHours('01:20')).toBe('1h 20m')
		expect(formatDurationStrToHours('02:03')).toBe('2h 3m')
		expect(formatDurationStrToHours('02:59')).toBe('2h 59m')
	})
})

describe('formatMoney', () => {
	test('should format amount less than a million', () => {
		expect(formatMoney(1_000, 'USD')).toBe('$1,000')
	})

	test('should format amount more than a million', () => {
		expect(formatMoney(10_000_000, 'USD')).toBe('$10 million')
		expect(formatMoney(10_440_000, 'USD')).toBe('$10.4 million')
		expect(formatMoney(10_500_000, 'USD')).toBe('$10.5 million')
		expect(formatMoney(10_550_000, 'USD')).toBe('$10.6 million')
	})

	test('should format amount more than a billion', () => {
		expect(formatMoney(2_760_000_000, 'USD')).toBe('$2.8 billion')
		expect(formatMoney(1_550_000_000, 'USD')).toBe('$1.6 billion')
	})

	test('should format amount with different currencies', () => {
		expect(formatMoney(1_000, 'RUB')).toBe('RUB 1,000')
		expect(formatMoney(1_000, 'EUR')).toBe('€1,000')
	})

	test('should format amount with invalid currency code', () => {
		expect(formatMoney(0, 'РУБ')).toBe('РУБ 0')
		expect(formatMoney(1_000_000, 'КОНФЕТ')).toBe('КОНФЕТ 1 million')
		expect(formatMoney(1_999_000, '$')).toBe('$ 2 million')
		expect(formatMoney(2_955_550_000, '🎁')).toBe('🎁 2.96 billion')
	})
})

describe('formatRating', () => {
	test('should format MPAA rating', () => {
		expect(formatRating('g')).toBe('G')
		expect(formatRating('pg')).toBe('PG')
		expect(formatRating('pg13')).toBe('PG-13')
		expect(formatRating('r')).toBe('R')
		expect(formatRating('nc17')).toBe('NC-17')
		expect(formatRating('aboba228')).toBe('ABOBA-228')
	})
})

describe('formatAgeLimit', () => {
	test('should format age limit', () => {
		expect(formatAgeLimit('age0')).toBe('0+')
		expect(formatAgeLimit('age6')).toBe('6+')
		expect(formatAgeLimit('age12')).toBe('12+')
		expect(formatAgeLimit('age16')).toBe('16+')
		expect(formatAgeLimit('age18')).toBe('18+')
		expect(formatAgeLimit('age')).toBe('0+')
	})
})
