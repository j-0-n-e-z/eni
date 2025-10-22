import nodemailer from 'nodemailer'

export const gmailTransporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD
	}
})
