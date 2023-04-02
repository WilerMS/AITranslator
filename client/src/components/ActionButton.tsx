import { type FC } from 'react'

interface Props {
  isActive?: boolean
  onClick: () => void
  children: JSX.Element | JSX.Element[]
}

const ActionButton: FC<Props> = ({ isActive, onClick, children }) => {
  const handleClick = () => {
    if (!isActive) return
    onClick()
  }

  return (
    <button
      className={`${isActive ? 'text-gray-800 hover:text-gray-900 cursor-pointer' : 'text-gray-400 cursor-default'}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
