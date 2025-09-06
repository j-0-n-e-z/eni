import { SkeletonTheme, type SkeletonProps } from 'react-loading-skeleton'

import { Skeleton } from './Skeleton'

export const DarkSkeleton = (props: SkeletonProps) => (
	<SkeletonTheme baseColor='#1e293b' highlightColor='#2e3f5aff'>
		<Skeleton {...props} />
	</SkeletonTheme>
)
