import type { PureSubtitle } from '@eni/shared'
import type { SerializedError } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { downloadSrt, parseSrt } from '@/utils'

interface SubtitlesDownloadState {
	subtitles: PureSubtitle[] | null
	isSubtitlesLoading: boolean
	subtitlesError: SerializedError | null
}

const initialState: SubtitlesDownloadState = {
	isSubtitlesLoading: false,
	subtitles: null,
	subtitlesError: null
}

export const fetchAndParseSubtitles = createAsyncThunk<PureSubtitle[], number>(
	'subtitles/fetchAndParse',
	async (fileId, { rejectWithValue }) => {
		if (import.meta.env.VITE_PROCESS_ENV === 'production') {
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

		const response = await axios.get<void, { data: string }>(
			'http://localhost:3000/api/fake-subtitles'
		)

		return parseSrt(response.data)
	}
)

const subtitlesDownloadSlice = createSlice({
	extraReducers: (builder) => {
		builder
			.addCase(fetchAndParseSubtitles.pending, (state) => {
				state.isSubtitlesLoading = true
				state.subtitlesError = null
			})
			.addCase(fetchAndParseSubtitles.fulfilled, (state, action) => {
				state.isSubtitlesLoading = false
				state.subtitles = action.payload
			})
			.addCase(fetchAndParseSubtitles.rejected, (state, action) => {
				state.isSubtitlesLoading = false
				state.subtitlesError = action.payload as SerializedError
			})
	},
	initialState,
	name: 'subtitlesDownload',
	reducers: {
		clearSubtitles: (state) => {
			state.subtitles = null
			state.subtitlesError = null
		}
	}
})

export const { clearSubtitles } = subtitlesDownloadSlice.actions
export const subtitlesDownloadReducer = subtitlesDownloadSlice.reducer
