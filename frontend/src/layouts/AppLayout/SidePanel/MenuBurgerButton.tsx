import cn from 'classnames'
import { useState } from 'react'

import { BurgerMenuIcon, CancelIcon } from '@/ui'

import styles from './SidePanel.module.scss'

export const MenuBurgerButton = () => {
	const [isSidepanelOpen, setIsSidepanelOpen] = useState(false)

	return (
		<button
			aria-label='toggle sidepanel'
			className={cn(styles.sidepanelToggleBtn, {
				[styles.open]: isSidepanelOpen
			})}
			onClick={() => setIsSidepanelOpen((isOpen) => !isOpen)}
		>
			{isSidepanelOpen ? <CancelIcon /> : <BurgerMenuIcon />}
		</button>
	)
}
