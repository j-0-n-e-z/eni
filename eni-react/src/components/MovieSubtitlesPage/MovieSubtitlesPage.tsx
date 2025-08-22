import { type FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { useGetMovieByKinopoiskIdQuery } from '@/api'
import type { Word } from '@/types'

import { MovieInfoSection } from './MovieInfoSection'
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
	} = useGetMovieByKinopoiskIdQuery(movieId || 0, {
		skip: !movieId
	})

	if (Number.isNaN(movieId)) return <div>Отсутствует id фильма</div>

	if (isMovieLoading) return <div>...Загрузка</div>

	if (movieError) return <div>JSON.stringify(movieError)</div>

	if (!movie) return <div>Нет данных о фильме</div>

	return (
		<>
			<MovieInfoSection movie={movie} />
			<SubtitlesSection imdbId={movie.imdbId} lookupWord={lookupWord} />
		</>
	)
}
