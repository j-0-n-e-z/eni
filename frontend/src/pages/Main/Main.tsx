import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Swiper as SwiperType } from 'swiper'
import { Keyboard, Mousewheel, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { notifyOnSuccess } from '@/utils'

import { Hero } from './components/Hero/Hero'
import { Info } from './components/Info/Info'
import { Slide } from './components/Slide/Slide'

import styles from './Main.module.scss'

import 'swiper/css'
import 'swiper/css/scrollbar'

export const Main = () => {
	const swiperRef = useRef<SwiperType | null>(null)
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
			onSwiper={(swiper) => {
				swiperRef.current = swiper
			}}
		>
			<SwiperSlide>
				<Slide isActive={activeSlideIndex === 0}>
					<Hero goToNextSlide={() => swiperRef.current?.slideNext()} />
				</Slide>
			</SwiperSlide>

			<SwiperSlide>
				<Slide isActive={activeSlideIndex === 1}>
					<Info />
				</Slide>
			</SwiperSlide>

			<SwiperSlide>
				<Slide isActive={activeSlideIndex === 2}>
					<div>TBD</div>
				</Slide>
			</SwiperSlide>

			<SwiperSlide>
				<Slide isActive={activeSlideIndex === 3}>
					<div>TBD</div>
				</Slide>
			</SwiperSlide>

			<div className={styles.customScrollbar} slot='container-end'>
				<div className='swiper-scrollbar' />
			</div>
		</Swiper>
	)
}
