/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppLayout, ErrorFallback, ProtectedLayout } from '@/layouts'
import { Auth, Main, MovieSubtitles, Popular, Profile, Search } from '@/pages'
import { MovieSubtitlesPicker } from '@/pages/MovieSubtitles/components/MovieSubtitlesPicker'
import { Subtitles } from '@/pages/MovieSubtitles/components/Subtitles'
import { store } from '@/store'
import { EmptyState } from '@/ui'
import { EmptyIcon } from '@/ui/icons'

function tryFixUrl() {
	const { pathname, search, hash, origin } = window.location

	if (pathname.includes('//')) {
		const fixedPathname = pathname.replace(/\/+/g, '/')
		const fixedUrl = origin + fixedPathname + search + hash
		window.history.replaceState(null, '', fixedUrl)
	}
}

tryFixUrl()

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <ErrorBoundary FallbackComponent={ErrorFallback} />,
		children: [
			{ element: <Main />, index: true },
			{
				element: <ProtectedLayout />,
				children: [
					{ element: <Search />, path: 'search' },
					{
						element: <MovieSubtitles />,
						path: 'movie/:movieId',
						children: [
							{ element: <MovieSubtitlesPicker />, index: true },
							{ element: <Subtitles />, path: 'subtitles/:fileId' }
						]
					},
					{ element: <div>Settings</div>, path: '/settings' }
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
				element: <Popular />
			},
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
