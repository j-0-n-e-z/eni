import cn from 'classnames'
import type { FC } from 'react'
import { useOutletContext } from 'react-router-dom'

import type { MovieSubtitlesContext } from '@/frontend-types'
import type { MovieSubtitle as IMovieSubtitle } from '@/types'
import { Icons } from '@/ui'
import { DateFormatter, NumberFormatter } from '@/utils'

import styles from './MovieSubtitle.module.scss'

interface MovieSubtitleProps {
	movieSubtitle: IMovieSubtitle
}

export const MovieSubtitle: FC<MovieSubtitleProps> = ({ movieSubtitle }) => {
	const { goToSubtitles, movieKinopoiskId } =
		useOutletContext<MovieSubtitlesContext>()

	const ratingStars = Array.from({ length: 10 }).map((_, i) => (
		<Icons.StarIcon
			key={i}
			className={cn(styles.star, {
				[styles.filled]: i + 1 <= movieSubtitle.subtitles.rating
			})}
		/>
	))

	return (
		<li className={styles.movieSub}>
			<div className={styles.movieSubRating}>
				<div className={styles.stars}>{ratingStars}</div>
				<div className={styles.rating}>{movieSubtitle.subtitles.rating}/10</div>
			</div>

			<div className={styles.movieSubMeta}>
				<div className={styles.metaRow}>
					<span className={styles.metaLabel}>Скачиваний:</span>
					<span className={styles.metaValue}>
						{NumberFormatter.format(movieSubtitle.download_count)}
					</span>
				</div>

				<div className={styles.metaRow}>
					<span className={styles.metaLabel}>Загружено:</span>
					<span className={styles.metaValue}>
						{DateFormatter.format(new Date(movieSubtitle.upload_date))}
					</span>
				</div>

				<div className={styles.metaRow}>
					<span className={styles.metaLabel}>Автор:</span>
					<span className={styles.metaValue}>{movieSubtitle.uploader}</span>
				</div>
			</div>

			<button
				className={styles.pickMovieSubBtn}
				onClick={() =>
					goToSubtitles(movieKinopoiskId, movieSubtitle.subtitles.file_id)
				}
			>
				Загрузить
			</button>
		</li>
	)
}
