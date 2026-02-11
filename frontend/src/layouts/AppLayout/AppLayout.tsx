import { AuthProvider, ThemeProvider } from '@/contexts'
import { ErrorDisplay } from '@/ui'
import { ErrorBoundary } from 'react-error-boundary'
import toast, { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { AppSidePanel } from './SidePanel'
import { SidePanelSkeleton } from './SidePanel/SidePanelSkeleton'

import '../../App.scss'

const onError = (error: Error, id: string) => toast.error(error.message, { id })

export const AppLayout = () => (
	<ThemeProvider>
		<AuthProvider>
			<ErrorBoundary
				FallbackComponent={SidePanelSkeleton}
				onError={(e) => onError(e, 'sidepanel')}
			>
				<AppSidePanel />
			</ErrorBoundary>

			<main className='main'>
				<h1 className='visually-hidden'>Eni</h1>
				<ErrorBoundary
					FallbackComponent={ErrorDisplay}
					onError={(e) => onError(e, 'main')}
				>
					<Outlet />
				</ErrorBoundary>
			</main>

			<Toaster />
		</AuthProvider>
	</ThemeProvider>
)
