import ReactDom from 'react-dom';
import { FaXmark } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa";
import Overlay from '../reusables/Overlay';
import useShow from '../../hooks/useShow';

export default function PDFViewer({ url, onClose, full = false }) {
  const [show, handleClose] = useShow({initialValue: false, onClose: onClose});

  return ReactDom.createPortal(
    <>
      <div className={`
        fixed 
        top-0
        left-0
        flex
        justify-center
        items-center
        w-full
        h-full
        transition-opacity 
        duration-300 
        ${show ? 'opacity-100' : 'opacity-0'}
        z-50
      `}>
        <Overlay show={show} zIndex={40} toggle={handleClose} />
        <div className={`
          relative
          flex
          flex-col
          ${full && 'w-full h-full'}
          pt-8
          p-4
          rounded-lg
          bg-background
          overflow-hidden
          z-50
        `}>
          <div className="
            absolute 
            top-0 
            left-0
            flex
            items-center
            justify-between
            min-w-full
            p-1 
            px-3
            border-b-2
            border-b-unfocused
            bg-popup-header
            text-accent 
            text-md
            font-bold
          ">
            <div className="flex items-center gap-2">
              <FaPrint />
              <span>Karta ng Mamamayan</span>
            </div>

            <FaXmark 
              size={24} 
              onClick={handleClose} 
              className="
                border-2
                border-transparent 
                rounded-xl 
                cursor-pointer 
                transition-all
                duration-600
                hover:bg-active 
                hover:border-active
              "
            />
          </div>

          <iframe
            src={url}
            className={`
              mt-3 
              ${!full ?
                'md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[600px]' :
                'h-full'
              }
          `}/>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}