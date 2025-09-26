import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import type { BackendError } from '../../../frontend-types'

export const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_API_URL}/api`
}) as BaseQueryFn<string | FetchArgs, unknown, BackendError>
