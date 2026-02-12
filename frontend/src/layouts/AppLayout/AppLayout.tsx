import { AuthProvider, ThemeProvider } from '@/contexts'
import { ErrorDisplay } from '@/ui'
import { notifyOnError } from '@/utils'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { AppSidePanel } from './AppSidePanel/AppSidePanel'
import { SidePanelSkeleton } from './AppSidePanel/components/SidePanel/SidePanelSkeleton'

import '../../App.scss'

export const AppLayout = () => (
	<ThemeProvider>
		<AuthProvider>
			<ErrorBoundary
				FallbackComponent={SidePanelSkeleton}
				onError={({ message }) => notifyOnError(message, 'sidepanel')}
			>
				<AppSidePanel />
			</ErrorBoundary>

			<main className='main'>
				<h1 className='visually-hidden'>Eni</h1>
				<ErrorBoundary
					FallbackComponent={ErrorDisplay}
					onError={({ message }) => notifyOnError(message, 'main')}
				>
					<Outlet />
				</ErrorBoundary>
			</main>

			<Toaster />
		</AuthProvider>
	</ThemeProvider>
)
