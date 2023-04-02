import { AUTO_LANGUAGE, SUPORTED_LANGUAGES } from '@constants/suportedLanguages'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { type FC, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { type Language } from 'types'
import { useOutsideClick } from '@hooks/useOutsideClick'

interface Props {
  value: Language
  isFromLanguage?: boolean
  onChange: (value: Language) => void
}

export const LanguageSelector: FC<Props> = ({ value, isFromLanguage = true, onChange }) => {
  // @ts-expect-error
  const language = SUPORTED_LANGUAGES[value] ?? { name: 'Auto' }
  const [isExpanded, setIsExpanded] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [inputText, setInputText] = useState('')
  const ref = useRef(null)

  useOutsideClick(ref, () => {
    setIsExpanded(false)
    setIsActive(false)
    setInputText('')
  })

  const handleSelectLanguage = (value: Language) => {
    onChange(value)
    setIsExpanded(false)
    setIsActive(false)
    setInputText('')
  }

  const handleToggleSelect = () => {
    setIsExpanded(!isExpanded)
    setIsActive(false)
    setInputText('')
  }

  const handleOpenSelect = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsActive(true)
    setIsExpanded(true)
  }

  const handleClickInput = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsActive(true)
    setIsExpanded(true)
  }

  const availableLanguages = Object
    .entries(SUPORTED_LANGUAGES)
    .filter(([key, lang]) => (
      !inputText ||
      key.toLowerCase().includes(inputText.toLowerCase()) ||
      lang.name.toLowerCase().includes(inputText.toLowerCase())
    ))

  return (
    <div ref={ref} className="relative w-full flex flex-col gap-2">
      <div
        className='flex justify-between items-center bg-white p-3 rounded-md cursor-pointer'
        onClick={handleToggleSelect}
      >
        {isActive
          ? <div className='w-full '>
            <input
              type="text"
              placeholder='Write a language...'
              value={inputText}
              onChange={(e) => { setInputText(e.currentTarget.value) }}
              onClick={handleClickInput}
              className='w-full outline-none'
              autoFocus
            />
          </div>
          : <button
            className='flex gap-2'
            onClick={handleOpenSelect}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </button>
        }
        <FontAwesomeIcon
          className='text-sm p-3'
          icon={isExpanded ? faAngleUp : faAngleDown}
        />
      </div>
      <AnimatePresence>
        {isExpanded &&
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ ease: 'linear', duration: 0.1 }}
            className='absolute overflow-hidden top-full min-w-full flex p-3 justify-between items-center bg-white py-3 rounded-lg shadow cursor-pointer'
          >
            <ul className='w-full max-h-96 overflow-y-auto'>
              {isFromLanguage && !inputText &&
                <li
                  onClick={() => { handleSelectLanguage(AUTO_LANGUAGE) }}
                  key={AUTO_LANGUAGE}
                  className='w-full p-3 rounded-md transition hover:bg-gray-100'
                >
                  <button className='flex gap-2 text-gray-800'>
                    <span>Auto language</span>
                  </button>
                </li>
              }
              {availableLanguages.length
                ? availableLanguages.map(([key, lang]) => (
                  <li
                    onClick={() => { handleSelectLanguage(key as Language) }}
                    key={key}
                    className='w-full p-3 rounded-md transition hover:bg-gray-100'
                  >
                    <button className='flex gap-2'>
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  </li>
                ))
                : <li className='w-full p-3 rounded-md transition hover:bg-gray-100'>
                  <button className='flex gap-2 text-gray-500'>
                    <span>No languages found...</span>
                  </button>
                </li>
              }
            </ul>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector
