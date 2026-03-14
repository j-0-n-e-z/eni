import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import cn from 'classnames'
import { motion as m } from 'framer-motion'

import { fadeInAndUp, getFadeInVariants } from '@/animations/variants'
import { Background, Icons } from '@/ui'

import movieTheatre from '../../../../ui/assets/lotties/MovieTheatre.lottie'

import styles from './Hero.module.scss'

interface HeroProps {
	goToNextSlide: () => void
}

const fadeIn = getFadeInVariants()

export const Hero = ({ goToNextSlide }: HeroProps) => (
	<div className={styles.hero}>
		<div className={styles.heroTextContainer}>
			<m.h2 className={styles.heroHeading} variants={fadeInAndUp}>
				<Icons.Brain className={styles.heroIcon} />
				Eni
			</m.h2>

			<ul className={styles.heroLines}>
				<m.li custom={1} variants={fadeInAndUp}>
					Привет
				</m.li>
				<m.li custom={2} variants={fadeInAndUp}>
					Меня зовут Рустам
				</m.li>
				<m.li custom={3} variants={fadeInAndUp}>
					Я Junior Frontend разработчик
				</m.li>
				<m.li custom={4} variants={fadeInAndUp}>
					Это мой пет-проект для изучения английского
				</m.li>
			</ul>
		</div>

		<m.div className={styles.heroAnimationContainer} variants={fadeIn}>
			<DotLottieReact
				autoplay
				loop
				className={styles.heroAnimation}
				src={movieTheatre}
			/>
		</m.div>

		<m.div
			className={styles.aboutProject}
			variants={getFadeInVariants(2)}
			whileInView={{
				transition: {
					y: {
						delay: 2,
						duration: 1.8,
						ease: 'easeInOut',
						repeat: Infinity,
						times: [0, 0.4, 0.5, 0.6, 0.8],
						type: 'tween'
					}
				},
				y: [0, -30, 0, -15, 0]
			}}
			onClick={goToNextSlide}
		>
			<span>Подробнее о проекте</span>
			<Icons.ArrowTail />
		</m.div>

		<Background.Circle className={styles.bgCircle} />

		<m.div
			drag
			className={cn(styles.particle, styles.particle1)}
			custom={5}
			variants={fadeInAndUp}
		/>
		<m.div
			drag
			className={cn(styles.particle, styles.particle2)}
			custom={6}
			variants={fadeInAndUp}
		/>
		<m.div
			drag
			className={cn(styles.particle, styles.particle3)}
			custom={7}
			variants={fadeInAndUp}
		/>
	</div>
)
