import type { FC } from 'react'
import { useOutletContext } from 'react-router-dom'

import { EmptyState, ErrorDisplay, MovieSubtitle } from '@/components'
import type { MovieSubtitlesContext } from '@/frontend-types'
import { SubtitleIcon } from '@/icons'
import { useGetMovieSubtitlesQuery } from '@/store/api'

import styles from './MovieSubtitlesPicker.module.scss'
import { MovieSubtitlesPickerSkeleton } from './MovieSubtitlesPickerSkeleton'

export const MovieSubtitlesPicker: FC = () => {
	const { imdbId, movieName, pickMovieSubtitle } =
		useOutletContext<MovieSubtitlesContext>()
	const query = imdbId || movieName
	const {
		data: movieSubtitles,
		error: movieSubtitlesError,
		isLoading: isMovieSubtitlesLoading
	} = useGetMovieSubtitlesQuery(query || '', {
		skip: !query
	})

	if (isMovieSubtitlesLoading) return <MovieSubtitlesPickerSkeleton />

	if (movieSubtitlesError) return <ErrorDisplay error={movieSubtitlesError} />

	if (!movieSubtitles?.length)
		return (
			<EmptyState
				description='Варианты субтитров не найдены'
				header='Не найдено'
				icon={<SubtitleIcon />}
			/>
		)

	return (
		<div className={styles.movieSubsPicker}>
			<h3 className={styles.movieSubsHeader}>Выберите субтитры</h3>
			<ul className={styles.movieSubList}>
				{movieSubtitles.map((movieSubtitle) => (
					<MovieSubtitle
						key={movieSubtitle.id}
						movieSubtitle={movieSubtitle}
						pickMovieSubtitle={pickMovieSubtitle}
					/>
				))}
			</ul>
		</div>
	)
}
