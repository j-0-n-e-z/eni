import { useGetWordsByUserIdQuery } from '@/store/api'
import type { UserDto } from '@/types'
import { Container } from '@/ui'

import styles from '../../Profile.module.scss'
import { ProfileHeader } from '../ProfileHeader'
import { SavedWordsContainer } from '../SavedWords/SavedWordsContainer'

interface ProfileContentProps {
	isMyProfile: boolean
	user: UserDto
}

export const ProfileContent = ({ isMyProfile, user }: ProfileContentProps) => {
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
			<SavedWordsContainer
				descriptionOnEmpty={descriptionOnEmptySavedWords}
				isMyProfile={isMyProfile}
				isSavedWordsFetching={isSavedWordsFetching}
				savedWords={savedWords}
				savedWordsError={savedWordsError}
				userId={user.id}
			/>
		</Container>
	)
}
