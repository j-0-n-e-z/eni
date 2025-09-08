import { Skeleton } from '@/components'

import styles from './Search.module.scss'

export const SearchResultsSkeleton = () => (
	<div className={styles.searchResultsContainer}>
		<h2 className={styles.header}>
			<Skeleton width='20rem' />
		</h2>
		<ul className={styles.searchResultList}>
			{Array.from({ length: 5 }).map((_, i) => (
				<li key={`sk_search_${i}`}>
					<div className={styles.movieCard} style={{ pointerEvents: 'none' }}>
						<Skeleton className={styles.cover} />
						<div className={styles.details}>
							<Skeleton />
							<Skeleton className={styles.year} width='5rem' />
						</div>
					</div>
				</li>
			))}
		</ul>
	</div>
)
