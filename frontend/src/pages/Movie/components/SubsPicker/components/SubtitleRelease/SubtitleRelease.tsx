import type { SubtitleRelease as ISubtitleRelease } from '@eni/shared'
import cn from 'classnames'
import { useNavigate, useOutletContext } from 'react-router-dom'

import { Button, Icons } from '@/ui'
import { DateFormatter, NumberFormatter } from '@/utils'

import styles from './SubtitleRelease.module.scss'

interface SubtitleReleaseProps {
	subtitleRelease: ISubtitleRelease
}

export const SubtitleRelease = ({ subtitleRelease }: SubtitleReleaseProps) => {
	const navigate = useNavigate()
	const { kinopoiskId } = useOutletContext<MovieContext>()

	const ratingStars = Array.from({ length: 10 }).map((_, i) => (
		<Icons.Star
			key={`star_${i}`}
			className={cn(styles.star, {
				[styles.filled]: i + 1 <= subtitleRelease.subtitles.rating
			})}
		/>
	))

	const handlePickSubtitles = () => {
		const fileId = subtitleRelease.subtitles.file_id
		navigate(`/movie/${kinopoiskId}/subtitles/${fileId}?page=1`)
	}

	return (
		<li className={styles.sub}>
			<div className={styles.subRating}>
				<div className={styles.stars}>{ratingStars}</div>
				<div className={styles.rating}>
					{subtitleRelease.subtitles.rating}/10
				</div>
			</div>

			<ul className={styles.subMeta}>
				<li className={styles.metaRow}>
					<span className={styles.metaLabel}>Скачиваний:</span>
					<span className={styles.metaValue}>
						{NumberFormatter.format(subtitleRelease.download_count)}
					</span>
				</li>

				<li className={styles.metaRow}>
					<span className={styles.metaLabel}>Загружено:</span>
					<span className={styles.metaValue}>
						{DateFormatter.format(new Date(subtitleRelease.upload_date))}
					</span>
				</li>

				<li className={styles.metaRow}>
					<span className={styles.metaLabel}>Автор:</span>
					<span className={styles.metaValue}>{subtitleRelease.uploader}</span>
				</li>
			</ul>

			<Button variant='contained' onClick={handlePickSubtitles}>
				Загрузить
			</Button>
		</li>
	)
}
