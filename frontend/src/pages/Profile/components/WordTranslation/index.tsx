import type { FC } from 'react'

import styles from './WordTranslation.module.scss'

interface WordTranslationProps {
	translation: string
}

export const WordTranslation: FC<WordTranslationProps> = ({ translation }) => {
	const isDefinition =
		translation && (translation.includes('\n') || translation.includes(': '))

	const transformDefinitionToTranslation = (translation: string) =>
		translation.split('\n').map((def) => {
			const [pos, tr] = def.split(': ')
			return (
				<div key={pos} className={styles.translation}>
					<span className={styles.translationPos}>{pos}</span>: {tr}
				</div>
			)
		})

	return (
		<div className={styles.translationContainer}>
			{isDefinition ? (
				transformDefinitionToTranslation(translation)
			) : (
				<div className={styles.translation}>{translation}</div>
			)}
		</div>
	)
}
