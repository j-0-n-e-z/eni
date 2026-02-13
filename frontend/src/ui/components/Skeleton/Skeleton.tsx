import cn from 'classnames'
import type { SkeletonProps as ReactLoadingSkeletonProps } from 'react-loading-skeleton'
import ReactLoadingSkeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import styles from './Skeleton.module.scss'

interface SkeletonProps extends ReactLoadingSkeletonProps {
	variant?: 'light' | 'dark'
}

export const Skeleton = ({ variant, ...props }: SkeletonProps) => (
	<ReactLoadingSkeleton
		{...props}
		className={cn({
			[styles.light]: variant === 'light',
			[styles.dark]: variant === 'dark'
		})}
	/>
)
