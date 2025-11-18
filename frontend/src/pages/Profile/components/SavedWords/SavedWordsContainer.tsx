import type { SerializedError } from '@reduxjs/toolkit'

import type { BackendError } from '@/frontend-types'
import type { SavedWord } from '@/types'
import { EmptyState, ErrorDisplay, Icons } from '@/ui'

import { SavedWordsSkeleton } from './SavedWordsSkeleton'

import { SavedWords } from '.'

interface SavedWordsContainerProps {
	savedWordsError: BackendError | SerializedError | undefined
	isSavedWordsFetching: boolean
	savedWords: SavedWord[] | undefined
	descriptionOnEmpty: string
	isMyProfile: boolean
	userId: string | undefined
}

export const SavedWordsContainer = ({
	descriptionOnEmpty,
	isMyProfile,
	isSavedWordsFetching,
	userId,
	savedWords,
	savedWordsError
}: SavedWordsContainerProps) => {
	if (isSavedWordsFetching) return <SavedWordsSkeleton />

	if (savedWordsError) return <ErrorDisplay error={savedWordsError} />

	if (!savedWords?.length)
		return (
			<EmptyState
				description={descriptionOnEmpty}
				header='Пока пусто'
				icon={<Icons.BookIcon />}
			/>
		)

	return (
		<SavedWords
			isMyProfile={isMyProfile}
			myId={isMyProfile ? userId : undefined}
			savedWords={savedWords}
		/>
	)
}
