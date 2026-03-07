/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ReactDOM from 'react-dom'

import { Icons } from '@/ui'

import styles from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
	isOpen: boolean
	onClose: () => void
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
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
					<Icons.Cancel />
				</button>
			</div>
		</div>,
		document.body
	)
}
