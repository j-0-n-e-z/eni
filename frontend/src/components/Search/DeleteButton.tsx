import type { FC } from 'react'

import { TrashIcon } from '@/icons'

import styles from './Search.module.scss'

interface DeleteButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DeleteButton: FC<DeleteButtonProps> = ({ ...props }) => (
	<button className={styles.deleteBtn} {...props}>
		<TrashIcon className={styles.deleteBtnIcon} />
	</button>
)
