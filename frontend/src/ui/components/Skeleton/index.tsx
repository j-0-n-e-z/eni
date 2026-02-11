import type { SkeletonProps as ReactLoadingSkeletonProps } from 'react-loading-skeleton'
import ReactLoadingSkeleton from 'react-loading-skeleton'

import {
	DARK_SKELETON_BASE_COLOR,
	DARK_SKELETON_HIGHLIGHT_COLOR
} from '@/constants'
import 'react-loading-skeleton/dist/skeleton.css'

interface SkeletonProps extends ReactLoadingSkeletonProps {
	variant?: 'light' | 'dark'
}

export const Skeleton = ({ variant, ...rest }: SkeletonProps) => {
	if (!variant || variant === 'light') return <ReactLoadingSkeleton {...rest} />

	return (
		<ReactLoadingSkeleton
			{...rest}
			baseColor={DARK_SKELETON_BASE_COLOR}
			highlightColor={DARK_SKELETON_HIGHLIGHT_COLOR}
		/>
	)
}
