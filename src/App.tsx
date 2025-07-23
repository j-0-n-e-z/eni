import './App.scss'

import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { SidePanel } from './components/SidePanel/SidePanel'

export const App: FC = () => (
	<>
		<SidePanel />
		<main className='main'>
			<Outlet />
		</main>
	</>
)
