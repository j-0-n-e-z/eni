import { kinopoiskApiV2_1, kinopoiskApiV2_2 } from '@/api'
import type { BoxOffice, KinopoiskMovie } from '@/shared-types'

import type { KinopoiskSearchResponse } from '../types'

export class MovieService {
	async searchKinopoiskMovies(queryParams: Record<string, string>) {
		const params = { ...queryParams }

		const response = await kinopoiskApiV2_1.get<KinopoiskSearchResponse>(
			`/search-by-keyword`,
			{ params }
		)

		return response.data.films
	}

	async getKinopoiskMovieById(id: number) {
		const response = await kinopoiskApiV2_2.get<KinopoiskMovie>(`/${id}`)
		return response.data
	}

	async getMovieBoxOfficeById(id: number) {
		const response = await kinopoiskApiV2_2.get<BoxOffice>(`/${id}/box_office`)
		return response.data
	}
}
