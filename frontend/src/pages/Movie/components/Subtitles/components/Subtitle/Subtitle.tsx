import type { PureSubtitle } from '@eni/shared'
import cn from 'classnames'
import { useEffect, useRef } from 'react'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'

import { Button, Icons, Skeleton } from '@/ui'

import { useTranslate } from '../../hooks'

import { SubtitleWords } from './SubtitleWords/SubtitleWords'

import styles from './Subtitle.module.scss'

interface SubtitleProps {
	subtitle: PureSubtitle
}

export const Subtitle = ({ subtitle }: SubtitleProps) => {
	const [searchParams] = useSearchParams()
	const { fileId } = useParams()
	const { kinopoiskId } = useOutletContext<MovieContext>()
	const { translate, translation, isTranslationFetching } = useTranslate()

	const isLookedUpSubtitle = subtitle.timecode === searchParams.get('timecode')
	const lookupTarget = useRef<HTMLLIElement>(null)

	useEffect(() => {
		if (!isLookedUpSubtitle || !lookupTarget.current) return

		const timer = setTimeout(() => {
			lookupTarget.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})
		}, 200)

		return () => clearTimeout(timer)
	}, [isLookedUpSubtitle])

	return (
		<li
			ref={isLookedUpSubtitle ? lookupTarget : undefined}
			className={cn(styles.subtitle, {
				[styles.highlighted]: isLookedUpSubtitle
			})}
		>
			<div className={styles.header}>
				<span className={styles.timecode}>{subtitle.timecode}</span>
				<Button
					className={styles.translateBtn}
					variant='outlined'
					onClick={() => translate(subtitle.text)}
				>
					<Icons.Translate />
				</Button>
			</div>

			{isTranslationFetching && <Skeleton containerClassName='flex1' />}
			{!isTranslationFetching && translation && (
				<div className={styles.translation}>{translation}</div>
			)}

			<SubtitleWords
				fileId={Number(fileId)}
				kinopoiskId={kinopoiskId}
				subtitle={subtitle}
			/>
		</li>
	)
}
