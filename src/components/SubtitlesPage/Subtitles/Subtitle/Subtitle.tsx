import type { FC } from 'react';
import React from 'react'

import type { Subtitle as ISubtitle } from '@/types'

import styles from './Subtitle.module.scss'

interface SubtitleProps {
	subtitle: ISubtitle
}

export const Subtitle: FC<SubtitleProps> = ({ subtitle }) => (
		<li className={styles.container}>
			<span className={styles.timecode}>{subtitle.timecode}</span>
			<span className={styles.text}>{subtitle.text}</span>
		</li>
	)
