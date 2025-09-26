import type { SkeletonProps } from 'react-loading-skeleton'
import ReactLoadingSkeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const DarkSkeleton = (props: SkeletonProps) => (
  <ReactLoadingSkeleton {...props} containerClassName='flex1' baseColor='#2d3846' highlightColor='#364252'/>
)
