import { motion as m } from 'framer-motion'

import { Container } from '@/ui'

import styles from '../Main.module.scss'

interface SlideProps {
	isActive: boolean
	children: React.ReactNode
}

export const Slide = ({ isActive, children }: SlideProps) => (
	<m.section
		animate={isActive ? 'visible' : 'hidden'}
		initial='hidden'
		style={{ height: '100%' }}
	>
		<Container className={styles.main}>{children}</Container>
	</m.section>
)
