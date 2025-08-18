import { useState, type FC } from 'react'

import { MovieSubtitlesPicker, Subtitles } from '@/components'
import type { MovieSubtitle, Word } from '@/types'

import styles from './MovieSubtitlesPage.module.scss'

interface SubtitlesSectionProps {
	lookupWord?: Word
	imdbId: string | null
}

export const SubtitlesSection: FC<SubtitlesSectionProps> = ({
	lookupWord,
	imdbId
}) => {
	const [pickedMovieSubtitle, setPickedMovieSubtitle] =
		useState<MovieSubtitle | null>(null)

	function render() {
		if (!imdbId) {
			return <div>Не удалось загрузить субтитры, отсутствует imdbId</div>
		}

		if (lookupWord) {
			return (
				<Subtitles fileId={lookupWord.from.fileId} lookupWord={lookupWord} />
			)
		}

		if (pickedMovieSubtitle)
			return <Subtitles fileId={pickedMovieSubtitle.subtitles.file_id} />

		if (!pickedMovieSubtitle)
			return (
				<MovieSubtitlesPicker
					imdbId={imdbId}
					pickMovieSubtitle={setPickedMovieSubtitle}
				/>
			)

		return null
	}

	return <section className={styles.subtitlesSection}>{render()}</section>
}
