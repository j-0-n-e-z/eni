import { useGetPopularWordsQuery } from '@/store/api'
import { Container, EmptyState, ErrorDisplay, Icons } from '@/ui'

import styles from './Popular.module.scss'

export const Popular = () => {
	const {
		data: words,
		isFetching: isWordsFetching,
		error: wordsError
	} = useGetPopularWordsQuery()

	if (isWordsFetching) return <div>...Loading</div>

	if (wordsError) return <ErrorDisplay error={wordsError} />

	function renderWords() {
		if (!words)
			return (
				<EmptyState
					description='Нет данных о популярных словах'
					header='Упс...'
					icon={<Icons.EmptyIcon />}
				/>
			)

		return (
			<ul className={styles.wordsList}>
				{words.map((word) => (
					<li key={word.id} className={styles.word}>
						{word.text} {word.translationCount}
					</li>
				))}
			</ul>
		)
	}

	return (
		<section className={styles.popularWordsSection}>
			<Container>
				<h2 className={styles.popularWordsHeader}>Popular words</h2>
				{renderWords()}
			</Container>
		</section>
	)
}
