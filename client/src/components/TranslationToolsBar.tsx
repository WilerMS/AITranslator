import { useTranslatorContext } from 'context/translator'
import { CgTrashEmpty } from 'react-icons/cg'
import { FiCopy } from 'react-icons/fi'
import { HiOutlineHeart, HiOutlineShare, HiOutlineVolumeUp } from 'react-icons/hi'
import ActionButton from './ActionButton'

const TranslationToolsBar = ({ text, setFromText }: { text: string, setFromText: (text: string) => void }) => {
  const {
    favTranslations,
    setFavTranslations
  } = useTranslatorContext()

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(text).catch(() => { })
  }

  const handleShareTranslation = () => {
  }

  const handleMarkFavTranslation = () => {

  }

  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(text)
    // @ts-expect-error
    utterance.lang = SUPORTED_LANGUAGES[toLanguage].slang ?? 'es-ES'
    speechSynthesis.speak(utterance)
  }

  const handleDeleteTranslation = () => {
    setFromText('')
  }

  return (
    <div className="w-full px-3 flex flex-col items-center">
      <div className="border-t py-3 w-full flex justify-around text-2xl">
        {/* Copy result to clipboard */}
        <ActionButton onClick={handleCopyTranslation} isActive={!!text}>
          <FiCopy />
        </ActionButton>

        {/* Share in social networks */}
        <ActionButton onClick={handleShareTranslation} isActive={!!text}>
          <HiOutlineShare />
        </ActionButton>

        {/* Mark as fav */}
        <ActionButton onClick={handleMarkFavTranslation} isActive={!!text}>
          <HiOutlineHeart />
        </ActionButton>

        {/* Text to speech */}
        <ActionButton onClick={handleTextToSpeech} isActive={!!text}>
          <HiOutlineVolumeUp />
        </ActionButton>

        {/* Delete translation */}
        <ActionButton onClick={handleDeleteTranslation} isActive={!!text}>
          <CgTrashEmpty />
        </ActionButton>
      </div>
    </div>
  )
}

export default TranslationToolsBar
