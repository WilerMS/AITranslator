import { type FC } from 'react'
import { BiMicrophone } from 'react-icons/bi'
import '../styles/dictaphone.css'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const isSupportedSpeedRecognition = !!window.webkitSpeechRecognition

const Dictaphone: FC<Props> = (props) => {
  return (
    <button
      className='dictaphone selection:bg-transparent bg-cyan-600 text-white select-none rounded-full z-50 shadow-xl p-5 text-4xl transition hover:scale-105 hover:shadow-2xl active:scale-95 disabled:bg-gray-300 disabled:hover:scale-100 disabled:hover:shadow-xl'
      {...props}
      title={isSupportedSpeedRecognition ? '' : 'Speech recognition is not supported by this browser'}
      disabled={!isSupportedSpeedRecognition}
    >
      <div className="svg-box z-20 relative">
        <BiMicrophone />
      </div>
      {isSupportedSpeedRecognition &&
        <>
          <div className="circle delay1"></div>
          <div className="circle delay2"></div>
          <div className="circle delay3"></div>
          <div className="circle delay4"></div>
        </>
      }
    </button>
  )
}
export default Dictaphone
