export function includesWord(
	text: string,
	word: string,
	isCaseSensetive: boolean = false,
	isWholeMatch: boolean = false
) {
	if (!text || !word) return false

	if (isCaseSensetive && isWholeMatch)
		return new RegExp(`\\b${word}\\b`).test(text)

	if (isCaseSensetive && !isWholeMatch) return text.includes(word)

	if (!isCaseSensetive && isWholeMatch)
		return new RegExp(`\\b${word}\\b`, 'i').test(text)

	return new RegExp(word, 'i').test(text)
}
