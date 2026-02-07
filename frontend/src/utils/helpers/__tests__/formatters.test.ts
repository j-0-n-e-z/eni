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

describe('USDFormatter', () => {
	test.each([
		[0, '$0'],
		[10, '$10'],
		[10_000, '$10,000']
	])('should format integer %s as %s', (input, expected) => {
		expect(USDFormatter.format(input)).toBe(expected)
	})

	test.each([
		[0.01, '$0'],
		[10.0, '$10'],
		[10.54, '$10.5'],
		[10.55, '$10.6']
	])('should format decimal %s as %s (with rounding)', (input, expected) => {
		expect(USDFormatter.format(input)).toBe(expected)
	})

	test.each([
		[999_999.3, '$999,999.3'],
		[2_999_999, '$2,999,999']
	])('should format large number %s as %s', (input, expected) => {
		expect(USDFormatter.format(input)).toBe(expected)
	})

	test.each([
		[-10, '-$10'],
		[-10.54, '-$10.5'],
		[-10.55, '-$10.6']
	])('should format negative number %s as %s', (input, expected) => {
		expect(USDFormatter.format(input)).toBe(expected)
	})

	test.each([
		[NaN, '$0'],
		[Infinity, '$0']
	])('should format invalid number %s as %s', (input, expected) => {
		expect(USDFormatter.format(input)).toBe(expected)
	})
})

describe('NumberFormatter', () => {
	test.each([
		[0, '0'],
		[10, '10'],
		[1999, '1,999']
	])('should format integer %s as %s', (input, expected) => {
		expect(NumberFormatter.format(input)).toBe(expected)
	})

	test.each([
		[10.0, '10'],
		[10.54, '10.54'],
		[10.55, '10.55']
	])('should format decimal %s as %s', (input, expected) => {
		expect(NumberFormatter.format(input)).toBe(expected)
	})

	test.each([
		[-10.0, '-10'],
		[-10_999, '-10,999']
	])('should format negative number %s as %s', (input, expected) => {
		expect(NumberFormatter.format(input)).toBe(expected)
	})

	test.each([
		[NaN, 'NaN'],
		[Infinity, '∞']
	])('should format invalid number %s as %s', (input, expected) => {
		expect(NumberFormatter.format(input)).toBe(expected)
	})

	test.each([
		[999_999.3, '999,999.3'],
		[2_999_999, '2,999,999']
	])('should format large number %s as %s', (input, expected) => {
		expect(NumberFormatter.format(input)).toBe(expected)
	})
})

describe('DateFormatter', () => {
	test.each([
		[new Date(0, 0, 0), 'Dec 31, 1899'],
		[new Date(2000, 8, 15), 'Sep 15, 2000'],
		[new Date(2023, 10, 3), 'Nov 3, 2023']
	])('should format Date %s as %s', (input, expected) => {
		expect(DateFormatter.format(input)).toBe(expected)
	})

	test.each([
		[0, 'Jan 1, 1970'],
		[968_999_999_999, 'Sep 15, 2000']
	])('should format timestamp %s as %s', (input, expected) => {
		expect(DateFormatter.format(input)).toBe(expected)
	})
})

describe('formatMinutesToHours', () => {
	test.each([
		[0, '0m'],
		[10, '10m'],
		[59, '59m']
	])('should format %s minutes (short) as %s', (minutes, expected) => {
		expect(formatMinutesToHours(minutes)).toBe(expected)
	})

	test.each([
		[60, '1h'],
		[120, '2h'],
		[240, '4h']
	])('should format %s minutes (full hour) as %s', (minutes, expected) => {
		expect(formatMinutesToHours(minutes)).toBe(expected)
	})

	test.each([
		[80, '1h 20m'],
		[123, '2h 3m'],
		[179, '2h 59m']
	])('should format %s minutes (mixed) as %s', (minutes, expected) => {
		expect(formatMinutesToHours(minutes)).toBe(expected)
	})
})

describe('formatDurationStrToHours', () => {
	test.each([
		['00:00', '0m'],
		['00:28', '28m'],
		['00:59', '59m']
	])('should format %s (short) as %s', (duration, expected) => {
		expect(formatDurationStrToHours(duration)).toBe(expected)
	})

	test.each([
		['01:00', '1h'],
		['02:00', '2h'],
		['04:00', '4h']
	])('should format %s (full hour) as %s', (duration, expected) => {
		expect(formatDurationStrToHours(duration)).toBe(expected)
	})

	test.each([
		['01:20', '1h 20m'],
		['02:03', '2h 3m'],
		['02:59', '2h 59m']
	])('should format %s (mixed) as %s', (duration, expected) => {
		expect(formatDurationStrToHours(duration)).toBe(expected)
	})
})

describe('formatMoney', () => {
	test('should format amount less than a million', () => {
		expect(formatMoney(1_000, 'USD')).toBe('$1,000')
	})

	test.each([
		[10_000_000, 'USD', '$10 million'],
		[10_440_000, 'USD', '$10.4 million'],
		[10_500_000, 'USD', '$10.5 million'],
		[10_550_000, 'USD', '$10.6 million']
	])(
		'should format amount %s %s as %s (million+)',
		(amount, currency, expected) => {
			expect(formatMoney(amount, currency)).toBe(expected)
		}
	)

	test.each([
		[2_760_000_000, 'USD', '$2.8 billion'],
		[1_550_000_000, 'USD', '$1.6 billion']
	])(
		'should format amount %s %s as %s (billion+)',
		(amount, currency, expected) => {
			expect(formatMoney(amount, currency)).toBe(expected)
		}
	)

	test.each([
		[1_000, 'RUB', 'RUB 1,000'],
		[1_000, 'EUR', '€1,000']
	])(
		'should format amount %s with currency %s as %s',
		(amount, currency, expected) => {
			expect(formatMoney(amount, currency)).toBe(expected)
		}
	)

	test.each([
		[0, 'РУБ', 'РУБ 0'],
		[1_000_000, 'КОНФЕТ', 'КОНФЕТ 1 million'],
		[1_999_000, '$', '$2 million'],
		[2_955_550_000, '🎁', '🎁 2.96 billion']
	])(
		'should format amount %s with invalid currency %s as %s',
		(amount, currency, expected) => {
			expect(formatMoney(amount, currency)).toBe(expected)
		}
	)
})

describe('formatRating', () => {
	test.each([
		['g', 'G'],
		['pg', 'PG'],
		['pg13', 'PG-13'],
		['r', 'R'],
		['nc17', 'NC-17'],
		['aboba228', 'ABOBA-228']
	])('should format rating %s as %s', (rating, expected) => {
		expect(formatRating(rating)).toBe(expected)
	})
})

describe('formatAgeLimit', () => {
	test.each([
		['age0', '0+'],
		['age6', '6+'],
		['age12', '12+'],
		['age16', '16+'],
		['age18', '18+'],
		['age', '0+'] // edge case
	])('should format age limit %s as %s', (input, expected) => {
		expect(formatAgeLimit(input)).toBe(expected)
	})
})
