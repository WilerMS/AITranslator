import { SUPORTED_LANGUAGES } from '@constants/suportedLanguages'
import React, { type FC } from 'react'
import { FaHeart, FaSearch } from 'react-icons/fa'
import { type Translation } from 'types'
import Logo from './Logo'

interface FavoritesProps {
  children: JSX.Element | JSX.Element[]
}

const Favorites: FC<FavoritesProps> = ({ children }) => {
  return (
    <div className='hidden relative md:max-w-[400px] md:min-w-[400px] md:flex flex-col p-3 gap-3'>

      <div className="w-full h-[63px] p-3 flex items-center justify-between font-semibold bg-white rounded-lg">
        <h2 className='text-2xl text-gray-700'>Dictionary</h2>
        <FaSearch className='text-xl text-gray-700' />
      </div>

      <div className='p-3 bg-white h-full rounded-lg flex flex-col gap-3 overflow-y-scroll scrollbar-hide md:pb-24'>
        {children}
      </div>

      <Logo className='absolute bottom-0 mb-2 z-50' />
      <div className='absolute bottom-0 left-0 bg-gradient-to-t from-gray-50 p-4 w-full h-[150px]'></div>
    </div>
  )
}

export const FavoriteItem: FC<Translation> = ({ fromLanguage, fromText, result, toLanguage }) => {
  return (
    <div className=' w-full border border-gray-100 rounded-lg'>
      <div className='p-3 border-b border-gray-100'>
        <h3 className='text-xl font-semibold'>{SUPORTED_LANGUAGES[fromLanguage].flag} {SUPORTED_LANGUAGES[fromLanguage].name}</h3>
        <span className='block mt-1 text-gray-600 overflow-hidden truncate text-ellipsis'>{fromText}</span>
      </div>
      <div className='p-3'>
        <h3 className='text-xl font-semibold'>{SUPORTED_LANGUAGES[toLanguage].flag} {SUPORTED_LANGUAGES[toLanguage].name}</h3>
        <span className='block mt-1 text-gray-600 overflow-hidden truncate text-ellipsis'>{result}</span>
      </div>
    </div>
  )
}

export default Favorites
