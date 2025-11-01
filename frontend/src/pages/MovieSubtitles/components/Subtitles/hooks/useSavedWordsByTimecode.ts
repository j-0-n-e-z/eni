import { useMemo } from 'react'

import type { SavedWord } from '@/types'

export const useSavedWordsByTimecode = (savedWords: SavedWord[] | undefined) =>
	useMemo(() => {
		const map = new Map<string, SavedWord[]>()

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
