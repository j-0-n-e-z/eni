import '../../App.scss'

import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import { AuthProvider, ThemeProvider } from '@/contexts'

import { ErrorFallback } from './ErrorFallback'
import { AppSidePanel } from './SidePanel'

export const AppLayout = () => (
	<ThemeProvider>
		<AuthProvider>
			<AppSidePanel />

			<main className='main'>
				<h1 className='visually-hidden'>Eni</h1>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<Outlet />
				</ErrorBoundary>
			</main>

			<Toaster />
		</AuthProvider>
	</ThemeProvider>
)

export { ErrorFallback }
