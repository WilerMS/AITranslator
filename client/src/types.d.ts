import { type TranslatorActions } from '@actions/translator'
import { type SUPORTED_LANGUAGES, type AUTO_LANGUAGE } from '@constants/suportedLanguages'

export type AutoLanguage = typeof AUTO_LANGUAGE
export type Language = keyof typeof SUPORTED_LANGUAGES | typeof AUTO_LANGUAGE

export interface TranslatorState {
  fromLanguage: Language
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type TranslatorAction =
  | { type: TranslatorActions.INTERCHANGE_LANGUAGES }
  | { type: TranslatorActions.SET_FROM_LANGUAGE, payload: Language }
  | { type: TranslatorActions.SET_TO_LANGUAGE, payload: Language }
  | { type: TranslatorActions.SET_FROM_TEXT, payload: string }
  | { type: TranslatorActions.SET_RESULT, payload: string }
