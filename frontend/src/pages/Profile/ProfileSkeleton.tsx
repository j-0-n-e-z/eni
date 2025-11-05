import { Container, Skeleton } from '@/ui'

import styles from './Profile.module.scss'

export const ProfileSkeleton = () => (
	<Container className={styles.profilePage}>
		<div className={styles.profileHeader}>
			<div className={styles.headerContent}>
				<Skeleton circle containerClassName='' height='5rem' width='5rem' />

				<div className={styles.userInfo}>
					<h2 className={styles.username}>
						<Skeleton width='25%' />
					</h2>
					<p className={styles.email}>
						<Skeleton width='calc(5rem*3 + 2rem*2)' />
					</p>
					<div className={styles.stats}>
						<Skeleton width='5rem' />
						<Skeleton width='5rem' />
						<Skeleton width='5rem' />
					</div>
				</div>
			</div>
		</div>
	</Container>
)
