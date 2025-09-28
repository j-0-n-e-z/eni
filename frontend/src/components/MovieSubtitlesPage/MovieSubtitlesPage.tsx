import { type FC } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { EmptyState, ErrorDisplay } from '@/components'
import { EmptyIcon } from '@/icons'
import { useGetMovieByKinopoiskIdQuery } from '@/store/api'

import type { MovieSubtitlesContext } from '../../frontend-types'

import { MovieInfoSection } from './MovieInfoSection'
import styles from './MovieSubtitlesPage.module.scss'
import { MovieSubtitlesPageSkeleton } from './MovieSubtitlesPageSkeleton'

export const MovieSubtitlesPage: FC = () => {
	const { movieId: movieIdFromUrl } = useParams()
	const movieId = Number(movieIdFromUrl)
	const navigate = useNavigate()
	const {
		data: movie,
		error: movieError,
		isLoading: isMovieLoading
	} = useGetMovieByKinopoiskIdQuery(movieId, {
		skip: Number.isNaN(movieId)
	})

	function goToMovieSubtitles(kinopoiskId: number, subtitlesFileId: number) {
		navigate(`/movie/${kinopoiskId}/subtitles/${subtitlesFileId}?page=1`)
	}

	if (Number.isNaN(movieId))
		return (
			<EmptyState
				description='Отсутствует id фильма'
				header='Упс...'
				icon={<EmptyIcon />}
			/>
		)

	if (isMovieLoading) return <MovieSubtitlesPageSkeleton />

	if (movieError) return <ErrorDisplay error={movieError} />

	if (!movie)
		return (
			<EmptyState
				description='Нет данных о фильме'
				header='Упс...'
				icon={<EmptyIcon />}
			/>
		)

	const movieSubtitlesContext: MovieSubtitlesContext = {
		goToMovieSubtitles,
		imdbId: movie.imdbId,
		movieKinopoiskId: movie.kinopoiskId,
		movieName: movie.nameOriginal ?? movie.nameEn ?? 'No title',
		posterUrl: movie.posterUrlPreview
	}

	return (
		<>
			<MovieInfoSection movie={movie} />
			<section className={styles.subtitlesSection}>
				<Outlet context={movieSubtitlesContext} />
			</section>
		</>
	)
}
