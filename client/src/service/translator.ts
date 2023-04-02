export const translate = async (text: string, fromLanguage: string, toLanguage: string) => {
  const Url = new URL('http://127.0.0.1:8000/translate')

  Url.searchParams.append('text', text)
  Url.searchParams.append('from_language', fromLanguage)
  Url.searchParams.append('to_language', toLanguage)

  const response = await fetch(Url)
  const json = await response.json()

  return json.result
}
