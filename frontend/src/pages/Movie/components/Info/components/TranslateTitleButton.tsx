import { Button, Icons } from '@/ui'

import styles from '../Info.module.scss'

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
			className={styles.translateBtn}
			variant='outlined'
			onClick={toggleTranslation}
		>
			<Icons.Translate className={styles.translateTitleIcon} />
		</Button>
	)
