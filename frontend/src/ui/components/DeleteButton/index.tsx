import cn from 'classnames'
import type { FC } from 'react'

import { TrashIcon } from '@/ui/icons'

import styles from './DeleteButton.module.scss'

interface DeleteButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DeleteButton: FC<DeleteButtonProps> = ({
	className,
	...props
}) => (
	<button className={cn(styles.deleteBtn, className)} {...props}>
		<TrashIcon className={styles.deleteBtnIcon} />
	</button>
)
