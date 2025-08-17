import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import {
	useGetMeQuery,
	useGetWordsByUserIdQuery,
	useLazyGetUserByUsernameQuery
} from '@/api'
import { useAppSelector } from '@/app/index'
import { Word } from '@/components'
import { BookIcon, BrainIcon, ProfileIcon } from '@/icons'
import { selectWords } from '@/store'
import type { User } from '@/types'

import styles from './Profile.module.scss'

export const Profile = () => {
	const { username } = useParams()
	const {
		data: me,
		isLoading: isMeLoading,
		isFetching: isMeFetching
	} = useGetMeQuery(null)

	const [
		triggerGetUserByUsername,
		{
			data: user,
			isLoading: isUserLoading,
			isFetching: isUserFetcing,
			error: userError,
			reset: userReset
		}
	] = useLazyGetUserByUsernameQuery()
	const { words } = useAppSelector(selectWords)
	const [displayUser, setDisplayUser] = useState<User | null>(null)
	const {
		data: userWords,
		isLoading: isUserWordsLoading,
		error: isUserWordsError
	} = useGetWordsByUserIdQuery(displayUser?.id ?? '', { skip: !displayUser })

	const isLoading =
		isMeLoading || isMeFetching || isUserLoading || isUserFetcing

	useEffect(() => {
		if (!username || isLoading) return

		if (me && me.username === username.replaceAll('%20', ' ')) {
			setDisplayUser(me)
			userReset()
			return
		}

		if (
			(!me && !user) ||
			(!user && me && me.username !== username.replaceAll('%20', ' '))
		) {
			triggerGetUserByUsername(username)
		}
	}, [me, isMeLoading, isMeFetching, username])

	useEffect(() => {
		if (user) {
			setDisplayUser(user)
		}
	}, [user])

	if (!isLoading && userError)
		return (
			<div>
				{'data' in userError
					? (userError.data as { message: string }).message
					: 'unknown error'}
			</div>
		)

	if (isLoading || !displayUser) return <div>Profile Loading...</div>

	if (!isLoading && userError) return <div>User not found ЫЫЫЫ</div>

	const isMe = displayUser?.username === me?.username

	return (
		<div className={styles.profilePage}>
			<div className={styles.profileHeader}>
				<div className={styles.headerContent}>
					<div className={styles.avatar}>
						<ProfileIcon />
					</div>
					<div className={styles.userInfo}>
						<h2 className={styles.username}>{displayUser.username}</h2>
						<p className={styles.email}>{displayUser.email}</p>
						<div className={styles.stats}>
							<div className={styles.stat}>
								<span className={styles.number}>{words?.length ?? 0}</span>
								<span className={styles.label}>Изучаю</span>
							</div>
							<div className={styles.stat}>
								<span className={styles.number}>{userWords?.length ?? 0}</span>
								<span className={styles.label}>Изучено</span>
							</div>
							<div className={styles.stat}>
								<span className={styles.number}>
									{(userWords?.length ?? 0) + (words?.length ?? 0)}
								</span>
								<span className={styles.label}>Всего слов</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{words && words.length > 0 && me && (
				<section className={styles.section}>
					<div className={styles.sectionHeader}>
						<h3 className={styles.sectionTitle}>
							<BookIcon />
							<span>Изучить</span>
						</h3>
						<span className={styles.badge}>{words.length}</span>
					</div>

					<ul className={styles.wordsList}>
						{words.map((word) => (
							<Word
								key={`learn${word.id}`}
								isLearned={false}
								isMe={isMe}
								myId={me.id}
								word={word}
							/>
						))}
					</ul>
				</section>
			)}
			{isUserWordsLoading && <div>Words loading...</div>}
			{!isUserWordsLoading && isUserWordsError && (
				<div>Не удалось загрузить слова</div>
			)}
			{!isUserWordsLoading && userWords && userWords.length !== 0 && (
				<section className={styles.section}>
					<div className={styles.sectionHeader}>
						<h3 className={styles.sectionTitle}>
							<BrainIcon />
							<span>Изучено</span>
						</h3>
						<span className={styles.badge}>{userWords.length}</span>
					</div>
					{userWords.length > 0 && (
						<ul className={styles.wordsList}>
							{userWords.map((word) => (
								<Word
									key={`learned${word.id}`}
									isLearned
									isMe={isMe}
									myId={me?.id}
									word={word}
								/>
							))}
						</ul>
					)}
				</section>
			)}
			<Toaster position='top-right' />
		</div>
	)
}
