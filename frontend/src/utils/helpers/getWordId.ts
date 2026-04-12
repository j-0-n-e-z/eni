export const getWordId = (
	kinopoiskId: number,
	fileId: number,
	timecode: string,
	wordIndex: number
) => `${kinopoiskId}_${fileId}_${timecode}_${wordIndex}`
