import type { FC } from 'react'

import type { MovieSubtitle as IMovieSubtitle } from '@/types'
import { USDateFormatter } from '@/utils'

import styles from './MovieSubtitlesPicker.module.scss'

interface MovieSubtitleProps {
	movieSubtitle: IMovieSubtitle
	pickMovieSubtitle: (movieSubtitle: IMovieSubtitle) => void
}

export const MovieSubtitle: FC<MovieSubtitleProps> = ({
	movieSubtitle,
	pickMovieSubtitle
}) => (
	<li className={styles.movieSubItem}>
		<button
			className={styles.pickMovieSubBtn}
			onClick={() => pickMovieSubtitle(movieSubtitle)}
		>
			<span className={styles.title}>{movieSubtitle.title}</span>
			<span>{movieSubtitle.download_count}</span>
			<span className={styles.date}>
				{USDateFormatter.format(new Date(movieSubtitle.upload_date))}
			</span>
			<div
				style={{
					width: `${movieSubtitle.subtitles.rating * 10}%`,
					background: 'lightgreen'
				}}
			>
				{movieSubtitle.subtitles.rating}
			</div>
		</button>
	</li>
)
