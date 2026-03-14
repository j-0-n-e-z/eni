import type { TargetAndTransition } from 'framer-motion'
import { motion as m } from 'framer-motion'
import { Link } from 'react-router-dom'

import { fadeInAndUp } from '@/animations/variants'
import { Icons } from '@/ui'

import styles from '../Contact.module.scss'

const GithubContainedMotionIcon = m.create(Icons.GithubContained)
const TelegramMotionIcon = m.create(Icons.Telegram)
const YoutubeMotionIcon = m.create(Icons.YouTube)

const whileHoverAnimation: TargetAndTransition = {
	scale: 1.2,
	transition: {
		duration: 0.35,
		repeat: Infinity,
		repeatType: 'reverse'
	}
}

export const Links = () => (
	<ul className={styles.links}>
		<li>
			<Link
				target='_blank'
				title='Мой GitHub'
				to='https://github.com/j-0-n-e-z'
			>
				<GithubContainedMotionIcon
					className={styles.githubIcon}
					custom={1}
					height={50}
					variants={fadeInAndUp}
					whileHover={whileHoverAnimation}
					width={50}
				/>
			</Link>
		</li>

		<li>
			<Link target='_blank' title='Мой Telegram' to='https://t.me/j_0_n_e_z'>
				<TelegramMotionIcon
					custom={2}
					height={50}
					variants={fadeInAndUp}
					whileHover={whileHoverAnimation}
					width={50}
				/>
			</Link>
		</li>

		<li>
			<Link target='_blank' to='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
				<YoutubeMotionIcon
					custom={3}
					height={50}
					variants={fadeInAndUp}
					whileHover={whileHoverAnimation}
					width={50}
				/>
			</Link>
		</li>
	</ul>
)
