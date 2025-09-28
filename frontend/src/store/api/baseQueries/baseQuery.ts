import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import type { BackendError } from '../../../frontend-types'

export const baseQuery = fetchBaseQuery({
	baseUrl: `http://localhost:8080/api`
}) as BaseQueryFn<string | FetchArgs, unknown, BackendError>
