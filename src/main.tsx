import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { store } from '@/app/index'
import { Auth, MovieSubtitlesPage, Search } from '@/components'

import { App } from './App'
import { Profile } from './components/Profile/Profile'

// TODO: add error pages
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>ЖОПА APP</div>,
		children: [
			{ index: true, element: <Search /> },
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
				element: <Profile />,
			}
		]
	},
	{ path: '*', element: <div>Path not found</div> }
])

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
