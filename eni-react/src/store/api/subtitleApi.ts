import { createApi } from '@reduxjs/toolkit/query/react'

import type { MovieSubtitle, PureSubtitle } from '@/types'

import { baseQueryWithReauth } from './authApi'

export const subtitleApi = createApi({
	reducerPath: 'subtitleApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMovieSubtitles: build.query<MovieSubtitle[], string | null>({
			query: (query) => ({
				url: `movie-subtitles/${query}`
			})
		}),
		getSubtitleByFileId: build.query<PureSubtitle[], number>({
			query: (fileId) => ({
				url: `subtitles/${fileId}`,
				method: 'POST'
			})
		})
	})
})

export const {
	useGetMovieSubtitlesQuery,
	useGetSubtitleByFileIdQuery,
	useLazyGetSubtitleByFileIdQuery
} = subtitleApi
