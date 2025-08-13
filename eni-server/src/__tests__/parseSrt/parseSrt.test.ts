import assert from 'node:assert'

import { parseSrt } from '../../utils/subtitles/parseSrt'

import { expected } from './expected'
import { source } from './source'

describe('concat uncompleted sentences between subtitles', () => {
	it("should concat with no punctiation mark or ',' at the end [Avatar]", () => {
		const actual = parseSrt(source.avatar)
		assert.deepEqual(actual, expected.avatar)
	})
	it("should concat with '...' at the end [Hobbit: An Unexpected Journey]", () => {
		const actual = parseSrt(source.hobbit)
		assert.deepEqual(actual, expected.hobbit)
	})
})
