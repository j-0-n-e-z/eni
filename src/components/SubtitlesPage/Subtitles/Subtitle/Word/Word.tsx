/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react'

import { useAppDispatch } from '@/app/index'
import { addWord } from '@/store/slices/wordsSlice'

import styles from './Word.module.scss'

interface WordProps {
	text: string
}

export const Word: FC<WordProps> = ({ text }) => {
	const dispatch = useAppDispatch()

	function selectWord() {
		dispatch(addWord(text))
	}

	return (
		<div className={styles.wordContainer}>
			<span className={styles.text}>{text}</span>
			<div className={styles.controls}>
				<button className={styles.addBtn}>
					<img
						alt='+'
						className={styles.addIcon}
						src='/assets/icons/icon-cancel.svg'
						onClick={selectWord}
					/>
				</button>
				<button className={styles.removeBtn}>
					<img
						alt='x'
						className={styles.removeIcon}
						src='/assets/icons/icon-cancel.svg'
					/>
				</button>
			</div>
		</div>
	)
}
