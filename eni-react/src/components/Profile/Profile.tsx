import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '@/app/index'
import { ProfileSkeleton, WordsSectionSkeleton } from '@/components'
import { BookIcon, BrainIcon, ProfileIcon } from '@/icons'
import { selectLearningWords } from '@/store'
import {
	useGetMeQuery,
	useGetWordsByUserIdQuery,
	useLazyGetUserByUsernameQuery
} from '@/store/api'
import type { User } from '@/types'

import styles from './Profile.module.scss'
import { WordsSection } from './WordsSection'

export const Profile = () => {
	const { username } = useParams()
	const [displayUser, setDisplayUser] = useState<User | null>(null)

	const { data: me, isFetching: isMeFetching } = useGetMeQuery()

	const [
		triggerGetUserByUsername,
		{
			data: user,
			isFetching: isUserFetcing,
			error: userError,
			reset: userReset
		}
	] = useLazyGetUserByUsernameQuery()

	const {
		data: learnedWords,
		isFetching: isLearnedWordsFetching,
		error: isLearnedWordsError
	} = useGetWordsByUserIdQuery(displayUser?.id ?? '', { skip: !displayUser })

	const learningWords = useAppSelector((state) => selectLearningWords(state))

	const isProfileLoading = isMeFetching || isUserFetcing

	useEffect(() => {
		if (!username || isProfileLoading || userError) return

		if (me && me.username === username.replaceAll('%20', ' ')) {
			setDisplayUser(me)
			userReset() // in case user had error
			return
		}

		if (
			(!me && !user) ||
			(!user && me && me.username !== username.replaceAll('%20', ' '))
		) {
			triggerGetUserByUsername(username)
		}
	}, [me, isProfileLoading, username])

	// user is fetched only after me
	useEffect(() => {
		if (user) {
			setDisplayUser(user)
		}
	}, [user])

	if (userError) return <div>{JSON.stringify(userError)}</div>

	const isMyPage = displayUser?.username === me?.username

	function renderLearnedWords() {
		if (isLearnedWordsFetching) return <WordsSectionSkeleton/>

		if (isLearnedWordsError)
			return <div>Не удалось загрузить изученные слова</div>

		if (learnedWords?.length)
			return (
				<WordsSection
					isLearned
					icon={<BookIcon />}
					isMyPage={isMyPage}
					me={me}
					title='Изучено'
					words={learnedWords}
				/>
			)

		return null
	}

	return (
		<div className={styles.profilePage}>
			{isProfileLoading || !displayUser ? (
				<ProfileSkeleton />
			) : (
				<section className={styles.profileHeader}>
					<div className={styles.headerContent}>
						<div className={styles.avatar}>
							<ProfileIcon />
						</div>
						<div className={styles.userInfo}>
							<h2 className={styles.username}>{displayUser.username}</h2>
							<p className={styles.email}>{displayUser.email}</p>
							<div className={styles.stats}>
								<div className={styles.stat}>
									<span className={styles.number}>{learningWords.length}</span>
									<span className={styles.label}>Изучаю</span>
								</div>
								<div className={styles.stat}>
									<span className={styles.number}>
										{learnedWords?.length ?? 0}
									</span>
									<span className={styles.label}>Изучено</span>
								</div>
								<div className={styles.stat}>
									<span className={styles.number}>
										{(learnedWords?.length ?? 0) + learningWords.length}
									</span>
									<span className={styles.label}>Всего слов</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{isMyPage && learningWords.length > 0 && (
				<WordsSection
					icon={<BrainIcon />}
					isMyPage={isMyPage}
					me={me}
					title='Изучить'
					words={learningWords}
				/>
			)}

			{renderLearnedWords()}
		</div>
	)
}
