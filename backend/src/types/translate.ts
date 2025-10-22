export interface YandexDictionaryResponse {
	head: Record<string, never>
	def: Definition[]
	nmt_code: number
	code: number
}

export interface Definition {
	text: string
	pos: string // Part of Speech
	ts?: string // Транскрипция (может отсутствовать)
	tr: Translation[]
}

interface Translation {
	text: string
	pos: string
	gen?: string // Род (для существительных)
	asp?: string // Вид глагола (совершенный/несовершенный)
	fr?: number // Частота использования
	syn?: Synonym[]
	mean?: Meaning[]
}

interface Synonym {
	text: string
	pos?: string
	gen?: string
	fr?: number
}

interface Meaning {
	text: string
}

export interface YandexTranslateResponse {
	translations: Translation[]
}

interface Translation {
	text: string
	detectedLanguageCode: string
}
