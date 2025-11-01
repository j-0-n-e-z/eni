import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
	useGetMeQuery,
	useGetWordsByUserIdQuery,
	useLazyGetUserByUsernameQuery
} from '@/store/api'
import type { UserDto } from '@/types'
import { Container, EmptyState, ErrorDisplay } from '@/ui'
import { BookIcon, ProfileIcon } from '@/ui/icons'

import styles from './Profile.module.scss'
import { ProfileSkeleton } from './ProfileSkeleton'
import { SavedWords } from './components/SavedWords'
import { SavedWordsSkeleton } from './components/SavedWords/SavedWordsSkeleton'

export const Profile = () => {
	const { username } = useParams()
	const [displayUser, setDisplayUser] = useState<UserDto | null>(null)

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
		data: savedWords,
		isFetching: isSavedWordsFetching,
		error: isSavedWordsError
	} = useGetWordsByUserIdQuery(displayUser?.id ?? '', { skip: !displayUser })

	const isProfileLoading = isMeFetching || isUserFetcing

	useEffect(() => {
		if (!username || isProfileLoading || userError) return

		if (me && me.username === decodeURIComponent(username)) {
			setDisplayUser(me)
			userReset() // in case user had error
			return
		}

		if (
			(!me && !user) ||
			(!user && me && me.username !== decodeURIComponent(username))
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

	if (userError) return <ErrorDisplay error={userError} />

	const isMyPage = displayUser?.username === me?.username

	function renderSavedWords() {
		if (isSavedWordsFetching) return <SavedWordsSkeleton />

		if (isSavedWordsError)
			return <div>Не удалось загрузить изученные слова</div>

		if (savedWords?.length)
			return (
				<SavedWords
					icon={<BookIcon />}
					isMyPage={isMyPage}
					myId={me?.id}
					title='Изучено'
					words={savedWords}
				/>
			)

		return (
			<EmptyState
				description='Добавьте слова из какого-нибудь фильма'
				header='Пока пусто'
				icon={<BookIcon />}
			/>
		)
	}

	return (
		<Container className={styles.profilePage}>
			{isProfileLoading || !displayUser ? (
				<ProfileSkeleton />
			) : (
				<section className={styles.profileHeader}>
					<div className={styles.headerContent}>
						<div className={styles.avatarContainer}>
							<div className={styles.avatar}>
								<ProfileIcon />
							</div>
						</div>
						<div className={styles.userInfo}>
							<h2 className={styles.username}>{displayUser.username}</h2>
							<p className={styles.email}>{displayUser.email}</p>
							<div className={styles.stats}>
								<div className={styles.stat}>
									<span className={styles.number}>
										{savedWords?.length ?? 0}
									</span>
									<span className={styles.label}>Всего слов</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{renderSavedWords()}
		</Container>
	)
}
