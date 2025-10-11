import type { SkeletonProps as ReactLoadingSkeletonProps } from 'react-loading-skeleton'
import ReactLoadingSkeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type SkeletonProps = ReactLoadingSkeletonProps & { variant?: 'light' | 'dark' }

export const Skeleton = (props: SkeletonProps) => {
	const { variant } = props

	if (!variant || variant === 'light')
		return <ReactLoadingSkeleton {...props} />

	return (
		<ReactLoadingSkeleton
			{...props}
			baseColor='#2d3846'
			highlightColor='#364252'
		/>
	)
}
