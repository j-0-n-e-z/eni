import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
	Auth,
	Main,
	MovieSubtitlesPage,
	MovieSubtitlesPicker,
	Profile,
	Search,
	Subtitles
} from '@/components'
import { store } from '@/store'

import { App } from './App'
import { ProtectedRoute } from './ProtectedRoute'

const router = createBrowserRouter([
	{
		children: [
			{ element: <Main />, index: true },
			{
				children: [
					{ element: <Search />, path: 'search' },
					{
						children: [
							{ element: <MovieSubtitlesPicker />, index: true },
							{ element: <Subtitles />, path: 'subtitles/:fileId' }
						],
						element: <MovieSubtitlesPage />,
						path: 'movie/:movieId'
					}
				],
				element: <ProtectedRoute />
			},
			{
				element: <Auth />,
				path: 'login'
			},
			{
				element: <Profile />,
				path: 'user/:username'
			},
			{
				element: <div>Popular words</div>,
				path: '/popular'
			},
			{ element: <div>Settings</div>, path: '/settings' },
			{ element: <div>Info</div>, path: '/info' }
		],
		element: <App />,
		errorElement: <div>ЖОПА APP</div>,
		path: '/'
	},
	{ element: <div>Path not found</div>, path: '*' }
])

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<CookiesProvider>
			<RouterProvider router={router} />
		</CookiesProvider>
	</Provider>
)
