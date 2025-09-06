import styles from '../Search/Search.module.scss'

import { Skeleton } from './Skeleton'

export const SearchResultsSkeleton = () => (
	<div className={styles.searchResultsContainer}>
		<h2 className={styles.header}>
			<Skeleton width='20rem' />
		</h2>
		<ul className={styles.searchResultList}>
			{Array.from({ length: 5 }).map((_, i) => (
				<li key={`sk_search_${i}`} className={styles.searchResultItem}>
					<div className={styles.movieCard}>
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
