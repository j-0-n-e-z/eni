import { useParams } from 'react-router-dom'

import { useGetUserByUsernameQuery } from '@/api/userApi'
import { useAuth } from '@/hooks'

export const Profile = () => {
	const { username } = useParams()
	const {
		data: user,
		error,
		isLoading: isUserLoading
	} = useGetUserByUsernameQuery(username!, { skip: !username })
	const { me, isLoading } = useAuth()

	if (isUserLoading || isLoading) return <div>ТУТ СКЕЛЕТОН...</div>
	if (error)
		return (
			<div>
				{'data' in error
					? (error.data as { message: string }).message
					: 'unknown error'}
			</div>
		)

	if (me && me.username === username) {
		return (
			<div>
				<h2>My account</h2>
				<p>{me.username}</p>
				<p>{me.email}</p>
			</div>
		)
	}

	if (user) {
		return (
			<div>
				<h2>User account</h2>
				<p>{user.username}</p>
				<p>{user.email}</p>
			</div>
		)
	}

	return <div>User not found</div>
}
