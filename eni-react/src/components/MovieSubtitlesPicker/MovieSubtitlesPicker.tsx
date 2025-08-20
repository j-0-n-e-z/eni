import type { FC } from 'react'

import { useGetMovieSubtitlesByImdbIdQuery } from '@/api'
import type { MovieSubtitle as IMovieSubtitle } from '@/types'

import { MovieSubtitle } from './MovieSubtitle'
import styles from './MovieSubtitlesPicker.module.scss'

interface MovieSubtitlesPickerProps {
	pickMovieSubtitle: (movieSubtitle: IMovieSubtitle) => void
	imdbId: string
}

export const MovieSubtitlesPicker: FC<MovieSubtitlesPickerProps> = ({
	pickMovieSubtitle,
	imdbId
}) => {
	const {
		data: movieSubtitles,
		error: movieSubtitlesError,
		isLoading: isMovieSubtitlesLoading
	} = useGetMovieSubtitlesByImdbIdQuery(imdbId || '', {
		skip: !imdbId
	})

	if (isMovieSubtitlesLoading) return <div>...Загрузка вариантов субтитров</div>

	if (movieSubtitlesError)
		return <div>Error: {JSON.stringify(movieSubtitlesError)}</div>

	if (!movieSubtitles?.length) return <div>Варианты субтитров не найдены</div>

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
