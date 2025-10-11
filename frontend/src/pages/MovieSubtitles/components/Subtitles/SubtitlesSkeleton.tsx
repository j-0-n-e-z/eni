import { Skeleton } from '@/ui'

import paginatorStyles from './Paginator/Paginator.module.scss'
import styles from './Subtitles.module.scss'

export const SubtitlesSkeleton = () => (
	<div>
		<div className={styles.controlPanel}>
			<div className={paginatorStyles.paginator}>
				<div className={paginatorStyles.pageBtnsContainer}>
					{Array.from({ length: 4 }).map((_, i) => (
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
			<Skeleton containerClassName='round' height='5rem' />
			<Skeleton containerClassName='round' height='5rem' />
			<Skeleton containerClassName='round' height='5rem' />
		</div>
	</div>
)
