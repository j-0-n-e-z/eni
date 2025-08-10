import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyTranslateQuery } from '@/api'
import { useLazyGetUserByUsernameQuery } from '@/api/userApi'
import { useAppSelector } from '@/app/index'
import { useAuth } from '@/hooks'
import { selectWords } from '@/store'
import type { Word } from '@/types'

import styles from './Profile.module.scss'

export const Profile = () => {
	const { username } = useParams()
	const { me, isLoading, isAuthenticated, isError } = useAuth()
	const [getUserByUsername, { data: user, isLoading: isUserLoading, error }] =
		useLazyGetUserByUsernameQuery()
	const { words } = useAppSelector(selectWords)
	const [translation, setTranslation] = useState<string | null>(null)
	const [triggerTranslate] = useLazyTranslateQuery()

	const translate = async (word: Word) => {
		const response = await triggerTranslate(word.text).unwrap()
		setTranslation(response.def[0].tr[0].text)
	}

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

	const displayUser = me ?? user

	if (!displayUser) return <div>User not found</div>

	const isMe = displayUser.username === me?.username

	return (
		<div className={styles.profilePage}>
			<h2>{isMe ? 'My account' : 'User profile'}</h2>
			<p>{displayUser.username}</p>
			<p>{displayUser.email}</p>

			<ul>
				{words.map((word) => (
					<div>
						<li key={word.id}>{word.text}</li>
						<button onClick={() => translate(word)}>TRANSLATE</button>
						{translation && <p>{translation}</p>}
					</div>
				))}
			</ul>
		</div>
	)
}
