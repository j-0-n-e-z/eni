import { useRef, type FC } from 'react'
import ReactDOM from 'react-dom'
import useClickAway from 'react-use/lib/useClickAway'

import { CancelIcon } from '@/ui/icons'

import styles from './Modal.module.scss'

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
		<div className={styles.modalContainer}>
			<div ref={modalRef} className={styles.modal}>
				{children}
				<button
					aria-label='close modal'
					className={styles.modalCloseBtn}
					onClick={closeModalHandler}
				>
					<CancelIcon />
				</button>
			</div>
		</div>,
		document.body
	)
}
