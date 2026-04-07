import { Skeleton } from '@/ui'

import styles from './SubsPicker.module.scss'

export const SubsPickerSkeleton = () => (
	<div className={styles.subsPicker}>
		<Skeleton
			containerClassName={styles.subsHeader}
			height='2rem'
			width='20rem'
		/>
		<ul className={styles.subList}>
			{Array.from({ length: 5 }).map((_, i) => (
				<Skeleton
					key={`sk_moviesubs_${i}`}
					containerClassName='flex1 round'
					style={{
						maxWidth: 300,
						minHeight: 250
					}}
				/>
			))}
		</ul>
	</div>
)
