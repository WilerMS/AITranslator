import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslatorStore } from '@hooks/useTranslatorStore'
import { LanguageSelector } from '@components/LanguageSelector'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { AUTO_LANGUAGE } from '@constants/suportedLanguages'
import { Textarea } from '@components/Textarea'

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
    setFromText
  } = useTranslatorStore()

  return (
    <div className='App flex gap-2 justify-center items-center h-[100vh] bg-blue-300'>
      <div className='flex gap-2 flex-col bg-white px-3 py-10 rounded-lg shadow-xl w-[750px]'>
        <h1 className='text-3xl text-center font-bold p-4'>ChatGPT Translator</h1>
        <div className='w-full flex gap-5 items-center'>
          <LanguageSelector value={fromLanguage} onChange={setFromLanguage} />
          <button
            disabled={fromLanguage === AUTO_LANGUAGE}
            className='disabled:text-gray-400'
            onClick={interchangeLanguages}
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className='text-xl' />
          </button>
          <LanguageSelector value={toLanguage} onChange={setToLanguage} isFromLanguage={false} />
        </div>
        <div className='w-full flex gap-16 items-center'>
          <Textarea
            value={fromText}
            onChange={setFromText}
          />
          <Textarea
            value={result}
            isFromText={false}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}
