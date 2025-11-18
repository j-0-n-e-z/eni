import { Icons } from '@/ui'

import styles from '../../Profile.module.scss'

interface ProfileHeaderProps {
	username: string
	email: string
	savedWordsCount: number
}

export const ProfileHeader = ({
	username,
	email,
	savedWordsCount
}: ProfileHeaderProps) => (
	<section className={styles.profileHeader}>
		<div className={styles.headerContent}>
			<div className={styles.avatarContainer}>
				<div className={styles.avatar}>
					<Icons.ProfileIcon />
				</div>
			</div>
			<div className={styles.userInfo}>
				<h2 className={styles.username}>{username}</h2>
				<p className={styles.email}>{email}</p>
				<div className={styles.stats}>
					<div className={styles.stat}>
						<span className={styles.number}>{savedWordsCount}</span>
						<span className={styles.label}>Всего слов</span>
					</div>
				</div>
			</div>
		</div>
	</section>
)
