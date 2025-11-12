import { Skeleton } from '@/ui'

import styles from './SidePanel.module.scss'

export const SidePanelSkeleton = () => (
	<aside className={styles.sidepanel}>
		<Skeleton containerClassName='flex1' height='100%' variant='dark' />
	</aside>
)
