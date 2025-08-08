import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyGetUserByUsernameQuery } from '@/api/userApi'
import { useAuth } from '@/hooks'

import styles from './Profile.module.scss'

export const Profile = () => {
	const { username } = useParams()
	const { me, isLoading, isAuthenticated, isError } = useAuth()
	const [getUserByUsername, { data: user, isLoading: isUserLoading, error }] =
		useLazyGetUserByUsernameQuery()

	useEffect(() => {
		if (!username) return

		if (
			isError ||
			(!isLoading && !isAuthenticated) ||
			(!isError && me && me.username !== username)
		) {
			getUserByUsername(username)
		}
	}, [username, me, isError, isLoading, isAuthenticated])

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
			<div className={styles.profilePage}>
				<h2>My account</h2>
				<p>{me.username}</p>
				<p>{me.email}</p>
			</div>
		)
	}

	if (user) {
		return (
			<div className={styles.profilePage}>
				<h2>User account</h2>
				<p>{user.username}</p>
				<p>{user.email}</p>
			</div>
		)
	}

	return <div>User not found</div>
}
