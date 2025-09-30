import assert from 'node:assert'

import { parseSrt } from '../../utils/srt/parseSrt'

import { expected } from './expected'
import { source } from './source'

describe('parseSrt', () => {
	it("should concat subtitles with no punctiation mark or ',' at the end", () => {
		const actual = parseSrt(source.avatar)
		assert.deepEqual(actual, expected.avatar)
	})
	it("should concat subtitles with '...' at the end", () => {
		const actual = parseSrt(source.hobbit)
		assert.deepEqual(actual, expected.hobbit)
	})
})
