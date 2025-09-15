import { useEffect, useState, type FC } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { EmptyState, ErrorDisplay } from '@/components'
import { EmptyIcon } from '@/icons'
import { useGetMovieByKinopoiskIdQuery } from '@/store/api'
import type { MovieSubtitle } from '@/types'

import type { MovieSubtitlesContext } from '../../types'

import { MovieInfoSection } from './MovieInfoSection'
import styles from './MovieSubtitlesPage.module.scss'
import { MovieSubtitlesPageSkeleton } from './MovieSubtitlesPageSkeleton'

export const MovieSubtitlesPage: FC = () => {
	const { movieId } = useParams()
	const navigate = useNavigate()
	const [pickedMovieSubtitle, setPickedMovieSubtitle] =
		useState<MovieSubtitle | null>(null)

	const {
		data: movie,
		error: movieError,
		isLoading: isMovieLoading
	} = useGetMovieByKinopoiskIdQuery(Number(movieId), {
		skip: !movieId
	})

	useEffect(() => {
		if (movie && pickedMovieSubtitle) {
			navigate(
				`/movie/${movie.kinopoiskId}/subtitles/${pickedMovieSubtitle.subtitles.file_id}?page=1`
			)
		}
	}, [pickedMovieSubtitle])

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

	const contextValue: MovieSubtitlesContext = {
		imdbId: movie.imdbId,
		movieName: movie.nameOriginal ?? movie.nameEn ?? 'No title',
		pickMovieSubtitle: setPickedMovieSubtitle,
		posterUrl: movie.posterUrlPreview
	}

	return (
		<>
			<MovieInfoSection movie={movie} />
			<section className={styles.subtitlesSection}>
				<Outlet context={contextValue} />
			</section>
		</>
	)
}
