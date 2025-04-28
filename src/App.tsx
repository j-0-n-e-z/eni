import type { FC } from 'react'

import './App.scss'
import { Search } from '@/components'

export const App: FC = () => (
	<main className='mainpage'>
		<Search />
	</main>
)
