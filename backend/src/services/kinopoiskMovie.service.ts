import type { AxiosRequestConfig } from 'axios'

import { kinopoiskApiV2_1, kinopoiskApiV2_2 } from '@/api'
import type {
	BoxOffice,
	KinopoiskMovie,
	KinopoiskSearchMovie
} from '@/shared-types'
import { convertNullStrings } from '@/utils'

import type { KinopoiskSearchResponse, SearchMoviesParams } from '../types'

import type { IMovieService } from './types'

export class KinopoiskMovieService implements IMovieService {
	async searchMovies(
		params: SearchMoviesParams,
		config?: AxiosRequestConfig
	): Promise<KinopoiskSearchMovie[]> {
		const response = await kinopoiskApiV2_1.get<KinopoiskSearchResponse>(
			`/search-by-keyword`,
			{
				params,
				...config
			}
		)

		return response.data.films.map(convertNullStrings) as KinopoiskSearchMovie[]
	}

	async getMovieById(id: number) {
		const response = await kinopoiskApiV2_2.get<KinopoiskMovie>(`/${id}`)
		return response.data
	}

	async getMovieBoxOfficeById(id: number) {
		const response = await kinopoiskApiV2_2.get<BoxOffice>(`/${id}/box_office`)
		return response.data
	}
}
