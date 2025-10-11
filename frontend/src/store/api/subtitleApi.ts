import { createApi } from '@reduxjs/toolkit/query/react'

import type { MovieSubtitle, PureSubtitle } from '@/types'

import { baseQueryWithReauth } from './baseQueries/baseQueryWithReauth'

export const subtitleApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMovieSubtitles: build.query<MovieSubtitle[], string | null>({
			query: (query) => ({
				credentials: 'include',
				url: `movie-subtitles/${query}`
			})
		}),
		getSubtitlesByFileId: build.query<PureSubtitle[], number>({
			query: (fileId) => ({
				credentials: 'include',
				method: 'POST',
				url: `subtitles/${fileId}`
			})
		})
	}),
	reducerPath: 'subtitleApi'
})

export const {
	useGetMovieSubtitlesQuery,
	useGetSubtitlesByFileIdQuery,
	useLazyGetSubtitlesByFileIdQuery
} = subtitleApi
