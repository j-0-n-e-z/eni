import { useMemo } from 'react'

import type { Word } from '@/types'

export const useSavedWordsByTimecode = (savedWords: Word[] | undefined) =>
	useMemo(() => {
		const map = new Map<string, Word[]>()

		savedWords?.forEach((savedWord) => {
			savedWord.mySources.forEach((source) => {
				const timecode = source.subtitleTimecode

				if (!map.has(timecode)) {
					map.set(timecode, [])
				}

				map.get(timecode)!.push(savedWord)
			})
		})

		return map
	}, [savedWords])
