import { Skeleton } from '@/ui'

import styles from './MovieInfo.module.scss'

export const MovieInfoSkeleton = () => (
	<section
		className={styles.movieInfoSection}
		style={{ paddingBottom: '2rem' }}
	>
		<div className={styles.heroContainer}>
			<div className={styles.cover}>
				<Skeleton className={styles.coverImg} variant='dark' width='300px' />
			</div>
			<div className={styles.movieInfoWrapper}>
				<Skeleton
					containerClassName={styles.titleWrapper}
					height='2rem'
					variant='dark'
					width='50%'
				/>

				<div className={styles.details}>
					<Skeleton className={styles.slogan} variant='dark' width='75%' />

					<Skeleton className={styles.duration} variant='dark' width='6rem' />

					<div className={styles.movieMeta} style={{ columnGap: '1rem' }}>
						<Skeleton variant='dark' />
						<Skeleton variant='dark' />
						<Skeleton variant='dark' />
						<Skeleton variant='dark' />
						<Skeleton variant='dark' />
						<Skeleton variant='dark' />
					</div>

					<ul className={styles.genres} style={{ gap: '1rem' }}>
						<Skeleton variant='dark' width='6rem' />
						<Skeleton variant='dark' width='6rem' />
						<Skeleton variant='dark' width='6rem' />
					</ul>

					<Skeleton variant='dark' />
				</div>
			</div>
		</div>
	</section>
)
