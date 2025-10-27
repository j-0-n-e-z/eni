import type { SkeletonProps as ReactLoadingSkeletonProps } from 'react-loading-skeleton'
import ReactLoadingSkeleton from 'react-loading-skeleton'

import {
	DARK_SKELETON_BASE_COLOR,
	DARK_SKELETON_HIGHLIGHT_COLOR
} from '@/config'
import 'react-loading-skeleton/dist/skeleton.css'

type SkeletonProps = ReactLoadingSkeletonProps & { variant?: 'light' | 'dark' }

export const Skeleton = (props: SkeletonProps) => {
	const { variant } = props

	if (!variant || variant === 'light')
		return <ReactLoadingSkeleton {...props} />

	return (
		<ReactLoadingSkeleton
			{...props}
			baseColor={DARK_SKELETON_BASE_COLOR}
			highlightColor={DARK_SKELETON_HIGHLIGHT_COLOR}
		/>
	)
}
