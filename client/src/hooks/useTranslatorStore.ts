import { TranslatorActions } from '@actions/translator'
import { initialTanslatorState, translatorReducer } from '@reducers/translator'
import { useReducer } from 'react'
import { type Language } from 'types'

export const useTranslatorStore = () => {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    loading,
    result
  }, dispatch] = useReducer(translatorReducer, initialTanslatorState)

  const interchangeLanguages = () => {
    dispatch({ type: TranslatorActions.INTERCHANGE_LANGUAGES })
  }

  const setFromLanguage = (language: Language) => {
    dispatch({ type: TranslatorActions.SET_FROM_LANGUAGE, payload: language })
  }

  const setToLanguage = (language: Language) => {
    dispatch({ type: TranslatorActions.SET_TO_LANGUAGE, payload: language })
  }

  const setFromText = (text: string) => {
    dispatch({ type: TranslatorActions.SET_FROM_TEXT, payload: text })
  }

  const setResult = (text: string) => {
    dispatch({ type: TranslatorActions.SET_RESULT, payload: text })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    loading,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
