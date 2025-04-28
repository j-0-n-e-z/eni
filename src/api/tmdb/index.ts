import type { TMDBMovie } from '@/types'

import { tmdbApi } from '../axios/instances'

export const fetchTMDBMovieById = async (tmdb_id: number) => {
	const response = await tmdbApi.get<TMDBMovie>(`/${tmdb_id}`)
	return response.data
}
