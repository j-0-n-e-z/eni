import type { FC } from 'react'

import { useGetWordsByUserIdQuery } from '@/store/api'
import type { UserDto } from '@/types'
import { Container } from '@/ui'

import styles from '../../Profile.module.scss'
import { ProfileHeader } from '../ProfileHeader'
import { SavedWords } from '../SavedWords'

interface ProfileContentProps {
	isMyProfile: boolean
	user: UserDto
}

export const ProfileContent: FC<ProfileContentProps> = ({
	isMyProfile,
	user
}) => {
	const {
		data: savedWords,
		isFetching: isSavedWordsFetching,
		error: savedWordsError
	} = useGetWordsByUserIdQuery(user?.id ?? '', { skip: !user })

	const descriptionOnEmptySavedWords = isMyProfile
		? 'Добавьте слова из какого-нибудь фильма'
		: 'Пользователь пока ничего не добавил'

	return (
		<Container className={styles.profilePage}>
			<ProfileHeader
				email={user.email}
				savedWordsCount={savedWords?.length ?? 0}
				username={user.username}
			/>
			<SavedWords
				descriptionOnEmpty={descriptionOnEmptySavedWords}
				isMyProfile={isMyProfile}
				isSavedWordsFetching={isSavedWordsFetching}
				myId={isMyProfile ? user.id : undefined}
				savedWords={savedWords}
				savedWordsError={savedWordsError}
			/>
		</Container>
	)
}
