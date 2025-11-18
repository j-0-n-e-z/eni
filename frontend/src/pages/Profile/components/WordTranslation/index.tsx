import styles from './WordTranslation.module.scss'

interface WordTranslationProps {
	translation: string
}

export const WordTranslation = ({ translation }: WordTranslationProps) => {
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
				<span className={styles.translation}>{translation}</span>
			)}
		</div>
	)
}
