import { createApi } from '@reduxjs/toolkit/query/react'

import type { SubtitleRelease } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

export const subtitleApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getSubtitleReleases: build.query<SubtitleRelease[], string | null>({
			query: (query) => ({
				credentials: 'include',
				url: `movie-subtitles/${query}`
			})
		})
	}),
	reducerPath: 'subtitleApi'
})

export const { useGetSubtitleReleasesQuery } = subtitleApi
