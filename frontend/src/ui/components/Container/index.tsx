import cn from 'classnames'
import type { ReactNode } from 'react'

import styles from './Container.module.scss'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

export const Container = ({
	children,
	className,
	...props
}: ContainerProps) => (
	<div className={cn(styles.container, className)} {...props}>
		{children}
	</div>
)
