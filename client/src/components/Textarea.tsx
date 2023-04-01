import { type FC } from 'react'

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
    <textarea
      className=' w-full h-80 outline-none resize-none p-3'
      placeholder={getPlaceHolder(isFromText, loading)}
      onChange={(e) => { onChange?.(e.currentTarget.value) }}
      disabled={!isFromText}
      value={value}
    >
    </textarea>
  )
}
