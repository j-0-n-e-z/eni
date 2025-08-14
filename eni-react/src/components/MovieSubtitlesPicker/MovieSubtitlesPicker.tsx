import type { FC } from 'react'

import type { MovieSubtitle } from '@/types'
import { USDateFormatter } from '@/utils'

import styles from './MovieSubtitlesPicker.module.scss'

interface MovieSubtitlesPickerProps {
	movieSubtitles: MovieSubtitle[]
	pickMovieSubtitle: (movieSub: MovieSubtitle) => void
}

export const MovieSubtitlesPicker: FC<MovieSubtitlesPickerProps> = ({
	movieSubtitles,
	pickMovieSubtitle
}) => {
	console.log(movieSubtitles)
	return (
		<div className={styles.pickMovieSubs}>
			<ul className={styles.movieSubList}>
				{movieSubtitles?.map((movieSub) => (
					<li key={movieSub.id} className={styles.movieSubItem}>
						<button
							className={styles.pickMovieSubBtn}
							onClick={() => pickMovieSubtitle(movieSub)}
						>
							<span className={styles.title}>{movieSub.title}</span>
							<span className={styles.date}>
								{USDateFormatter.format(new Date(movieSub.upload_date))}
							</span>
							<div
								style={{
									width: `${movieSub.subtitles.rating * 10}%`,
									background: 'lightgreen'
								}}
							>
								{movieSub.subtitles.rating}
							</div>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
