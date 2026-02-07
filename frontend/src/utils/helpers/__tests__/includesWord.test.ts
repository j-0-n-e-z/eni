import { describe, expect, test } from 'vitest'

import { includesWord } from '@/utils'

describe('includesWord', () => {
	describe('different case & match', () => {test.each([
		['go', 'go', true, false, true],
		['gold', 'go', true, false, true],
		['g', 'go', true, false, false],
		['Go', 'go', true, false, false],

		['go', 'go', false, false, true],
		['gold', 'go', false, false, true],
		['g', 'go', false, false, false],
		['Go', 'go', false, false, true],

		['go', 'go', true, true, true],
		['gold', 'go', true, true, false],
		['g', 'go', true, true, false],
		['Go', 'go', true, true, false],

		['go', 'go', false, true, true],
		['gold', 'go', false, true, false],
		['g', 'go', false, true, false],
		['Go', 'go', false, true, true]
	])(
		'should return $4 for $1 in $0 with case=$2 match=$3',
		(text, word, isCaseSensetive, isWholeMatch, expected) => {
			expect(includesWord(text, word, isCaseSensetive, isWholeMatch)).toBe(
				expected
			)
		}
	)})
	

	test.each([
		['some text', '', false, false, false],
		['', '', false, false, false],
		['', 'word', false, false, false]
	])(
		'should return $4 for $1 in $0',
		(text, word, isCaseSensetive, isWholeMatch, expected) => {
			expect(includesWord(text, word, isCaseSensetive, isWholeMatch)).toBe(
				expected
			)
		}
	)

	test('should return true with punctuation', () => {
		expect(includesWord('gold,silver', 'gold', false, true)).toBe(true)
	})

	test('should return true when word appears multiple times', () => {
		expect(includesWord('gold and more gold', 'gold', false, true)).toBe(true)
	})

	test('should return true with unicode', () => {
		expect(includesWord('café pizza', 'café', true)).toBe(true)
	})

	test('should return true when word is at start of text', () => {
		expect(includesWord('gold is shiny', 'gold', false, true)).toBe(true)
	})

	test('should return true when word is at end of text', () => {
		expect(includesWord('I love gold', 'gold', false, true)).toBe(true)
	})

	test('should return true with hyphenated words', () => {
		expect(includesWord('well-known fact', 'well-known', false, true)).toBe(
			true
		)
	})

	test('should return true with word boundaries and special chars', () => {
		expect(includesWord('(gold) item', 'gold', false, true)).toBe(true)
	})
})
