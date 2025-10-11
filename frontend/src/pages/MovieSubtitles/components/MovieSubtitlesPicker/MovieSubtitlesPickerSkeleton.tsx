import { Skeleton } from '@/ui'

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
				<Skeleton
					key={`sk_moviesubs_${i}`}
					containerClassName='flex1 round'
					style={{
						maxWidth: 300,
						minHeight: 250
					}}
				/>
			))}
		</ul>
	</div>
)
