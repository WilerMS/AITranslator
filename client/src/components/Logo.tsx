const Logo = ({
  className = ''
}: {
  className?: string
}) => {
  return (
    <h1 className={`text-3xl text-center font-bold p-3 ${className}`}>
      <span className='text-cyan-600'>AI</span>
      <span className='text-gray-900'>translator</span>
    </h1>
  )
}

export default Logo
