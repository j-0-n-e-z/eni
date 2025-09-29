import type { PureSubtitle } from '../../types'

import { concatSubtitlesWithUncompleteSentences } from './concatSubtitles'

export function parseSrt(data: string): PureSubtitle[] {
	const blocks = data.split('\n\n').map((str) => str.split('\n'))
	const uncompleteSubtitles: PureSubtitle[] = blocks.map((block) => ({
		id: Number(block[0]),
		timecode: block[1],
		text: block
			.slice(2)
			.join(' ')
			.replace(/<\/?i>|♪/g, '')
	}))

	return concatSubtitlesWithUncompleteSentences(uncompleteSubtitles)
}
