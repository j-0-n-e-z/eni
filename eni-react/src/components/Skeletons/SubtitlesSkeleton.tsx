import paginatorStyles from '../Paginator/Paginator.module.scss'
import styles from '../Subtitles/Subtitles.module.scss'

import { Skeleton } from './Skeleton'

export const SubtitlesSkeleton = () => (
	<div>
		<div className={styles.controlPanel}>
			<div className={paginatorStyles.paginator}>
				<div className={paginatorStyles.pageButtonsContainer}>
					{Array.from({ length: 7 }).map((_, i) => (
						<Skeleton
							key={`sk_pageBtn_${i}`}
							height='3.25rem'
							width='3.25rem'
						/>
					))}
				</div>
			</div>
		</div>
		<div className={styles.subtitles}>
			<Skeleton height='5rem' />
			<Skeleton height='5rem' />
			<Skeleton height='5rem' />
		</div>
	</div>
)
