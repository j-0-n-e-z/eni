import type { FC } from 'react'

import { useGetUserByUsernameQuery } from '@/store/api'
import { ErrorDisplay } from '@/ui'

import { ProfileSkeleton } from '../../ProfileSkeleton'
import { ProfileContent } from '../ProfileContent'

interface UserProfileProps {
	username: string
}

export const UserProfile: FC<UserProfileProps> = ({ username }) => {
	const {
		data: user,
		isFetching: isUserFetcing,
		error: userError
	} = useGetUserByUsernameQuery(username)

	if (userError) return <ErrorDisplay error={userError} />

	if (isUserFetcing || !user) return <ProfileSkeleton />

	return <ProfileContent isMyProfile={false} user={user} />
}
