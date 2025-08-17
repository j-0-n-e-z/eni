import cn from 'classnames'
import type { FC } from 'react'

import { StarIcon } from '@/icons'
import type { MovieSubtitle as IMovieSubtitle } from '@/types'
import { NumberFormatter, USDateFormatter } from '@/utils'

import styles from './MovieSubtitlesPicker.module.scss'

interface MovieSubtitleProps {
	movieSubtitle: IMovieSubtitle
	pickMovieSubtitle: (movieSubtitle: IMovieSubtitle) => void
}

export const MovieSubtitle: FC<MovieSubtitleProps> = ({
	movieSubtitle,
	pickMovieSubtitle
}) => (
	<li className={styles.movieSub}>
		<div className={styles.movieSubRating}>
			{Array.from({ length: 10 }).map((_, i) => (
				<StarIcon
					className={cn(styles.star, {
						[styles.filled]: i + 1 <= movieSubtitle.subtitles.rating
					})}
				/>
			))}
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
					{USDateFormatter.format(new Date(movieSubtitle.upload_date))}
				</span>
			</div>

			<div className={styles.metaRow}>
				<span className={styles.metaLabel}>Автор:</span>
				<span className={styles.metaValue}>{movieSubtitle.uploader}</span>
			</div>
		</div>

		<button
			className={styles.pickMovieSubBtn}
			onClick={() => pickMovieSubtitle(movieSubtitle)}
		>
			Выбрать
		</button>
	</li>
)
