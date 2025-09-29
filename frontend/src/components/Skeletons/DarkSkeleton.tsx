import type { SkeletonProps } from 'react-loading-skeleton'
import ReactLoadingSkeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const DarkSkeleton = (props: SkeletonProps) => (
	<ReactLoadingSkeleton
		{...props}
		baseColor='#2d3846'
		containerClassName='flex1'
		highlightColor='#364252'
	/>
)
