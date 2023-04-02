import { type FC } from 'react'
import { type Language } from 'types'
import CopyToClipboard from './CopyToClipboard'
import TextToSpeech from './TextToSpeech'

interface Props {
  isFromText?: boolean
  loading?: boolean
  onChange?: (value: string) => void
  value: string
}

const getPlaceHolder = (isFromTex: boolean, loading: boolean = false) => {
  if (isFromTex) return 'Write something...'
  if (loading) return 'Loading...'
  return 'Translation'
}

export const Textarea: FC<Props> = ({ isFromText = true, loading, onChange, value }) => {
  return (
    <div className='w-full h-56 flex flex-col overflow-hidden'>
      <textarea
        className='w-full h-full outline-none resize-none p-3 disabled:bg-white'
        placeholder={getPlaceHolder(isFromText, loading)}
        onChange={(e) => { onChange?.(e.currentTarget.value) }}
        disabled={!isFromText}
        value={value}
      >
      </textarea>
    </div>
  )
}
