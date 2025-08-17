import { useState, type FC } from 'react'

import { MovieSubtitlesPicker, Subtitles } from '@/components'
import type { MovieSubtitle, Word } from '@/types'

interface SubtitlesSectionProps {
	lookupWord?: Word
	imdbId: string
}

export const SubtitlesSection: FC<SubtitlesSectionProps> = ({
	lookupWord,
	imdbId
}) => {
	const [pickedMovieSubtitle, setPickedMovieSubtitle] =
		useState<MovieSubtitle | null>(null)

	if (lookupWord) {
		return <Subtitles fileId={lookupWord.from.fileId} lookupWord={lookupWord} />
	}

	return (
		<>
			{!pickedMovieSubtitle && (
				<MovieSubtitlesPicker
					imdbId={imdbId}
					pickMovieSubtitle={setPickedMovieSubtitle}
				/>
			)}

			{pickedMovieSubtitle && (
				<Subtitles fileId={pickedMovieSubtitle.subtitles.file_id} />
			)}
		</>
	)
}
