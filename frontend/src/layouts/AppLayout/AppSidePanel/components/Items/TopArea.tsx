import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../SidePanel.module.scss'

interface TopAreaProps {
	children: ReactNode
}

export const TopArea = ({ children }: TopAreaProps) => (
	<Link aria-label='hero' className={styles.topArea} to='/'>
		{children}
	</Link>
)
