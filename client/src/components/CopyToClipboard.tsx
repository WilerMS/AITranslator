import { type FC } from 'react'
import { FiCopy } from 'react-icons/fi'

interface Props {
  text?: string
}

const CopyToClipboard: FC<Props> = ({ text }) => {
  const handleClick = () => {
    if (!text) return
    navigator.clipboard.writeText(text).catch(() => {})
  }

  return (
    <button
      className={`${text
        ? 'text-gray-800 hover:text-gray-900 cursor-pointer'
        : 'text-gray-400 cursor-default'}`}
      onClick={handleClick}
    >
      <FiCopy />
    </button>
  )
}

export default CopyToClipboard
