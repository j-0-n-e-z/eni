import { DarkSkeleton } from '@/components'

import styles from './MovieSubtitlesPage.module.scss'

export const MovieSubtitlesPageSkeleton = () => (
	<section
		className={styles.movieInfoSection}
		style={{ paddingBottom: '2rem' }}
	>
		<div className={styles.heroContainer}>
			<div className={styles.cover}>
				<DarkSkeleton className={styles.coverImg} width='300px' />
			</div>
			<div className={styles.movieInfoWrapper}>
				<DarkSkeleton
					containerClassName={styles.titleWrapper}
					height='2rem'
					width='50%'
				/>

				<div className={styles.details}>
					<DarkSkeleton className={styles.slogan} width='75%' />

					<DarkSkeleton className={styles.duration} width='6rem' />

					<div className={styles.movieMeta} style={{ columnGap: '1rem' }}>
						<DarkSkeleton />
						<DarkSkeleton />
						<DarkSkeleton />
						<DarkSkeleton />
						<DarkSkeleton />
						<DarkSkeleton />
					</div>

					<ul className={styles.genres} style={{ gap: '1rem' }}>
						<DarkSkeleton width='6rem' />
						<DarkSkeleton width='6rem' />
						<DarkSkeleton width='6rem' />
					</ul>

					<DarkSkeleton />
				</div>
			</div>
		</div>
	</section>
)
