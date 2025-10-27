import { type FC } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import type { MovieSubtitlesContext } from '@/frontend-types'
import { useGetMovieByKinopoiskIdQuery } from '@/store/api'
import { EmptyState, ErrorDisplay } from '@/ui'
import { EmptyIcon } from '@/ui/icons'

import styles from './MovieSubtitlesPage.module.scss'
import { MovieInfo } from './components/MovieInfo'
import { MovieInfoSkeleton } from './components/MovieInfo/MovieInfoSkeleton'

export const MovieSubtitles: FC = () => {
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

	const goToSubtitles = (kinopoiskId: number, subtitlesFileId: number) => {
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
	if (isMovieLoading) return <MovieInfoSkeleton />

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
		goToSubtitles,
		imdbId: movie.imdbId,
		movieKinopoiskId: movie.kinopoiskId,
		movieName: movie.nameOriginal ?? movie.nameEn ?? 'No title',
		posterUrl: movie.posterUrlPreview
	}

	return (
		<>
			<MovieInfo movie={movie} />
			<section className={styles.subtitlesSection}>
				<Outlet context={movieSubtitlesContext} />
			</section>
		</>
	)
}
