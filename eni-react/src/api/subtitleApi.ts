import type { Subtitle } from '@/types'

import { api } from './api'

export const subtitleApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSubtitlesById: build.query<
			Subtitle[],
			number
		>({
			query: (fileId) => ({
				url: `subtitles`,
				method: 'POST',
				body: { fileId }
			}),
			providesTags: ['Subtitle']
		})
	})
})

export const { useGetSubtitlesByIdQuery } = subtitleApi
