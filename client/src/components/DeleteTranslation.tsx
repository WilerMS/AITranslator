import { type FC } from 'react'
import { CgTrashEmpty } from 'react-icons/cg'

interface Props {
  text?: string
}

const DeleteTranslation: FC<Props> = ({ text }) => {
  const handleClick = () => {
    if (!text) return
  }

  return (
    <button
      className={`${text ? 'text-gray-800 hover:text-gray-900 cursor-pointer' : 'text-gray-400 cursor-default'}`}
      onClick={handleClick}
    >
      <CgTrashEmpty />
    </button>
  )
}

export default DeleteTranslation
