import { Skeleton } from '@/ui'

import styles from './SidePanel.module.scss'

export const SidePanelSkeleton = () => (
	<aside
		aria-busy='true'
		aria-label='loading navigation'
		className={styles.sidepanel}
	>
		<Skeleton containerClassName='flex1' height='100%' variant='dark' />
	</aside>
)
