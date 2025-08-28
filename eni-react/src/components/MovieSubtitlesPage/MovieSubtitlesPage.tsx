import { useEffect, useState, type FC } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import { useGetMovieByKinopoiskIdQuery } from '@/store/api'
import type { MovieSubtitle, Word } from '@/types'

import type { MovieSubtitlesContext } from '../../types'

import { MovieInfoSection } from './MovieInfoSection'
import styles from './MovieSubtitlesPage.module.scss'

export const MovieSubtitlesPage: FC = () => {
	const { movieId } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [pickedMovieSubtitle, setPickedMovieSubtitle] =
		useState<MovieSubtitle | null>(null)
	const lookupWord = (location?.state as { lookupWord?: Word })?.lookupWord

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

	if (isMovieLoading) return <div>...Загрузка</div>

	if (movieError) return <div>{JSON.stringify(movieError)}</div>

	if (!movie) return <div>Нет данных о фильме</div>

	if (!movie.imdbId) {
		return <div>Не удалось загрузить субтитры, отсутствует imdbId</div>
	}

	const contextValue: MovieSubtitlesContext = {
		pickMovieSubtitle: setPickedMovieSubtitle,
		imdbId: movie.imdbId,
		lookupWord
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
