import { Skeleton } from '@/ui'

import movieCardStyles from '../MovieCard/MovieCard.module.scss'
import styles from './SearchResults.module.scss'

export const SearchResultsSkeleton = () => (
	<>
		<h2 className={styles.header}>
			<Skeleton width='10rem' />
		</h2>
		<ul className={styles.searchResultList}>
			{Array.from({ length: 7 }).map((_, i) => (
				<li key={`sk_search_${i}`} className={movieCardStyles.searchResultItem}>
					<Skeleton
						containerClassName={movieCardStyles.movieCard}
						height={300}
						width='100%'
					/>
				</li>
			))}
		</ul>
	</>
)
