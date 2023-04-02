import { type FC } from 'react'
import { HiOutlineHeart } from 'react-icons/hi'

interface Props {
  text?: string
}

const Favourite: FC<Props> = ({ text }) => {
  const handleClick = () => {
    if (!text) return
  }

  return (
    <button
      className={`${text ? 'text-gray-800 hover:text-gray-900 cursor-pointer' : 'text-gray-400 cursor-default'}`}
      onClick={handleClick}
    >
      <HiOutlineHeart />
    </button>
  )
}

export default Favourite
