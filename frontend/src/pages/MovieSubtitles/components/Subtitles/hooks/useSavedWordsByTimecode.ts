import { useMemo } from 'react'

import type { WordRequest } from '@/types'

export const useSavedWordsByTimecode = (savedWords: WordRequest[] | undefined) =>
	useMemo(() => {
		const map = new Map<string, WordRequest[]>()

		savedWords?.forEach((savedWord) => {
			savedWord.userSources.forEach((source) => {
				const timecode = source.subtitleTimecode

				if (!map.has(timecode)) {
					map.set(timecode, [])
				}

				map.get(timecode)!.push(savedWord)
			})
		})

		return map
	}, [savedWords])
