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
import { HiOutlineHeart, HiOutlineVolumeUp, HiOutlineShare } from 'react-icons/hi'
import { CgTrashEmpty } from 'react-icons/cg'

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

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleShareTranslation = () => {
  }

  const handleMarkFavTranslation = () => {
  }

  const handleTextToSpeech = () => {
  }

  const handleDeleteTranslation = () => {
    setFromText('')
  }

  return (
    <div className='App flex gap-2 justify-center items-center h-[100vh] bg-blue-300'>
      <div className='flex gap-2 flex-col bg-gray-50 p-3 rounded-lg shadow-xl w-[400px]'>
        <h1 className='text-3xl text-center font-bold p-3'>
          <span className='text-cyan-600'>AI</span>
          <span className='text-gray-900'>translator</span>
        </h1>
        <div className='w-full bg-white flex gap-5 items-center rounded-lg'>
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
        <div className='w-full flex bg-white flex-col items-center rounded-lg overflow-hidden'>
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
      </div>
    </div>
  )
}
