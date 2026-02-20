import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import { Icons } from '@/ui'

import { HERO_LINES } from '../../constants/hero-text'

import styles from './Hero.module.scss'

export const Hero = () => (
	<section className={styles.hero}>
		<div className={styles.heroTextContainer}>
			<h2 className={styles.heroHeading}>
				<Icons.BrainIcon className={styles.heroIcon} /> Eni
			</h2>
			<ul className={styles.heroLines}>
				{HERO_LINES.map((line) => (
					<li key={line}>{line}</li>
				))}
			</ul>
			{/* <button className={styles.button}>Проверить страницу</button> */}
		</div>

		<div className={styles.heroAnimationContainer}>
			<DotLottieReact
				autoplay
				loop
				className={styles.heroAnimation}
				src='../../../MovieTheatre.lottie' // Файл лежит в public папке
			/>
		</div>
	</section>
)
