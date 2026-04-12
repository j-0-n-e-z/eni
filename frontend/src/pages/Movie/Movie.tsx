import { Outlet, useParams } from 'react-router-dom'

import { useGetMovieByKinopoiskIdQuery } from '@/store/api'
import { EmptyState, ErrorDisplay, Icons } from '@/ui'

import { Info } from './components/Info/Info'
import { InfoSkeleton } from './components/Info/InfoSkeleton'

import styles from './Movie.module.scss'

export const Movie = () => {
	const params = useParams()
	const kinopoiskId = Number(params.kinopoiskId)
	const {
		data: movie,
		error: movieError,
		isFetching: isMovieFetching
	} = useGetMovieByKinopoiskIdQuery(kinopoiskId, {
		skip: !kinopoiskId
	})

	if (!kinopoiskId)
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

	const movieContext: MovieContext = {
		imdbId: movie.imdbId,
		kinopoiskId,
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
