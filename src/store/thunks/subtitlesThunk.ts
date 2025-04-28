import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ApiError } from '@/api'
import { movies } from '@/api'
import type { Subtitle } from '@/types'

export const fetchSubtitles = createAsyncThunk<
	Subtitle[],
	number,
	{ rejectValue: ApiError }
>('subtitles/fetch', async (fileId, thunkApi) => {
	try {
		return await movies.fetchSubtitles(fileId)
	} catch (e) {
		return thunkApi.rejectWithValue(e as ApiError)
	}
})
