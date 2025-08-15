import { useEffect, type FC } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'

import {
	useGetMovieBoxOfficeByKinopoiskIdQuery,
	useGetMovieByKinopoiskIdQuery,
	useGetMovieSubtitlesByImdbIdQuery
} from '@/api'

import '../../App.scss'

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

	const {
		data: boxOffice,
		error: boxOfficeError,
		isLoading: isBoxOfficeLoading
	} = useGetMovieBoxOfficeByKinopoiskIdQuery(movieId, {
		skip: !movieId
	})

	const {
		data: movieSubtitles,
		isError: movieSubtitlesError,
		isLoading: isMovieSubtitlesLoading
	} = useGetMovieSubtitlesByImdbIdQuery(movie?.imdbId || '', {
		skip: !movie?.imdbId || Boolean(lookupWord)
	})

	const budget = boxOffice?.items.find((item) => item.type === 'BUDGET')
	const world = boxOffice?.items.find((item) => item.type === 'WORLD')

	useEffect(() => {
		if (boxOfficeError)
			toast.error('Faild to load budget and box office', { id: 'box-office' })
	}, [boxOfficeError])

	useEffect(() => {
		if (movieSubtitlesError)
			toast.error('Faild to load movie subtitles', { id: 'movie-subtitles' })
	}, [movieSubtitlesError])

	if (!id) return <div>Не найден id фильма</div>
	if (isMovieLoading) return <div>...Загрузка</div>
	if (movieError)
		return (
			<div>
				{'data' in movieError
					? (movieError.data as { message: string }).message
					: 'unknown error'}
			</div>
		)

	if (!movie) return <div>Фильм не найден</div>

	return (
		<div className={styles.movieSubsContainer}>
			<MovieInfoSection
				budget={budget}
				isBoxOfficeLoading={isBoxOfficeLoading}
				movie={movie}
				world={world}
			/>

			<SubtitlesSection
				isMovieSubtitlesLoading={isMovieSubtitlesLoading}
				lookupWord={lookupWord}
				movieSubtitles={movieSubtitles}
			/>
			<Toaster position='top-right' />
		</div>
	)
}
