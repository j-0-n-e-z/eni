// eslint-disable-next-line arrow-body-style
import { motion as m } from 'framer-motion'

import { fadeInAndUp } from '@/animations/variants'
import { Background, Button, Input } from '@/ui'
import { notifyOnSuccess } from '@/utils'

import { Links } from './components/Links'
import { useContact } from './hooks/useContact'

import styles from './Contact.module.scss'

export const Contact = () => {
	const { form, functions, state } = useContact({
		onSuccess: () => notifyOnSuccess('Сообщение отправлено!', 'contactSuccess')
	})

	return (
		<section className={styles.contacts}>
			<div className={styles.aboutMe}>
				<m.h2 variants={fadeInAndUp}>Мой GitHub и прочие ссылки</m.h2>
				<Links />
			</div>

			<form className={styles.form} onSubmit={functions.onSubmit}>
				<fieldset className={styles.fields} disabled={state.isLoading}>
					<legend className={styles.legend}>Связаться со мной</legend>

					<Input
						id='name'
						placeholder='Имя'
						type='text'
						{...form.register('name')}
						{...('name' in state.errors && {
							error: state.errors.name?.message
						})}
					/>

					<Input
						id='emailOrTelegram'
						placeholder='Email или telegram'
						type='text'
						{...form.register('emailOrTelegram')}
						{...('emailOrTelegram' in state.errors && {
							error: state.errors.emailOrTelegram?.message
						})}
					/>

					<Input
						className={styles.textarea}
						component='textarea'
						minLength={4}
						placeholder='Поделитесь мнением или задайте вопрос...'
						rows={5}
						{...form.register('message')}
						{...('message' in state.errors && {
							error: state.errors.message?.message
						})}
					/>

					<Button type='submit'>Отправить</Button>
				</fieldset>
			</form>

			<Background.Line className={styles.bgLine} />
		</section>
	)
}
