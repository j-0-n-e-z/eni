/* eslint-disable no-console */
import axios from 'axios'
import cookieParser from 'cookie-parser'
import cors from 'cors'
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

const app = express()

app.use(
	cors({
		origin: true,
		credentials: true
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
	res.status(200).json({ message: "It's working!" })
})

app.get('/alloha', async (req, res) => {
	try {
		const { kp } = req.query
		const response = await axios.get(
			`https://api.alloha.tv/?token=d317441359e505c343c2063edc97e7&kp=${kp?.toString()}`
		)
		res.json(response.data)
	} catch (error) {
		res.status(500).json({ error: 'Ошибка запроса к Alloha' })
	}
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
