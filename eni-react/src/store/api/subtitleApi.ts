import { createApi } from '@reduxjs/toolkit/query/react'

import type { MovieSubtitle, PureSubtitle } from '@/types'

import { baseQueryWithReauth } from './authApi'

export const subtitleApi = createApi({
	reducerPath: 'subtitleApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getMovieSubtitlesByImdbId: build.query<MovieSubtitle[], string | null>({
			query: (imdbId) => ({
				url: `movie-subtitles/${imdbId}`
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
	useGetMovieSubtitlesByImdbIdQuery,
	useGetSubtitleByFileIdQuery,
	useLazyGetSubtitleByFileIdQuery
} = subtitleApi
