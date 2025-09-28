import cn from 'classnames'
import { useState } from 'react'

import { BurgerMenuIcon, CancelIcon } from '@/icons'

import styles from '../SidePanel.module.scss'

export const MenuBurgerButton = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<button
			aria-label='toggle sidepanel'
			className={cn(styles.sidepanelMobileBtn, {
				[styles.open]: isOpen
			})}
			onClick={() => setIsOpen((isOpen) => !isOpen)}
		>
			{isOpen ? <CancelIcon /> : <BurgerMenuIcon />}
		</button>
	)
}
