import type { Subtitle } from '@/types'

import { baseApi } from './baseApi'

export const subtitleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSubtitlesById: build.query<Subtitle[], number>({
			query: (fileId) => ({
				url: `/api/subtitles/${fileId}`,
				method: 'POST'
			}),
			providesTags: ['Subtitle']
		})
	})
})

export const { useGetSubtitlesByIdQuery } = subtitleApi
