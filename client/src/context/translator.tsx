import { useLocalStorage } from '@hooks/useLocalStorage'
import { createContext, useContext, type FC } from 'react'
import { type Translation } from 'types'

interface TranslatorContextType {
  favTranslations: Translation[]
  setFavTranslations: React.Dispatch<Translation[]>
  deleteFavTranslation: (id: string) => void
}

interface TranslatorContextProviderType {
  children: JSX.Element | JSX.Element[] | string
}

const TranslatorContext = createContext<TranslatorContextType>({
  favTranslations: [],
  setFavTranslations: (value) => { },
  deleteFavTranslation: (id) => {}
})

export const TranslatorContextProvider: FC<TranslatorContextProviderType> = ({
  children
}) => {
  const [favTranslations, setFavTranslations] = useLocalStorage<Translation[]>('favTranslations', [])

  const deleteFavTranslation = (id: string) => {
    const newFavTranslations = favTranslations.filter(translation => translation.id !== id)
    setFavTranslations(newFavTranslations)
  }

  return (
    <TranslatorContext.Provider
      value={{
        favTranslations,
        setFavTranslations,
        deleteFavTranslation
      }}
    >
      {children}
    </TranslatorContext.Provider>
  )
}

export const useTranslatorContext = () => useContext(TranslatorContext)
