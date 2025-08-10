import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyGetUserByUsernameQuery, useLazyTranslateQuery } from '@/api'
import { useAppSelector } from '@/app/index'
import { useAuth } from '@/hooks'
import { selectWords } from '@/store'
import type { Word } from '@/types'

import styles from './Profile.module.scss'

export const Profile = () => {
	const { username } = useParams()
	const {
		me,
		isLoading: isMeLoading,
		isAuthenticated,
		isError: isMeError
	} = useAuth()
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
			!isMeLoading &&
			(isMeError ||
				!isAuthenticated ||
				(!isMeError && me && me.username !== username))
		) {
			getUserByUsername(username)
		}
	}, [username, me, isMeError, isMeLoading, isAuthenticated])

	if (isUserLoading || isMeLoading) return <div>ТУТ СКЕЛЕТОН...</div>
	if (error)
		return (
			<div>
				{'data' in error
					? (error.data as { message: string }).message
					: 'unknown error'}
			</div>
		)

	const displayUser = user ?? me

	if (!displayUser || !me) return <div>User not found</div>

	const isMe = displayUser.username === me.username

	return (
		<div className={styles.profilePage}>
			<h2>{isMe ? 'My account' : 'User profile'}</h2>
			<p>{displayUser.username}</p>
			<p>{displayUser.email}</p>

			<ul>
				{words.map((word) => (
					<li key={word.id}>
						<div>{word.text}</div>
						<button onClick={() => translate(word)}>TRANSLATE</button>
						{translation && <p>{translation}</p>}
					</li>
				))}
			</ul>
		</div>
	)
}
