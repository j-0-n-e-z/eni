import { Button, Icons } from '@/ui'

import styles from '../MovieInfo.module.scss'

interface TranslateTitleButtonProps {
	originalTitle: string | null
	ruTitle: string | null
	toggleTranslation: () => void
}

export const TranslateTitleButton = ({
	originalTitle,
	ruTitle,
	toggleTranslation
}: TranslateTitleButtonProps) =>
	originalTitle &&
	ruTitle && (
		<Button
			aria-label='Переключить язык названия'
			variant='outlined'
			onClick={toggleTranslation}
		>
			<Icons.Translate className={styles.translateTitleIcon} />
		</Button>
	)
