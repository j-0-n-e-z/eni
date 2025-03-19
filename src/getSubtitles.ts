export async function getSubtitles(fileId: number) {
	const response = await fetch('http://localhost:8080', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			file_id: fileId
		})
	})

	console.log(await response.json())
}
