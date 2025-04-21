import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import { SUBTITLES_URL } from '../../constants'
import { Movie, SerializedError } from '../../types'
import { headers } from './share'

export const fetchMovie = createAsyncThunk<
	Movie,
	string,
	{ state: RootState; rejectValue: SerializedError }
>('movie/fetch', async (movieId, thunkApi) => {
	try {
		const opensubtitlesUrl = new URL(SUBTITLES_URL)
		opensubtitlesUrl.searchParams.append('id', movieId)
		opensubtitlesUrl.searchParams.append('order_by', 'download_count')
		const response = await axios.get<{ data: Movie[] }>(opensubtitlesUrl.href, {
			headers
		})
		const movie = response.data.data[0]
		return movie
	} catch (e) {
		
		if (e instanceof AxiosError) {
			return thunkApi.rejectWithValue({
				message: e.message,
				code: e.code,
				status: e.status
			})
		}
		return thunkApi.rejectWithValue({ message: (e as Error).message })
	}
})
