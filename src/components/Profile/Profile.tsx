import { useAuth } from '@/hooks'

export const Profile = () => {
	const { user } = useAuth()

	return <div>{user?.username}</div>
}
