import { Skeleton } from '@/components'

import styles from './MovieSubtitlesPicker.module.scss'

export const MovieSubtitlesPickerSkeleton = () => (
	<div className={styles.movieSubsPicker}>
		<Skeleton
			containerClassName={styles.movieSubsHeader}
			height='2rem'
			width='20rem'
		/>
		<ul className={styles.movieSubList}>
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={`sk_moviesubs_${i}`}
					style={{ maxWidth: 300, minHeight: 250, width: '100%' }}
				>
					<Skeleton height='100%' width='100%' />
				</div>
			))}
		</ul>
	</div>
)
