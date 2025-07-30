import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
		prepareHeaders: (headers) => {
			const accessToken = localStorage.getItem('accessToken')
			if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)
			return headers
		}
	}),
	endpoints: () => ({}),
	tagTypes: ['Movie', 'Subtitle', 'TMDBMovie']
})
