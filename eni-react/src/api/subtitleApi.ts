import type { Subtitle } from '@/types'

import { api } from './api'

export const subtitleApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSubtitlesById: build.query<
			Subtitle[],
			string | null
		>({
			query: (imdbId) => ({
				url: `subtitles`,
				method: 'POST',
				body: { imdbId }
			}),
			providesTags: ['Subtitle']
		})
	})
})

export const { useGetSubtitlesByIdQuery } = subtitleApi
