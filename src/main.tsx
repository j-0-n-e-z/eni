import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { store } from '@/app/index'
import { Search, SubtitlesPage } from '@/components'

import { App } from './App'

// TODO: add error pages
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Search /> },
			{
				path: 'subtitles/:id',
				element: <SubtitlesPage />
			}
		],
		errorElement: <div>ЖОПА APP</div>
	},
	{ path: '*', element: <div>Path not found</div> }
])

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
