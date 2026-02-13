import { Skeleton } from '@/ui'

import styles from './SearchResults.module.scss'
import movieCardStyles from '../MovieCard/MovieCard.module.scss'

export const SearchResultsSkeleton = () => (
	<>
		<h2 className={styles.header}>
			<Skeleton width='10rem' />
		</h2>
		<ul className={styles.searchResultList}>
			{Array.from({ length: 5 }).map((_, i) => (
				<li key={`sk_search_${i}`} className={movieCardStyles.searchResultItem}>
					<div className={movieCardStyles.movieCard}>
						<Skeleton className={movieCardStyles.cover} />
						<div className={movieCardStyles.details}>
							<Skeleton />
							<Skeleton className={movieCardStyles.year} width='5rem' />
						</div>
					</div>
				</li>
			))}
		</ul>
	</>
)
