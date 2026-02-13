import { useOutletContext } from 'react-router-dom'

import type { MovieSubtitlesContext } from '@/frontend-types'
import { useGetMovieSubtitlesQuery } from '@/store/api'
import { Container, EmptyState, ErrorDisplay, Icons } from '@/ui'

import { MovieSubtitle } from './MovieSubtitle'
import { MovieSubtitlesPickerSkeleton } from './MovieSubtitlesPickerSkeleton'

import styles from './MovieSubtitlesPicker.module.scss'

export const MovieSubtitlesPicker = () => {
	const { imdbId, movieName } = useOutletContext<MovieSubtitlesContext>()
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
				icon={<Icons.SubtitleIcon />}
			/>
		)

	return (
		<Container className={styles.movieSubsPicker}>
			<h3 className={styles.movieSubsHeader}>Выберите субтитры</h3>
			<ul className={styles.movieSubList}>
				{movieSubtitles.map((movieSubtitle) => (
					<MovieSubtitle key={movieSubtitle.id} movieSubtitle={movieSubtitle} />
				))}
			</ul>
		</Container>
	)
}
