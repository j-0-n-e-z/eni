/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppLayout, ProtectedLayout } from '@/layouts'
import { Auth, Main, MovieSubtitles, Popular, Profile, Search } from '@/pages'
import { MovieSubtitlesPicker } from '@/pages/MovieSubtitles/components/MovieSubtitlesPicker'
import { Subtitles } from '@/pages/MovieSubtitles/components/Subtitles'
import { store } from '@/store'
import { EmptyState, ErrorDisplay, Icons } from '@/ui'

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
		errorElement: <ErrorDisplay />,
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
						icon={<Icons.EmptyIcon />}
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
