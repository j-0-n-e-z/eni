import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Movie, TMDBMovie } from '../../types'
import { fetchMovie } from '../thunks/movieThunk'

interface MovieState {
	movie: TMDBMovie | null
	status: 'idle' | 'pending' | 'rejected'
	error: string | null
}

const initialState: MovieState = {
	movie: null,
	status: 'idle',
	error: null
}

const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		clearMovie: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovie.pending, (state, action) => {
			state.status = 'pending'
		})
		builder.addCase(fetchMovie.rejected, (state, action) => {
			state.status = 'rejected'
			state.movie = null
			console.log(action.payload)
			if (action.payload?.status === 404) {
				state.error = 'No movie found'
			} else if (action.payload?.status === 400) {
				state.error = 'Bad request'
			} else {
				state.error = action.payload?.message || 'Failed to load movie'
			}
		})
		builder.addCase(fetchMovie.fulfilled, (state, action) => {
			state.status = 'idle'
			state.movie = action.payload
			state.error = null
		})
	}
})

export const selectMovie = (state: RootState) => state.movieReducer

export const { clearMovie } = movieSlice.actions

export default movieSlice.reducer
