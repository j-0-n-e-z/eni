import type { Movie, Subtitle } from '@/types'

import { moviesApi } from '../axios/instances'

export const searchMovies = async (query: string) => {
	const response = await moviesApi.get<Movie[]>('/movies', {
		params: {
			query,
			type: 'movie'
		}
	})
	return response.data
}

export const fetchMovieById = async (movieId: number) => {
	const response = await moviesApi.get<Movie[]>('/movies', {
		params: {
			id: movieId,
			type: 'movie'
		}
	})
	return response.data[0]
}

export const fetchSubtitles = async (fileId: number) => {
	const response = await moviesApi.post<Subtitle[]>('/subtitles', {
		file_id: fileId
	})
	return response.data
}
