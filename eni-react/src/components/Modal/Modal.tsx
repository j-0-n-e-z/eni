import type { FC } from 'react'

import { CancelIcon } from '@/icons'

import s from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
	closeModalHandler: () => void
}

export const Modal: FC<ModalProps> = ({ children, closeModalHandler }) => (
	<div className={s.modalContainer}>
		<div className={s.modal}>
			{children}
			<button
				aria-label='close modal'
				className={s.modalCloseBtn}
				onClick={closeModalHandler}
			>
				<CancelIcon />
			</button>
		</div>
	</div>
)
