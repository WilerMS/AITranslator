import { TranslatorActions } from '@actions/translator'
import { AUTO_LANGUAGE } from '@constants/suportedLanguages'
import { type TranslatorState, type TranslatorAction } from './../types.d'

export const initialTanslatorState: TranslatorState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

export const translatorReducer = (state: TranslatorState, action: TranslatorAction): TranslatorState => {
  const { type } = action

  if (type === TranslatorActions.INTERCHANGE_LANGUAGES) {
    // Prevent interchange auto state
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    if (state.result !== '') {
      return {
        ...state,
        fromText: state.result,
        result: state.fromText,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    }

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === TranslatorActions.SET_FROM_LANGUAGE) {
    if (state.fromLanguage === action.payload) return state

    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === TranslatorActions.SET_TO_LANGUAGE) {
    if (state.toLanguage === action.payload) return state

    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === TranslatorActions.SET_FROM_TEXT) {
    return {
      ...state,
      fromText: action.payload,
      loading: !!action.payload,
      result: ''
    }
  }

  if (type === TranslatorActions.SET_RESULT) {
    return {
      ...state,
      result: action.payload,
      loading: false
    }
  }

  return state
}
