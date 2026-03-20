import { useOutletContext } from 'react-router-dom'

import type { MovieContext } from '@/frontend-types'
import { useGetMovieSubtitlesQuery } from '@/store/api'
import { Container, EmptyState, ErrorDisplay, Icons } from '@/ui'

import { MovieSub } from './components/MovieSub/MovieSub'
import { SubsPickerSkeleton } from './SubsPickerSkeleton'

import styles from './SubsPicker.module.scss'

export const SubsPicker = () => {
	const { imdbId, title } = useOutletContext<MovieContext>()
	const query = imdbId || title
	const {
		data: movieSubtitles,
		error: movieSubtitlesError,
		isLoading: isMovieSubtitlesLoading
	} = useGetMovieSubtitlesQuery(query || '', {
		skip: !query
	})

	if (isMovieSubtitlesLoading) return <SubsPickerSkeleton />

	if (movieSubtitlesError) return <ErrorDisplay error={movieSubtitlesError} />

	if (!movieSubtitles?.length)
		return (
			<EmptyState
				description='Варианты субтитров не найдены'
				header='Не найдено'
				icon={<Icons.Subtitle />}
			/>
		)

	return (
		<Container className={styles.subsPicker}>
			<h3 className={styles.subsHeader}>Выберите субтитры</h3>
			<ul className={styles.subList}>
				{movieSubtitles.map((movieSubtitle) => (
					<MovieSub key={movieSubtitle.id} movieSubtitle={movieSubtitle} />
				))}
			</ul>
		</Container>
	)
}
