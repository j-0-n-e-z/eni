import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Auth, Main, MovieSubtitlesPage, Profile, Search } from '@/components'
import { store } from '@/store'

import { App } from './App'
import { ProtectedRoute } from './ProtectedRoute'

// TODO: add error pages
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>ЖОПА APP</div>,
		children: [
			{ index: true, element: <Main /> },
			{
				element: <ProtectedRoute />,
				children: [
					{ path: 'search', element: <Search /> },
					{ path: 'movie/:id', element: <MovieSubtitlesPage /> }
				]
			},
			{
				path: 'movie/:id',
				element: <MovieSubtitlesPage />
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
			{ path: '/settings', element: <div>Settings</div> },
			{ path: '/info', element: <div>Info</div> }
		]
	},
	{ path: '*', element: <div>Path not found</div> }
])

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<CookiesProvider>
			<RouterProvider router={router} />
		</CookiesProvider>
	</Provider>
)
