import cn from 'classnames'
import { useState } from 'react'

import { Icons } from '@/ui'

import styles from '../SidePanel.module.scss'

export const useMenuToggle = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState)

	const toggle = () => setIsOpen((prev) => !prev)
	const close = () => setIsOpen(false)
	const open = () => setIsOpen(true)

	return { close, isOpen, open, toggle }
}

export const MenuBurgerButton = () => {
	const { isOpen, toggle } = useMenuToggle()

	return (
		<button
			aria-controls='sidepanel'
			aria-expanded={isOpen}
			aria-label={isOpen ? 'close menu' : 'open menu'}
			type='button'
			className={cn(styles.sidepanelToggleBtn, {
				[styles.open]: isOpen
			})}
			onClick={toggle}
		>
			{isOpen ? <Icons.Cancel /> : <Icons.BurgerMenu />}
		</button>
	)
}
