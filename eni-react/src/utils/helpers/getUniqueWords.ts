import type { Word } from '@/types'

export function getUniqueWordsByTimecode(words: Word[], timecode: string) {
	const wordsByTimecode = words.filter(
		(word) => word.from.subtitleTimecode === timecode
	)
	const wordsFromJoined = wordsByTimecode.map((word) => word.words ?? []).flat()

	const allWordsByTimecode = wordsByTimecode.concat(wordsFromJoined)

	const uniqueWords = allWordsByTimecode.filter(
		(word, i) => allWordsByTimecode.findIndex((w) => w.id === word.id) === i
	)

	return uniqueWords
}
