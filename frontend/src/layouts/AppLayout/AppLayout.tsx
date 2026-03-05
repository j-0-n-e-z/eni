import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

import { AuthProvider, ThemeProvider } from '@/contexts'
import { ErrorDisplay } from '@/ui'
import { notifyOnError } from '@/utils'

import { AppSidePanel } from './AppSidePanel/AppSidePanel'
import { SidePanelSkeleton } from './AppSidePanel/components/SidePanel/SidePanelSkeleton'

import '../../App.scss'

const SidePanelErrorFallback = ({ error }: FallbackProps) => {
	const message = error instanceof Error ? error.message : 'Unknown error'
	notifyOnError(message, 'sidepanel')
	return <SidePanelSkeleton />
}

const MainErrorFallback = ({ error }: FallbackProps) => {
	const message = error instanceof Error ? error.message : 'Unknown error'
	notifyOnError(message, 'main')
	return <ErrorDisplay />
}

export const AppLayout = () => (
	<ThemeProvider>
		<AuthProvider>
			<ErrorBoundary FallbackComponent={SidePanelErrorFallback}>
				<AppSidePanel />
			</ErrorBoundary>

			<main className='main'>
				<h1 className='visually-hidden'>Eni</h1>
				<ErrorBoundary FallbackComponent={MainErrorFallback}>
					<Outlet />
				</ErrorBoundary>
			</main>

			<Toaster />
		</AuthProvider>
	</ThemeProvider>
)
