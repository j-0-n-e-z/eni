import { DarkSkeleton } from '../Skeletons/DarkSkeleton'

import styles from './SidePanel.module.scss'

export const SidePanelSkeleton = () => (
	<DarkSkeleton className={styles.sidepanel} />
)
