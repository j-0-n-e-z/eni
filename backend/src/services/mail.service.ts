import type nodemailer from 'nodemailer'

import type { IMailService } from './types'

export class MailService implements IMailService {
	constructor(private readonly transporter: nodemailer.Transporter) {}

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
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject,
			text: '',
			html
		})
	}
}
