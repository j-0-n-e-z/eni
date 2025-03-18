async function downloadSubtitle(fileId: number) {
  const apiKey = import.meta.env.VITE_OPENSUBTITLES_API_KEY
  const authToken = import.meta.env.VITE_AUTH_TOKEN
  const url = `https://api.opensubtitles.com/api/v1/download?file_id=${fileId}`
  
  try {
      const response = await fetch(url, {
        headers: {
          'Api-Key': apiKey,
          'Authorization': `Bearer ${authToken}`,
          'User-Agent': 'eni v1',
        }
      })
  
      if (!response.ok) {
        throw new Error('Error due request to OpenSubtitles')
      }
  
    } catch (error) {
      console.error('Ошибка:', error)
      return null
    }
}