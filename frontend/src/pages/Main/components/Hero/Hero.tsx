import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import cn from 'classnames'
import { motion as m } from 'framer-motion'

import { Background, Icons } from '@/ui'

import movieTheatre from '../../../../ui/lotties/MovieTheatre.lottie'
import { HERO_LINES } from '../../constants/hero-text'

import styles from './Hero.module.scss'

const itemVariants = {
	hidden: { opacity: 0, y: 60 },
	visible: (custom: number) => ({
		opacity: 1,
		transition: {
			delay: 0.2 + custom * 0.3,
			duration: 0.4
		},
		y: 0
	})
}

export const Hero = () => (
	<div className={styles.hero}>
		<div className={styles.heroTextContainer}>
			<m.h2 className={styles.heroHeading} custom={0} variants={itemVariants}>
				<Icons.BrainIcon className={styles.heroIcon} />
				Eni
			</m.h2>

			<ul className={styles.heroLines}>
				{HERO_LINES.map((text, i) => (
					<m.li key={text} custom={i + 1} variants={itemVariants}>
						{text}
					</m.li>
				))}
			</ul>
		</div>

		<m.div
			className={styles.heroAnimationContainer}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5
					}
				}
			}}
		>
			<DotLottieReact
				autoplay
				loop
				className={styles.heroAnimation}
				src={movieTheatre}
			/>
		</m.div>

		<m.div
			animate={{ y: [0, -30, 0, -15, 0] }}
			className={styles.howToUse}
			style={{
				translateX: 'calc(-50% - 80px)'
			}}
			transition={{
				delay: 3,
				duration: 1.8,
				ease: 'easeInOut',
				repeat: Infinity,
				times: [0, 0.4, 0.5, 0.6, 0.8],
				type: 'tween'
			}}
		>
			<span>Как пользоваться</span>
			<Icons.ArrowTailIcon />
		</m.div>

		<Background.Circle className={styles.bgCircle} />

		<m.div
			drag
			className={cn(styles.particle, styles.particle1)}
			custom={5}
			variants={itemVariants}
		/>
		<m.div
			drag
			className={cn(styles.particle, styles.particle2)}
			custom={6}
			variants={itemVariants}
		/>
		<m.div
			drag
			className={cn(styles.particle, styles.particle3)}
			custom={7}
			variants={itemVariants}
		/>
	</div>
)
