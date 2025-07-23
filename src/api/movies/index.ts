import type { Movie, TMDBMovie } from '@/types'

import { api } from '../axios/instances'

export const searchMovies = async (query: string) => {
	const response = await api.get<Movie[]>('/movies', {
		params: { query }
	})
	return response.data
}

export const fetchMovieById = async (id: number) => {
	const response = await api.get<Movie>(`/movies/${id}`)
	return response.data
}

export const fetchTMDBMovieById = async (tmdbId: number) => {
	const response = await api.get<TMDBMovie>(`/movies/tmdb/${tmdbId}`)
	return response.data
}
