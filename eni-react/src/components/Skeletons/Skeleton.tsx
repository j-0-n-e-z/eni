import type { SkeletonProps } from 'react-loading-skeleton'
import ReactLoadingSkeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Skeleton = (props: SkeletonProps) => (
	<ReactLoadingSkeleton containerClassName='flex1' {...props} />
)
