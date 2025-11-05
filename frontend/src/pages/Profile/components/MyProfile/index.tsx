import { useAuthData } from '@/hooks'
import { ErrorDisplay } from '@/ui'

import { ProfileSkeleton } from '../../ProfileSkeleton'
import { ProfileContent } from '../ProfileContent'

export const MyProfile = () => {
	const { me, meError, isMeFetching } = useAuthData()

	if (meError) return <ErrorDisplay error={meError} />

	if (isMeFetching || !me) return <ProfileSkeleton />

	return <ProfileContent isMyProfile user={me} />
}
