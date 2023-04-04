import { useCallback, useEffect, useMemo, useState } from 'react'

const isSupportedSpeedRecognition = !!window.webkitSpeechRecognition

export const useSpeechRecognition = ({
  lang = 'es-ES'
}: {
  lang: string
}) => {
  const [transcription, setTranscription] = useState('')
  const recognition = useMemo(() => {
    if (!isSupportedSpeedRecognition) return undefined

    const SpeechRecognition = webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    return recognition
  }, [lang])

  const onResult = useCallback((e: SpeechRecognitionEvent) => {
    const results = e.results
    const transcript = Array
      .from(results)
      .map(([{ transcript }]) => transcript)
      .join('')
    setTranscription(transcript)
  }, [recognition])

  useEffect(() => {
    recognition?.addEventListener('result', onResult)
  }, [recognition])

  const startRecognition = () => recognition?.start()
  const stopRecognition = () => recognition?.stop()

  return {
    startRecognition,
    stopRecognition,
    transcription,
    browserSupportsSpeechRecognition: true
  }
}
