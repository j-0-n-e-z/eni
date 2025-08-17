import { type FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'

import { useGetMovieByKinopoiskIdQuery } from '@/api'
import type { Word } from '@/types'

import { MovieInfoSection } from './MovieInfoSection'
import styles from './MovieSubtitlesPage.module.scss'
import { SubtitlesSection } from './SubtitlesSection'

export const MovieSubtitlesPage: FC = () => {
	const { id } = useParams<{ id: string }>()
	const movieId = Number(id)
	const location = useLocation()
	const lookupWord = (location?.state as { lookupWord?: Word })?.lookupWord

	const {
		data: movie,
		error: movieError,
		isLoading: isMovieLoading
	} = useGetMovieByKinopoiskIdQuery(movieId, {
		skip: !movieId
	})

	if (Number.isNaN(movieId)) return <div>Отсутствует id фильма</div>

	if (isMovieLoading) return <div>...Загрузка</div>

	if (!isMovieLoading && movieError)
		return <div>JSON.stringify(movieError)</div>

	if (!isMovieLoading && !movie) return <div>Нет данных о фильме</div>

	return (
		<div className={styles.movieSubsContainer}>
			<MovieInfoSection movie={movie} />

			<section className={styles.subtitlesSection}>
				{!movie.imdbId && (
					<div>Не удалось загрузить субтитры, отсутствует imdbId</div>
				)}

				{movie.imdbId && (
					<SubtitlesSection imdbId={movie.imdbId} lookupWord={lookupWord} />
				)}
			</section>

			<Toaster position='top-right' />
		</div>
	)
}
