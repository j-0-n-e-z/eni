import { useEffect, useState, type FC } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { MovieSubtitlesPageSkeleton } from '@/components'
import { useGetMovieByKinopoiskIdQuery } from '@/store/api'
import type { MovieSubtitle } from '@/types'

import type { MovieSubtitlesContext } from '../../types'

import { MovieInfoSection } from './MovieInfoSection'
import styles from './MovieSubtitlesPage.module.scss'

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

	if (Number.isNaN(movieId)) return <div>Отсутствует id фильма</div>

	if (isMovieLoading) return <MovieSubtitlesPageSkeleton />

	if (movieError) return <div>{JSON.stringify(movieError)}</div>

	if (!movie) return <div>Нет данных о фильме</div>

	const contextValue: MovieSubtitlesContext = {
		imdbId: movie.imdbId,
		movieName: movie.nameOriginal ?? movie.nameEn,
		pickMovieSubtitle: setPickedMovieSubtitle
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
