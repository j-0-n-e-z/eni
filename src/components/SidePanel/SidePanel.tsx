import cn from 'classnames'

import { useAppSelector } from '@/app/index'
import { selectWords } from '@/slices'

import styles from './SidePanel.module.scss'

export const SidePanel = () => {
	const { words } = useAppSelector(selectWords)

	return (
		<aside className={styles.sidepanel}>
			<a className={styles.topLogo} href='/' target='_self'>
				<img
					alt='logo'
					className={styles.logo}
					src='/assets/images/eni_huge_logo.webp'
				/>
			</a>
			<nav className={styles.navigation}>
				<a className={styles.navItem} href='/'>
					search
				</a>
				<a className={styles.navItem} href='/popular' target='_self'>
					popular
				</a>
				<a className={cn(styles.navItem, styles.words)} href='/words'>
					<span>W</span>
					{!!words.length && (
						<div className={styles.wordsCountWrapper}>
							<div className={styles.wordsCount}>{words.length}</div>
						</div>
					)}
				</a>
				{/* settings should be shown only if logged in */}
				<a className={styles.navItem} href='/settings'>
					settings
				</a>
				<a className={styles.navItem} href='/info'>
					info
				</a>
				<a className={cn(styles.navItem, styles.logout)} href='/logout'>
					logout
				</a>
			</nav>
		</aside>
	)
}
