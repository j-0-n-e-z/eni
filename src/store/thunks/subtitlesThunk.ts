import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ApiError } from '@/api'
import { subtitles } from '@/api'
import type { Subtitle } from '@/types'

export const fetchSubtitles = createAsyncThunk<
	Subtitle[],
	number,
	{ rejectValue: ApiError }
>('subtitles/fetch', async (fileId, thunkApi) => {
	try {
		return await subtitles.fetchSubtitles(fileId)
	} catch (e) {
		return thunkApi.rejectWithValue(e as ApiError)
	}
})
