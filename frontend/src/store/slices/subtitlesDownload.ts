import type { SerializedError } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import type { PureSubtitle } from '@/types'
import { downloadSrt, parseSrt } from '@/utils'

interface SubtitlesDownloadState {
	data: PureSubtitle[] | null
	isLoading: boolean
	error: SerializedError | null
}

const initialState: SubtitlesDownloadState = {
	data: null,
	error: null,
	isLoading: false
}

export const fetchAndParseSubtitles = createAsyncThunk<PureSubtitle[], number>(
	'subtitles/fetchAndParse',
	async (fileId, { rejectWithValue }) => {
		try {
			const response = await axios.post<{ link: string }>(
				`${import.meta.env.VITE_OPENSUBTITLES_API_URL}/download`,
				{ file_id: fileId },
				{
					headers: {
						Accept: 'application/json',
						'Api-Key': import.meta.env.VITE_OPENSUBTITLES_API_KEY,
						'Content-Type': 'application/json',
						'User-Agent': 'eni v0.0.1'
					}
				}
			)

			const srtContent = await downloadSrt(response.data.link)

			return parseSrt(srtContent)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

const subtitlesDownloadSlice = createSlice({
	extraReducers: (builder) => {
		builder
			.addCase(fetchAndParseSubtitles.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchAndParseSubtitles.fulfilled, (state, action) => {
				state.isLoading = false
				state.data = action.payload
			})
			.addCase(fetchAndParseSubtitles.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as SerializedError
			})
	},
	initialState,
	name: 'subtitlesDownload',
	reducers: {
		clearSubtitles: (state) => {
			state.data = null
			state.error = null
		}
	}
})

export const { clearSubtitles } = subtitlesDownloadSlice.actions
export const subtitlesDownloadReducer = subtitlesDownloadSlice.reducer
