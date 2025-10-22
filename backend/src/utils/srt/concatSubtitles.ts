import type { PureSubtitle } from '@/types'

function isCompleteSentence(text: string) {
	return /((?<!\.)[.!?](?!\.)|[!?]\.{2}|\?!|!{2,3}|\?{2,3})$/.test(text)
}

function startsWithEllipsis(text: string) {
	return /^(…|[.]{3})/.test(text)
}

function endsWithEllipsis(text: string) {
	return /(…|[.]{3})$/.test(text)
}

function trimEllipsis(text: string) {
	switch (true) {
		case /^…/.test(text):
			return text.slice(1)
		case /^[.]{3}/.test(text):
			return text.slice(3)
		case /…$/.test(text):
			return text.slice(0, -1)
		case /[.]{3}$/.test(text):
			return text.slice(0, -3)
		default:
			return text
	}
}

export function concatSubtitlesWithUncompleteSentences(
	subtitles: PureSubtitle[]
): PureSubtitle[] {
	const completeSubtitles: PureSubtitle[] = []

	for (let i = 0; i < subtitles.length; i++) {
		const { timecode: startTimecode } = subtitles[i]
		let { text } = subtitles[i]
		let nextText = subtitles[i + 1]?.text

		while (nextText && !isCompleteSentence(text)) {
			if (endsWithEllipsis(text) && startsWithEllipsis(nextText)) {
				const trimmedText = trimEllipsis(text)
				const trimmedNextText = trimEllipsis(nextText)
				text = `${trimmedText} ${trimmedNextText}`
			} else {
				text += ` ${nextText}`
			}

			i++
			nextText = subtitles[i + 1]?.text
		}

		const endTimecode = subtitles[i].timecode
		const [startTime] = startTimecode.split('-->')
		const [, endTime] = endTimecode.split('-->')
		const timecode = `${startTime}-->${endTime}`

		completeSubtitles.push({
			timecode,
			text
		})
	}

	return completeSubtitles
}
