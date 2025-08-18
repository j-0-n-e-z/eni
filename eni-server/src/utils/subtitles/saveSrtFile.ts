import fs from 'fs'

export function saveSrtFile(data: string, filename: string) {
	const dir = 'srt'
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir)
	}
	fs.writeFile(`${dir}/${filename}`, data, (err) => {
		if (err) {
			console.log(`Failed to save SRT file: ${err.message}`)
		} else {
			console.log(`SRT file saved to: ${`${dir}/${filename}`}`)
		}
	})
}
