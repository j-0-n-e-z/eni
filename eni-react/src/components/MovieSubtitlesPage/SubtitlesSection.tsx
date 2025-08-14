import type { FC } from 'react'

import type { MovieSubtitle, Subtitle } from '@/types'

import { MovieSubtitlesPicker } from '../MovieSubtitlesPicker/MovieSubtitlesPicker'
import { Subtitles } from '../Subtitles/Subtitles'

interface SubtitlesSectionProps {
	isSubtitlesLoading: boolean
	isMovieSubtitlesLoading: boolean
	movieSubtitles?: MovieSubtitle[]
	subtitles?: Subtitle[]
	setPickedMovieSubtitles: (subtitle: MovieSubtitle) => void
}

export const SubtitlesSection: FC<SubtitlesSectionProps> = ({
	isSubtitlesLoading,
	isMovieSubtitlesLoading,
	subtitles,
	movieSubtitles,
	setPickedMovieSubtitles
}) => (
	<section>
		{isSubtitlesLoading && <div>...Загрузка субтитров</div>}
		{isMovieSubtitlesLoading && <div>...Загрузка вариантов субтитров</div>}
		{!isMovieSubtitlesLoading && !movieSubtitles && (
			<div>Не удалось загрузить варианты субтитров</div>
		)}

		{!isSubtitlesLoading && !subtitles && movieSubtitles && (
			<MovieSubtitlesPicker
				movieSubtitles={movieSubtitles}
				pickMovieSubtitle={setPickedMovieSubtitles}
			/>
		)}
		{subtitles && <Subtitles subtitles={subtitles} />}
	</section>
)
