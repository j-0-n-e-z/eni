import type { MovieSubtitle, Subtitle } from '@/types'

import { api } from './api'

export const subtitleApi = api.injectEndpoints({
	endpoints: (build) => ({
		getMovieSubtitlesByImdbId: build.query<MovieSubtitle[], string | null>({
			query: (imdbId) => ({
				url: `movie-subtitles/${imdbId}`
			})
		}),
		getSubtitleByFileId: build.query<Subtitle[], number>({
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
