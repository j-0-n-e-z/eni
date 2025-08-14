import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
	useGetMeQuery,
	useLazyGetUserByUsernameQuery,
	useLazyTranslateQuery
} from '@/api'
import { useAppSelector } from '@/app/index'
import { selectWords } from '@/store'
import type { Word } from '@/types'

import styles from './Profile.module.scss'

export const Profile = () => {
	const { username } = useParams()
	const { data: me, isLoading, isFetching } = useGetMeQuery(null)
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
		if (!username || isLoading || isFetching) return

		if ((!me && !user) || (!user && me && me.username !== username)) {
			getUserByUsername(username)
		}
	}, [me, isLoading, isFetching])

	if (isUserLoading) return <div>ТУТ СКЕЛЕТОН...</div>
	if (error)
		return (
			<div>
				{'data' in error
					? (error.data as { message: string }).message
					: 'unknown error'}
			</div>
		)

	const displayUser = user ?? me

	if (!displayUser) return <div>User not found</div>

	const isMe = displayUser.username === me?.username

	return (
		<div className={styles.profilePage}>
			<h2>{isMe ? 'My account' : 'User profile'}</h2>
			<p>{displayUser.username}</p>
			<p>{displayUser.email}</p>

			{isMe && (
				<>
					<h3>Words</h3>
					<ul>
						{words.map((word) => (
							<li key={word.id}>
								<div>{word.text}</div>
								<button onClick={() => translate(word)}>TRANSLATE</button>
								{translation && <p>{translation}</p>}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	)
}
