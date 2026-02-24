import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Keyboard, Mousewheel, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Container } from '@/ui'
import { notifyOnSuccess } from '@/utils'

import { Hero } from './components/Hero/Hero'
import { Info } from './components/Info/Info'
import { Slide } from './components/Slide'

import styles from './Main.module.scss'

import 'swiper/css'
import 'swiper/css/scrollbar'

export const Main = () => {
	const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
	const [params] = useSearchParams()
	const isEmailConfirmed = params.get('email_confirmed') === '1'

	if (isEmailConfirmed) {
		notifyOnSuccess('Вы успешно подтвердили почту!', 'emailConfirmed')
	}

	return (
		<Swiper
			className={styles.sectionSlider}
			direction='vertical'
			modules={[Mousewheel, Keyboard, Scrollbar]}
			slidesPerView={1}
			spaceBetween={0}
			speed={500}
			threshold={5}
			keyboard={{
				enabled: true,
				onlyInViewport: false
			}}
			mousewheel={{
				sensitivity: 1,
				thresholdDelta: 10
			}}
			scrollbar={{
				draggable: false,
				el: '.swiper-scrollbar',
				enabled: true,
				hide: false,
				snapOnRelease: true
			}}
			onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
		>
			<SwiperSlide>
				<Slide isActive={activeSlideIndex === 0}>
					<Hero />
				</Slide>
			</SwiperSlide>
			<SwiperSlide>
				<Slide isActive={activeSlideIndex === 1}>
					<Info />
				</Slide>
			</SwiperSlide>
			<SwiperSlide>
				<Container className={styles.main}>
					<p style={{ fontSize: 72 }}>ЖОПА</p>
				</Container>
			</SwiperSlide>
			<SwiperSlide>
				<Container className={styles.main}>
					<p style={{ fontSize: 72 }}>КОНЕЦ</p>
				</Container>
			</SwiperSlide>
			<div className={styles.customScrollbar} slot='container-end'>
				<div className='swiper-scrollbar' />
			</div>
		</Swiper>
	)
}
