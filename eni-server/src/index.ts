import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { ErrorHandler } from './middlewares/error.middleware'
import { authRouter } from './routes/auth.route'
import { movieRouter } from './routes/movies.route'
import { subtitlesRouter } from './routes/subtitles.route'
import { translateRouter } from './routes/translate.route'
import { userRouter } from './routes/user.route'
import { prisma } from './utils/prismaClient'
import axios from 'axios'

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/alloha', async (req, res) => {
	try {
		const { kp } = req.query
		const response = await axios.get(
			`https://api.alloha.tv/?token=d317441359e505c343c2063edc97e7&kp=${kp}`
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

app.use(new ErrorHandler((error) => console.error(error)).handle)

const PORT = process.env.PORT || 8080

async function main() {
	try {
		app.listen(PORT, () => {
			console.log(`[server]: Server is running at http://localhost:${PORT}`)
		})
	} catch (e) {
		console.error(e)
	} finally {
		await prisma.$disconnect()
	}
}

main()
