import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
	useGetMeQuery,
	useGetWordsByUserIdQuery,
	useLazyGetUserByUsernameQuery
} from '@/api'
import { useAppSelector } from '@/app/index'
import { BookIcon, BrainIcon, ProfileIcon } from '@/icons'
import { selectWords } from '@/store'
import type { User } from '@/types'

import { MyWord } from '../MyWord/MyWord'

import styles from './Profile.module.scss'
import { Toaster } from 'react-hot-toast'

export const Profile = () => {
	const { username } = useParams()
	const {
		data: me,
		isLoading: isMeLoading,
		isFetching: isMeFetching
	} = useGetMeQuery(null)
	const [
		getUserByUsername,
		{
			data: user,
			isLoading: isUserLoading,
			isFetching: isUserFetcing,
			error: userError
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

		if ((!me && !user) || (!user && me && me.username !== username)) {
			getUserByUsername(username)
		}
	}, [me, isMeLoading, isMeFetching])

	useEffect(() => {
		if (user) {
			setDisplayUser(user)
		}
	}, [user])

	useEffect(() => {
		if (me) {
			setDisplayUser(me)
		}
	}, [me])

	if (!isLoading && userError)
		return (
			<div>
				{'data' in userError
					? (userError.data as { message: string }).message
					: 'unknown error'}
			</div>
		)

	if (isLoading) return <div>Profile Loading...</div>

	if (!displayUser) return <div>User not found</div>

	const isMe = displayUser.username === me?.username

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
								<span className={styles.number}>{~~(Math.random() * 100)}</span>
								<span className={styles.label}>Изучено</span>
							</div>
							<div className={styles.stat}>
								<span className={styles.number}>{~~(Math.random() * 100)}</span>
								<span className={styles.label}>Изучаю</span>
							</div>
							<div className={styles.stat}>
								<span className={styles.number}>{~~(Math.random() * 100)}</span>
								<span className={styles.label}>Всего слов</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{words && words.length !== 0 && (
				<section className={styles.section}>
					<div className={styles.sectionHeader}>
						<h3 className={styles.sectionTitle}>
							<BrainIcon />
							<span>Изучить</span>
						</h3>
						<span className={styles.badge}>{words.length}</span>
					</div>
					{words.length !== 0 && me && (
						<ul className={styles.wordsList}>
							{words.map((word) => (
								<MyWord key={word.id} isMe={isMe} myId={me.id} word={word} />
							))}
						</ul>
					)}
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
							<BookIcon />
							<span>Изучено</span>
						</h3>
						<span className={styles.badge}>{userWords.length}</span>
					</div>
					{userWords.length !== 0 && (
						<ul className={styles.wordsList}>
							{userWords.map((word) => (
								<MyWord key={word.id} isMe={isMe} myId={me?.id} word={word} />
							))}
						</ul>
					)}
				</section>
			)}
			<Toaster position="top-right" />
		</div>
	)
}
