import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import { SubtitlesPage } from './components/SubtitlesPage/SubtitlesPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>ЖОПА APP</div>
	},
	{ path: 'subtitles/:id', element: <SubtitlesPage /> },
	{ path: '*', element: <div>Path not found</div> }
])

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
