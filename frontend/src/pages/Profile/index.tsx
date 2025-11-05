import { useParams } from 'react-router-dom'

import { useAuthData } from '@/hooks'

import { ProfileSkeleton } from './ProfileSkeleton'
import { MyProfile } from './components/MyProfile'
import { UserProfile } from './components/UserProfile'

export const Profile = () => {
	const { me } = useAuthData()
	const { username } = useParams()

	if (!me || !username) return <ProfileSkeleton />

	return me.username === username ? (
		<MyProfile />
	) : (
		<UserProfile username={username} />
	)
}
