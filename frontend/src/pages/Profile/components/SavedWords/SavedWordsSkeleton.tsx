import { Skeleton } from '@/ui'

import styles from './SavedWords.module.scss'

export const SavedWordsSkeleton = () => (
	<section className={styles.wordsSection}>
		<Skeleton
			containerClassName={styles.wordsSectionHeader}
			height='2rem'
			width='10rem'
		/>
		<div className={styles.wordsList}>
			<Skeleton height='2rem' />
			<Skeleton height='2rem' />
			<Skeleton height='2rem' />
		</div>
	</section>
)
