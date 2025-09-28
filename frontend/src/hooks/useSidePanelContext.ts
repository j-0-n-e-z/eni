import { useContext } from 'react'

import { SidePanelContext } from '@/contexts'

export const useSidePanelContext = () => {
	const context = useContext(SidePanelContext)

	if (context === null) {
		throw new Error(
			'useSidePanelContext must be used within a SidePanelContextProvider'
		)
	}

	return context
}
