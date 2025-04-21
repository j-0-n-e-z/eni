import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { SUBTITLES_URL } from '../../constants'
import { Movie, SerializedError } from '../../types'
import { headers } from './share'

export const fetchMovies = createAsyncThunk<
	Movie[],
	string,
	{ rejectValue: SerializedError }
>('movies/fetch', async (movieTitle, thunkApi) => {
	const opensubtitleUrl = new URL(SUBTITLES_URL)
	// params should be in alphabetic order to avoid redirection 301
	const params = {
		languages: 'en',
		order_by: 'download_count',
		query: movieTitle,
		type: 'movie'
	}

	Object.entries(params).forEach(([key, value]) =>
		opensubtitleUrl.searchParams.append(key, value)
	)

	try {
		const response = await axios.get<{ data: Movie[] }>(opensubtitleUrl.href, {
			headers
		})
		const movies = response.data.data
		const uniqueMovies = new Map<string, Movie>()

		for (const movie of movies) {
			const { title } = movie.attributes.feature_details
			if (!uniqueMovies.has(title)) {
				uniqueMovies.set(title, movie)
			}
		}

		return [...uniqueMovies.values()].sort(
			(a, b) =>
				a.attributes.feature_details.year - b.attributes.feature_details.year
		)
	} catch (e) {
		console.log(e)
		if (e instanceof AxiosError) {
			console.log(e.code, e.message, e.response?.status || '')
			return thunkApi.rejectWithValue({
				message: e.message,
				code: e.code,
				status: e.response?.status
			})
		}
		return thunkApi.rejectWithValue({ message: (e as Error).message })
	}
})
