import { Outlet, useNavigate, useParams } from 'react-router-dom'

import type { MovieContext } from '@/frontend-types'
import { useGetMovieByKinopoiskIdQuery } from '@/store/api'
import { EmptyState, ErrorDisplay, Icons } from '@/ui'

import { Info } from './components/Info/Info'
import { InfoSkeleton } from './components/Info/InfoSkeleton'

import styles from './Movie.module.scss'

export const Movie = () => {
	const params = useParams<{ movieId: string }>()
	const navigate = useNavigate()
	const movieId = Number(params.movieId)
	const {
		data: movie,
		error: movieError,
		isFetching: isMovieFetching
	} = useGetMovieByKinopoiskIdQuery(movieId, {
		skip: !movieId
	})

	if (!movieId)
		return (
			<EmptyState
				description='Отсутствует id фильма'
				header='Упс...'
				icon={<Icons.Empty />}
			/>
		)

	if (isMovieFetching) return <InfoSkeleton />

	if (movieError) return <ErrorDisplay error={movieError} />

	if (!movie)
		return (
			<EmptyState
				description='Нет данных о фильме'
				header='Упс...'
				icon={<Icons.Empty />}
			/>
		)

	const goToSubtitles = (kinopoiskId: number, subtitlesFileId: number) => {
		navigate(`/movie/${kinopoiskId}/subtitles/${subtitlesFileId}?page=1`)
	}

	const movieContext: MovieContext = {
		goToSubtitles,
		imdbId: movie.imdbId,
		kinopoiskId: movie.kinopoiskId,
		posterUrl: movie.posterUrlPreview,
		title: movie.nameOriginal ?? movie.nameEn ?? 'No title'
	}

	return (
		<>
			<Info movie={movie} />
			<section className={styles.subtitlesSection}>
				<Outlet context={movieContext} />
			</section>
		</>
	)
}
