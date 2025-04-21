import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SerializedError, Subtitle } from '../../types'

export const fetchSubtitles = createAsyncThunk<
	Subtitle[],
	number,
	{ rejectValue: SerializedError }
>('subtitles/fetch', async (fileId, thunkApi) => {
	try {
		const response = await axios.post<{ data: Subtitle[] }>(
			'http://localhost:8080',
			{ file_id: fileId },
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data.data
	} catch (e) {
		return thunkApi.rejectWithValue(e)
	}
})
