import { SUPORTED_LANGUAGES } from '@constants/suportedLanguages'
import { useDebounce } from '@hooks/useDebounce'
import { useTranslatorContext } from 'context/translator'
import React, { useEffect, useMemo, useState, type FC } from 'react'
import { CgTrashEmpty } from 'react-icons/cg'
import { FaHeart, FaSearch, FaTimes, FaTrash } from 'react-icons/fa'
import { MdChevronLeft } from 'react-icons/md'

import { type Translation } from 'types'
import { intersection } from 'utils'
import Logo from './Logo'
import cn from 'classnames'

interface FavoritesProps {
  translations: Translation[]
  onClose: () => void
  show?: boolean
}

interface FavoriteSearchProps {
  onSearch: (value: string) => void
}

const FavoriteSearch: FC<FavoriteSearchProps> = ({
  onSearch
}) => {
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handleToggleSearch = () => { setIsSearching(!isSearching) }

  useEffect(() => {
    onSearch(debouncedText)
  }, [debouncedText])

  return (
    <div className="w-full h-[63px] p-3 flex items-center justify-between font-semibold bg-white rounded-lg">
      {isSearching
        ? <input className='outline-none font-normal' placeholder='Search in dictionary...' type="text" value={text} onChange={handleChange} />
        : <h2 className='text-2xl text-gray-700'>Dictionary</h2>
      }
      <button onClick={handleToggleSearch}>
        {isSearching
          ? <FaTimes className='text-xl text-gray-700' />
          : <FaSearch className='text-xl text-gray-700' />
        }
      </button>
    </div>
  )
}

const Favorites: FC<FavoritesProps> = ({ translations, onClose = () => {}, show = true }) => {
  const [searchedText, setSearchedText] = useState('')

  const handleSearchFavorite = (value: string) => { setSearchedText(value) }

  const intersectedTranslations = useMemo(() => {
    if (searchedText) {
      return intersection(searchedText, translations)
    }
    return translations
  }, [searchedText, translations])

  return (
    <div
      className={cn(
        show ? 'right-0' : 'right-[100%]',
        'transition-all',
        'absolute w-full h-full z-[99] ',
        'md:right-0 md:relative md:max-w-[400px] md:min-w-[400px] md:flex flex-col p-3 gap-3'

      )}
    >
      <div className='bg-white rounded-lg flex items-center'>
        <button
          onClick={onClose}
          className='md:hidden h-full bg-white text-4xl'
        >
          <MdChevronLeft />
        </button>
        <FavoriteSearch onSearch={handleSearchFavorite} />
      </div>

      <div className='p-3 bg-white h-full rounded-lg flex flex-col gap-3 overflow-y-scroll scrollbar-hide md:pb-24'>
        {intersectedTranslations.map((translation) => (
          <FavoriteItem
            key={translation.fromText}
            {...translation}
          />
        ))}
      </div>

      <Logo className='absolute bottom-0 mb-2 z-50' />
      <div className='absolute bottom-0 left-0 bg-gradient-to-t from-gray-50 p-4 w-full h-[150px]'></div>
    </div>
  )
}

export const FavoriteItem: FC<Translation> = ({ id, fromLanguage, fromText, result, toLanguage }) => {
  const { deleteFavTranslation } = useTranslatorContext()

  const handleDeleteFavoriteTranslation = () => {
    deleteFavTranslation(id)
  }

  return (
    <div className='relative w-full border border-gray-100 rounded-lg'>
      <div className='p-3 border-b border-gray-100'>
        {/* @ts-expect-error */}
        <h3 className='text-xl font-semibold'>{SUPORTED_LANGUAGES[fromLanguage].flag} {SUPORTED_LANGUAGES[fromLanguage].name}</h3>
        <span className='block mt-1 text-gray-600 overflow-hidden truncate text-ellipsis'>{fromText}</span>
      </div>
      <div className='p-3'>
        {/* @ts-expect-error */}
        <h3 className='text-xl font-semibold'>{SUPORTED_LANGUAGES[toLanguage].flag} {SUPORTED_LANGUAGES[toLanguage].name}</h3>
        <span className='block mt-1 text-gray-600 overflow-hidden truncate text-ellipsis'>{result}</span>
      </div>

      <button
        onClick={handleDeleteFavoriteTranslation}
        className='absolute top-[10px] right-[10px] text-2xl'
      >
        <CgTrashEmpty />
      </button>
    </div>
  )
}

export default Favorites
