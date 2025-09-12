/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
	Auth,
	EmptyState,
	Main,
	MovieSubtitlesPage,
	MovieSubtitlesPicker,
	Profile,
	Search,
	Subtitles
} from '@/components'
import { EmptyIcon } from '@/icons'
import { store } from '@/store'

import { App } from './App'
import { ErrorBoundary } from './ErrorBoundary'
import { ProtectedRoute } from './ProtectedRoute'

function tryFixBrokenUrl() {
	const { pathname, search, hash, origin } = window.location
	
	if (pathname.includes('//')) {
		const fixedPathname = pathname.replace(/\/+/g, '/')
		const fixedUrl = origin + fixedPathname + search + hash
		window.history.replaceState(null, '', fixedUrl)
	}
}

tryFixBrokenUrl()

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorBoundary />,
		children: [
			{ element: <Main />, index: true, errorElement: <div>ГОВНО</div> },
			{
				element: <ProtectedRoute />,
				children: [
					{ element: <Search />, path: 'search' },
					{
						element: <MovieSubtitlesPage />,
						path: 'movie/:movieId',
						children: [
							{ element: <MovieSubtitlesPicker />, index: true },
							{ element: <Subtitles />, path: 'subtitles/:fileId' }
						]
					}
				]
			},
			{
				path: 'login',
				element: <Auth />
			},
			{
				path: 'user/:username',
				element: <Profile />
			},
			{
				path: '/popular',
				element: <div>Popular words</div>
			},
			{ element: <div>Settings</div>, path: '/settings' },
			{ element: <div>Info</div>, path: '/info' },
			{
				element: (
					<EmptyState
						description='Such path does not exist'
						header='Path not found'
						icon={<EmptyIcon />}
					/>
				),
				path: '*'
			}
		]
	}
])

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<CookiesProvider>
			<RouterProvider router={router} />
		</CookiesProvider>
	</Provider>
)
