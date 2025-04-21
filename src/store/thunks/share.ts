export const apiKey = import.meta.env.VITE_API_KEY
export const headers = {
	'Api-Key': apiKey,
	'X-User-Agent': 'eni v0.0.1',
	'Content-Type': 'application/json'
}
