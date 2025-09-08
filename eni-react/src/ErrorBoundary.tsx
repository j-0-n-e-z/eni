import type { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRouteError } from 'react-router-dom'

import { EmptyState, SidePanel } from '@/components'

import { EmptyIcon } from './icons'

import './App.scss'

export const ErrorBoundary: FC = () => {
	const error = useRouteError() as Error

	return (
		<>
			<SidePanel />
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
