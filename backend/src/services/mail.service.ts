import { inject, injectable } from 'inversify'
import type nodemailer from 'nodemailer'

import { TYPES } from '@/inversify/types'

import type { IMailService } from './services-types'

@injectable()
export class MailService implements IMailService {
	constructor(
		@inject(TYPES.ITransporter)
		private readonly transporter: nodemailer.Transporter
	) {}

	async sendConfirmationEmail(to: string, link: string) {
		await this.sendEmail(
			to,
			'Account activation',
			`<div>
					<h1>Для активации перейдите по ссылке:</h1>
					<a href="${link}">${link}</a>
			</div>`
		)
	}

	async sendEmail(to: string, subject: string, html: string) {
		if (process.env.SMTP_USER)
			await this.transporter.sendMail({
				from: process.env.SMTP_USER,
				sender: 'Eni',
				to,
				subject,
				text: '',
				html
			})
	}
}
