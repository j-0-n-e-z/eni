import '../../App.scss'

import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import { AuthProvider, ThemeProvider } from '@/contexts'

import { AppSidePanel } from './SidePanel'

export const AppLayout = () => (
	<ThemeProvider>
		<AuthProvider>
			<AppSidePanel />
			<main className='main'>
				<h1 className='visually-hidden'>Eni</h1>
				<Outlet />
			</main>
			<Toaster />
		</AuthProvider>
	</ThemeProvider>
)
