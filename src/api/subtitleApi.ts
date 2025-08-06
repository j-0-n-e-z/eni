import type { Subtitle } from '@/types'

import { api } from './api'

export const subtitleApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSubtitlesById: build.query<Subtitle[], number>({
			query: (fileId) => ({
				url: `/subtitles/${fileId}`,
				method: 'POST'
			}),
			providesTags: ['Subtitle']
		})
	})
})

export const { useGetSubtitlesByIdQuery } = subtitleApi
