import cn from 'classnames'
import { useOutletContext } from 'react-router-dom'

import type { MovieContext } from '@/frontend-types'
import type { MovieSubtitle as IMovieSubtitle } from '@/types'
import { Button, Icons } from '@/ui'
import { DateFormatter, NumberFormatter } from '@/utils'

import styles from './MovieSub.module.scss'

interface MovieSubProps {
	movieSubtitle: IMovieSubtitle
}

export const MovieSub = ({ movieSubtitle }: MovieSubProps) => {
	const { goToSubtitles, kinopoiskId } = useOutletContext<MovieContext>()

	const ratingStars = Array.from({ length: 10 }).map((_, i) => (
		<Icons.Star
			key={`star_${i}`}
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

			<ul className={styles.movieSubMeta}>
				<li className={styles.metaRow}>
					<span className={styles.metaLabel}>Скачиваний:</span>
					<span className={styles.metaValue}>
						{NumberFormatter.format(movieSubtitle.download_count)}
					</span>
				</li>

				<li className={styles.metaRow}>
					<span className={styles.metaLabel}>Загружено:</span>
					<span className={styles.metaValue}>
						{DateFormatter.format(new Date(movieSubtitle.upload_date))}
					</span>
				</li>

				<li className={styles.metaRow}>
					<span className={styles.metaLabel}>Автор:</span>
					<span className={styles.metaValue}>{movieSubtitle.uploader}</span>
				</li>
			</ul>

			<Button
				variant='contained'
				onClick={() =>
					goToSubtitles(kinopoiskId, movieSubtitle.subtitles.file_id)
				}
			>
				Загрузить
			</Button>
		</li>
	)
}
