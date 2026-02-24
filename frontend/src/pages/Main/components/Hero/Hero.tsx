import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import cn from 'classnames'
import type { Easing } from 'framer-motion'
import { motion as m } from 'framer-motion'

import { Background, Icons } from '@/ui'

import { HERO_LINES } from '../../constants/hero-text'

import styles from './Hero.module.scss'

export const Hero = () => {
	const itemVariants = {
		hidden: { opacity: 0, y: 60 },
		visible: (custom: number) => ({
			opacity: 1,
			transition: {
				damping: 0,
				delay: 0.2 + custom * 0.3,
				duration: 0.4,
				ease: 'linear' as Easing
			},
			y: 0
		})
	}

	return (
		<div className={styles.hero}>
			<div className={styles.heroTextContainer}>
				<m.h2 className={styles.heroHeading} custom={0} variants={itemVariants}>
					<Icons.BrainIcon className={styles.heroIcon} /> Eni
				</m.h2>
				<ul className={styles.heroLines}>
					{HERO_LINES.map((text, i) => (
						<m.li key={text} custom={i + 1} variants={itemVariants}>
							{text}
						</m.li>
					))}
				</ul>
			</div>

			<div className={styles.heroAnimationContainer}>
				<DotLottieReact
					autoplay
					loop
					className={styles.heroAnimation}
					src='../../../MovieTheatre.lottie' // Файл лежит в public папке
				/>
			</div>

			<Background.Circle className={styles.bgCircle} />
			<m.div
				className={cn(styles.particle, styles.particle1)}
				custom={5}
				variants={itemVariants}
			/>
			<m.div
				className={cn(styles.particle, styles.particle2)}
				custom={6}
				variants={itemVariants}
			/>
			<m.div
				className={cn(styles.particle, styles.particle3)}
				custom={7}
				variants={itemVariants}
			/>
		</div>
	)
}
