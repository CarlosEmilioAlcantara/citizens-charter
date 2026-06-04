import ReactDom from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import Overlay from '../reusables/Overlay';
import Input from '../inputs/Input';
import Button from '../buttons/Button';
import useShow from '../../hooks/useShow';

export default function Confirmation({ 
  onClose, 
  label, 
  func,
  remove,
}) {
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
          pt-8
          p-4
          rounded-lg
          bg-background
          overflow-hidden
          z-50
        `}>
          <div className={`
            absolute 
            top-0 
            left-0
            flex
            items-center
            justify-between
            min-w-full
            p-1 
            px-3
            ${remove ? 
              'bg-danger text-background border-b-2 border-b-cancel-hover' : 
              'bg-popup-header text-accent border-b-2 border-b-unfocused'
            }
            text-md
            font-bold
          `}>
            <div className="flex items-center gap-2">
              {remove ? <FaTrashAlt /> : <FaPen />}
              <span>{label}</span>
            </div>

            <FaXmark 
              size={24} 
              onClick={handleClose} 
              className={`
                border-2
                border-transparent 
                rounded-xl 
                cursor-pointer 
                transition-all
                duration-600
                ${remove ? 
                  'hover:bg-cancel-hover hover:border-cancel-hover' :
                  'hover:bg-active hover:border-active'
                }
              `}
            />
          </div>

          <div className="
            w-[350px] 
            mt-3 
            flex 
            flex-col 
            gap-5
            justify-center 
            items-center
          ">
            <p>
              Sigurado ka ba sa nais mong {remove ? 'tanggalin?' : 'baguhin?'}
            </p>

            <div className="flex gap-3 justify-center items-center">
              <Button 
                label={"Hindi"} 
                remove={true}
                onClick={handleClose}
              /> 

              <Button 
                label={"Sigurado"}
                onClick={async () => {await func(); handleClose();}}
              /> 
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}