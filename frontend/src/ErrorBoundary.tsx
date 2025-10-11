import type { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRouteError } from 'react-router-dom'

import { AppSidePanel } from '@/layouts/AppLayout/SidePanel'
import { EmptyState } from '@/ui'

import './App.scss'
import { EmptyIcon } from './icons'

export const ErrorBoundary: FC = () => {
	const error = useRouteError() as Error

	return (
		<>
			<AppSidePanel />
			<main className='main'>
				<h1 className='visually-hidden'>Eni</h1>
				<EmptyState
					description={error.message}
					header='Error occured'
					icon={<EmptyIcon />}
				/>
			</main>
			<Toaster />
		</>
	)
}
