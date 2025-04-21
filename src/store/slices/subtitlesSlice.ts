import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Subtitle } from '../../types'
import { fetchSubtitles } from '../thunks/subtitlesThunk'

interface SubtitlesState {
	subtitles: Subtitle[] | null
	status: 'idle' | 'rejected' | 'pending'
	error: string | null
}

const initialState: SubtitlesState = {
	subtitles: null,
	status: 'idle',
	error: null
}

const subtltlesSlice = createSlice({
	initialState,
	name: 'subtitles',
	reducers: {
		clearSubtitles: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSubtitles.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(fetchSubtitles.rejected, (state, action) => {
			state.status = 'rejected'
			state.subtitles = null
			if (action.payload?.status === 404) {
				state.error = 'No subtitles found'
			} else if (action.payload?.status === 400) {
				state.error = 'Bad request'
			} else {
				state.error = action.payload?.message || 'Failed to load subtitles'
			}
		})
		builder.addCase(fetchSubtitles.fulfilled, (state, action) => {
			state.status = 'idle'
			state.subtitles = action.payload
			state.error = null
		})
	}
})

export const selectSubtitles = (state: RootState) => state.subtitlesReducer

export const { clearSubtitles } = subtltlesSlice.actions

export default subtltlesSlice.reducer
