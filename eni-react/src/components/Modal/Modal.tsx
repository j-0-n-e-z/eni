import { useRef, type FC } from 'react'
import ReactDOM from 'react-dom'
import useClickAway from 'react-use/lib/useClickAway'

import { CancelIcon } from '@/icons'

import s from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
	isOpen: boolean
	closeModalHandler: () => void
}

export const Modal: FC<ModalProps> = ({
	children,
	isOpen,
	closeModalHandler
}) => {
	const modalRef = useRef<HTMLDivElement | null>(null)
	useClickAway(modalRef, closeModalHandler)

	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className={s.modalContainer}>
			<div ref={modalRef} className={s.modal}>
				{children}
				<button
					aria-label='close modal'
					className={s.modalCloseBtn}
					onClick={closeModalHandler}
				>
					<CancelIcon />
				</button>
			</div>
		</div>,
		document.querySelector('#modal-root')!
	)
}
