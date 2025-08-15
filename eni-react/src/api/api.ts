import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_API_URL}/api`
})

export const api = createApi({
	baseQuery,
	endpoints: () => ({})
})
