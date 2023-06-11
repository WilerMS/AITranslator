export const intersection = <T>(inputString: string, objectArray: T[]): T[] => {
  const matches: T[] = []

  for (const obj of objectArray) {
    for (const key in obj) {
      const objKey = obj[key] as unknown as string
      if (objKey.toLowerCase().includes(inputString.toLowerCase()) && !matches.includes(obj)) {
        matches.push(obj)
        break
      }
    }
  }

  return matches
}
