import { motion as m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Background, Icons } from '@/ui'
import { IMAGES } from '@/ui/assets'

import { apiItemVariants, descriptionItemVariants, TECHS } from './constants'

import styles from './Info.module.scss'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'

const MotionLink = m(Link)

export const Info = () => (
	<div className={styles.info}>
		<section className={styles.description}>
			<m.h2
				className={styles.infoHeading}
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: {
						opacity: 1,
						transition: {
							delay: 0.4,
							duration: 0.2
						},
						y: 0
					}
				}}
			>
				О проекте
			</m.h2>

			<div>
				<m.p custom={0} variants={descriptionItemVariants}>
					<b>Eni</b> - приложение для поиска фильмов и получения информации о
					них с помощью Kinopoisk API.
				</m.p>
				<br />
				<m.p custom={1} variants={descriptionItemVariants}>
					Вы можете выбрать фильмы, субтитры которых хотите посмотреть, и
					получить их с помощью OpenSubtitles API.
				</m.p>
				<br />
				<m.p custom={2} variants={descriptionItemVariants}>
					После того как вы выберете субтитры, вы сможете перевести незнакомые
					слова и фразы с помощью Yandex Translate API и сохранить их к себе в
					профиль.
				</m.p>
			</div>

			<MotionLink
				className={styles.letsGoBtn}
				custom={3}
				to='/search'
				transition={{ stiffness: 300, type: 'spring' }}
				variants={descriptionItemVariants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				Вперед
			</MotionLink>
		</section>

		<section className={styles.api}>
			<ul className={styles.apiList}>
				<m.li custom={0} variants={apiItemVariants}>
					<div className={styles.iconWrapper}>
						<Icons.Kinopoisk height={35} width={35} />
					</div>
					<div>
						<span className={styles.apiHeading}>Kinopoisk API</span>
						<span> - для получения информации о фильмах</span>
					</div>
				</m.li>

				<m.li custom={1} variants={apiItemVariants}>
					<img
						alt='opensubs'
						className={styles.opensubsLogo}
						src={IMAGES.opensubtitlesLogo}
					/>
					<div>
						<span className={styles.apiHeading}>OpenSubtitles API</span>
						<span> - для поиска субтитров к фильмам</span>
					</div>
				</m.li>

				<m.li custom={2} variants={apiItemVariants}>
					<Icons.YaTranslate height={40} width={40} />
					<div>
						<span className={styles.apiHeading}>Yandex Translate API</span>
						<span> - для точного перевода текста</span>
					</div>
				</m.li>
			</ul>
		</section>

		<m.section
			className={styles.techs}
			variants={{
				hidden: { opacity: 0, x: '100vw' },
				visible: {
					opacity: 1,
					transition: {
						delay: 2.5,
						duration: 1,
						opacity: {
							delay: 2.5,
							duration: 2
						}
					},
					x: 0
				}
			}}
		>
			<Swiper
				centeredSlides
				grabCursor
				loop
				modules={[Autoplay, Navigation]}
				slidesPerView={5}
				spaceBetween={50}
				speed={2000}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}}
			>
				{TECHS.map((tech) => (
					<SwiperSlide key={tech.name}>
						<span className={styles.techIcon}>{tech.icon}</span>
						<span className={styles.techName}>{tech.name}</span>
					</SwiperSlide>
				))}
			</Swiper>
		</m.section>
		<Background.Triangle className={styles.bgTriangle} />
	</div>
)
