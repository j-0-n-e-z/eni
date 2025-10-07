/* eslint-disable no-console */
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { ErrorHandler } from '@/middlewares'
import {
	authRouter,
	movieRouter,
	subtitlesRouter,
	translateRouter,
	userRouter,
	wordRouter
} from '@/routes'
import { prisma } from '@/utils'

dotenv.config()

const app = express()

app.use(
	cors({
		origin: process.env.CORS_ORIGIN_URL,
		credentials: true
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/health', (req, res) => {
	res.status(200).json({ message: "It's working!" })
})

app.use('/api', movieRouter)
app.use('/api', subtitlesRouter)
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', translateRouter)
app.use('/api', wordRouter)

const logger = (error: Error) => console.error(error)
app.use(new ErrorHandler(logger).handle)

const PORT = Number(process.env.PORT) || 8080

async function main() {
	try {
		app.listen(PORT, '0.0.0.0', () => {
			console.log(`[server]: Server is running at http://localhost:${PORT}`)
		})
	} catch (e) {
		console.error(e)
	} finally {
		await prisma.$disconnect()
	}
}

main()
