import { type FC } from 'react'
import { HiOutlineShare } from 'react-icons/hi'

interface Props {
  text?: string
}

const ShareTranslation: FC<Props> = ({ text }) => {
  const handleClick = () => {
    if (!text) return
  }

  return (
    <button
      className={`${text ? 'text-gray-800 hover:text-gray-900 cursor-pointer' : 'text-gray-400 cursor-default'}`}
      onClick={handleClick}
    >
      <HiOutlineShare />
    </button>
  )
}

export default ShareTranslation
