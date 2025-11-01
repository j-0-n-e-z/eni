/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { type FC } from 'react'
import ReactDOM from 'react-dom'

import { CancelIcon } from '@/ui/icons'

import styles from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
	isOpen: boolean
	onClose: () => void
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				{children}
				<button
					aria-label='close modal'
					className={styles.modalCloseBtn}
					onClick={onClose}
				>
					<CancelIcon />
				</button>
			</div>
		</div>,
		document.body
	)
}
