import './App.scss'

import { type FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import { AppSidePanel } from '@/components'
import { ThemeProvider } from '@/contexts'

export const App: FC = () => (
	<ThemeProvider>
		<AppSidePanel />
		<main className='main'>
			<h1 className='visually-hidden'>Eni</h1>
			<Outlet />
		</main>
		<Toaster />
	</ThemeProvider>
)
