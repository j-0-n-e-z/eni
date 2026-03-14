import cn from 'classnames'
import { motion as m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { fadeInAndUp } from '@/animations/variants'
import { Background, Icons, IMAGES, TechIcons } from '@/ui'

import { apiItemVariants, descriptionItemVariants } from './constants'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'

import styles from './Info.module.scss'

const MotionLink = m.create(Link)

export const Info = () => (
	<div className={styles.info}>
		<section className={styles.description}>
			<m.h2 className={styles.infoHeading} variants={fadeInAndUp}>
				О проекте
			</m.h2>

			<ul>
				<m.li custom={1} variants={descriptionItemVariants}>
					<b>Eni</b> - приложение для поиска фильмов и информации о них с
					помощью Kinopoisk API.
				</m.li>
				<m.li custom={2} variants={descriptionItemVariants}>
					Вы можете выбрать фильм и посмотреть субтитры к нему с помощью
					OpenSubtitles API.
				</m.li>
				<m.li custom={3} variants={descriptionItemVariants}>
					После того как вы выберете субтитры, вы сможете перевести незнакомые
					слова и фразы с помощью Yandex Translate API и сохранить их к себе в
					профиль.
				</m.li>
			</ul>

			<MotionLink
				className={cn('button', 'button--contained')}
				custom={4}
				to='/search'
				transition={{ stiffness: 300, type: 'spring' }}
				variants={descriptionItemVariants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				Попробовать
			</MotionLink>
		</section>

		<section className={styles.api}>
			<ul className={styles.apiList}>
				<m.li variants={apiItemVariants}>
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
			initial={{ opacity: 0, x: '100%' }}
			viewport={{ once: true }}
			whileInView={{
				opacity: 1,
				transition: { delay: 2, duration: 1 },
				x: 0
			}}
		>
			<Swiper
				centeredSlides
				grabCursor
				loop
				modules={[Autoplay, Navigation]}
				slidesPerView={4}
				spaceBetween={50}
				speed={2000}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}}
				breakpoints={{
					1200: {
						slidesPerView: 5,
						spaceBetween: 40
					},
					320: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					576: {
						slidesPerView: 3,
						spaceBetween: 30
					},
					992: {
						slidesPerView: 4,
						spaceBetween: 30
					}
				}}
			>
				{TechIcons.map((Icon) => (
					<SwiperSlide key={Icon.displayName}>
						<Icon className={styles.techIcon} />
					</SwiperSlide>
				))}
			</Swiper>
		</m.section>

		<Background.Triangle className={styles.bgTriangle} />
	</div>
)
