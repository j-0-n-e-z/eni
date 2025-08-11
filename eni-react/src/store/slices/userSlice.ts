import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/store'
import type { User } from '@/types'

interface UserState {
	user: User | null
}

const initialState: UserState = {
	user: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload
		},
		logout: () => initialState
	}
})

export const selectUser = (state: RootState) => state.userReducer.user

export const { logout, setUser } = userSlice.actions

export const userReducer = userSlice.reducer
