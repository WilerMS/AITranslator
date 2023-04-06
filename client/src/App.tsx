import { HiArrowsRightLeft } from 'react-icons/hi2'
import { useTranslatorStore } from '@hooks/useTranslatorStore'
import { LanguageSelector } from '@components/LanguageSelector'
import { AUTO_LANGUAGE, SUPORTED_LANGUAGES } from '@constants/suportedLanguages'
import { Textarea } from '@components/Textarea'
import { useEffect } from 'react'
import { useDebounce } from '@hooks/useDebounce'
import { translate } from 'service/translator'
import ActionButton from '@components/ActionButton'
import { FiCopy } from 'react-icons/fi'
import { HiOutlineHeart, HiOutlineVolumeUp, HiOutlineShare, HiOutlineCamera, HiMenuAlt2 } from 'react-icons/hi'
import { CgTrashEmpty } from 'react-icons/cg'
import { useSpeechRecognition } from '@hooks/useSpeechRecognition'
import Dictaphone from '@components/SpeechRecognition'
import Logo from '@components/Logo'
import Favorites, { FavoriteItem } from '@components/Favorites'
import TranslationToolsBar from '@components/TranslationToolsBar'
import { useTranslatorContext } from 'context/translator'

export default function App () {
  const {
    result,
    fromText,
    fromLanguage,
    toLanguage,
    loading,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    setFromText,
    setResult
  } = useTranslatorStore()

  const debouncedText = useDebounce(fromText)

  useEffect(() => {
    if (debouncedText === '') return

    // @ts-expect-error
    const from = SUPORTED_LANGUAGES[fromLanguage]?.name ?? AUTO_LANGUAGE
    // @ts-expect-error
    const to = SUPORTED_LANGUAGES[toLanguage]?.name

    translate(debouncedText, from, to)
      .then((result) => {
        setResult(result)
      })
      .catch((e) => {
        setResult('Error...!')
      })
  }, [debouncedText, fromLanguage, toLanguage])

  const {
    transcription,
    startRecognition,
    stopRecognition
    // @ts-expect-error
  } = useSpeechRecognition({ lang: SUPORTED_LANGUAGES[fromLanguage]?.slang })

  const { favTranslations, setFavTranslations } = useTranslatorContext()

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleShareTranslation = () => {
  }

  const handleMarkFavTranslation = () => {
    setFavTranslations([{ result, fromText, fromLanguage, toLanguage }, ...favTranslations])
  }

  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    // @ts-expect-error
    utterance.lang = SUPORTED_LANGUAGES[toLanguage].slang ?? 'es-ES'
    speechSynthesis.speak(utterance)
  }

  const handleDeleteTranslation = () => {
    setFromText('')
  }

  useEffect(() => {
    setFromText(transcription)
  }, [transcription])

  return (
    <div className='App flex gap-2 justify-center items-center h-[100vh] bg-blue-300'>

      <div className='bg-gray-50 w-full h-full overflow-hidden md:max-h-[800px] md:max-w-[1000px] md:shadow-xl md:rounded-lg md:flex'>

        <div className='w-full h-full md:flex'>
          <Favorites>
            {favTranslations.map((translation) => (
              <FavoriteItem
                key={translation.fromText}
                {...translation}
              />
            ))}
          </Favorites>

          <div className='flex gap-3 flex-col p-3 md:pl-0 h-full w-full'>
            <Logo className='md:hidden' />
            <div className='w-full h-[60px] bg-white flex gap-5 items-center rounded-lg'>
              <LanguageSelector value={fromLanguage} onChange={setFromLanguage} />
              <button
                disabled={fromLanguage === AUTO_LANGUAGE}
                className='disabled:text-gray-400'
                onClick={interchangeLanguages}
              >
                <HiArrowsRightLeft />
              </button>
              <LanguageSelector value={toLanguage} onChange={setToLanguage} isFromLanguage={false} />
            </div>
            <div className='w-full h-full flex bg-white flex-col items-center rounded-lg overflow-hidden'>
              <Textarea value={fromText} onChange={setFromText} />
              <Textarea value={result} isFromText={false} loading={loading} />
              <div className="w-full px-3 flex flex-col items-center">
                <div className="border-t py-3 w-full flex justify-around text-2xl">
                  {/* Copy result to clipboard */}
                  <ActionButton onClick={handleCopyTranslation} isActive={!!result}>
                    <FiCopy />
                  </ActionButton>

                  {/* Share in social networks */}
                  <ActionButton onClick={handleShareTranslation} isActive={!!result}>
                    <HiOutlineShare />
                  </ActionButton>

                  {/* Mark as fav */}
                  <ActionButton onClick={handleMarkFavTranslation} isActive={!!result}>
                    <HiOutlineHeart />
                  </ActionButton>

                  {/* Text to speech */}
                  <ActionButton onClick={handleTextToSpeech} isActive={!!result}>
                    <HiOutlineVolumeUp />
                  </ActionButton>

                  {/* Delete translation */}
                  <ActionButton onClick={handleDeleteTranslation} isActive={!!result}>
                    <CgTrashEmpty />
                  </ActionButton>
                </div>
              </div>
            </div>
            <div className='relative w-full h-1/3 rounded-lg flex items-center justify-center gap-5'>
              <button className='text-cyan-600 bg-white rounded-full z-40 shadow-xl p-3 text-2xl transition hover:scale-105 active:scale-95'>
                <HiMenuAlt2 />
              </button>
              <Dictaphone
                onTouchStart={startRecognition}
                onMouseDown={startRecognition}
                onTouchEnd={stopRecognition}
                onMouseUp={stopRecognition}
              />
              <button className='text-cyan-600 bg-white rounded-full z-40 shadow-xl p-3 text-2xl transition hover:scale-105 active:scale-95'>
                <HiOutlineCamera />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>

  )
}
