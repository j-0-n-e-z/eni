import { useCallback, useState } from 'react'

import { useAuthData } from '@/hooks'
import { useGetWordsByUserIdQuery } from '@/store/api'

export const useWords = () => {
	const { me } = useAuthData()
	const { data: savedUserWords } = useGetWordsByUserIdQuery(me?.id || '', {
		skip: !me?.id
	})
	const [selectedWordIds, setSelectedWordIds] = useState<string[]>([])

	const toggleSelectWord = useCallback((wordId: string) => {
		setSelectedWordIds((current) => {
			if (current.includes(wordId)) {
				return current.filter((id) => id !== wordId)
			}
			return [...current, wordId]
		})
	}, [])

	return { savedUserWords, selectedWordIds, toggleSelectWord }
}
