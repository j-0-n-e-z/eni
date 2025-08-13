import './App.scss'

import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

import { SidePanel } from '@/components'

export const App: FC = () => (
	<>
		<SidePanel />
		<main className='main'>
			<h1 className='visually-hidden'>Eni</h1>
			<Outlet />
		</main>
	</>
)
