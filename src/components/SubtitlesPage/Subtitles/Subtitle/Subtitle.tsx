import React, { FC } from 'react'
import { Subtitle as ISubtitle } from '../../../../types'
import styles from './Subtitle.module.scss'

interface SubtitleProps {
	subtitle: ISubtitle
}

export const Subtitle: FC<SubtitleProps> = ({ subtitle }) => {
	return (
		<li className={styles.container}>
			<span className={styles.timecode}>{subtitle.timecode}</span>
			<span className={styles.text}>{subtitle.text}</span>
		</li>
	)
}
