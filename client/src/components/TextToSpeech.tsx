import { HiOutlineVolumeUp } from 'react-icons/hi'
import { type FC } from 'react'

interface Props {
  text?: string
  language: string | undefined
}

const TextToSpeech: FC<Props> = ({ text, language }) => {
  const handleClick = () => {
    if (!text) return

    console.log({ text, language })

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language ?? 'es-ES'
    speechSynthesis.speak(utterance)
  }

  return (
    <button
      className={`${text ? 'text-gray-800 hover:text-gray-900 cursor-pointer' : 'text-gray-400 cursor-default'}`}
      onClick={handleClick}
    >
      <HiOutlineVolumeUp />
    </button>
  )
}

export default TextToSpeech
