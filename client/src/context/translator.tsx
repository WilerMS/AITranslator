import { useLocalStorage } from '@hooks/useLocalStorage'
import { createContext, useContext, type FC } from 'react'
import { type Translation } from 'types'

interface TranslatorContextType {
  favTranslations: Translation[]
  setFavTranslations: React.Dispatch<Translation[]>
}

interface TranslatorContextProviderType {
  children: JSX.Element | JSX.Element[] | string
}

const TranslatorContext = createContext<TranslatorContextType>({
  favTranslations: [],
  setFavTranslations: (value) => { }
})

export const TranslatorContextProvider: FC<TranslatorContextProviderType> = ({
  children
}) => {
  const [favTranslations, setFavTranslations] = useLocalStorage<Translation[]>('favTranslations', [])

  return (
    <TranslatorContext.Provider
      value={{
        favTranslations,
        setFavTranslations
      }}
    >
      {children}
    </TranslatorContext.Provider>
  )
}

export const useTranslatorContext = () => useContext(TranslatorContext)
