import type { FC } from 'react'
import React from 'react'

import styles from './EmptyState.module.scss'

interface EmptyStateProps {
	icon: React.ReactNode
	header: string
	description: string
}

export const EmptyState: FC<EmptyStateProps> = ({
	icon,
	header,
	description
}) => (
	<div className={styles.emptyState}>
		{icon}
		<h2 className={styles.header}>{header}</h2>
		<p className={styles.description}>{description}</p>
	</div>
)
