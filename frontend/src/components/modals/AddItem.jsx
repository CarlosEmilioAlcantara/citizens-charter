import ReactDom from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import Overlay from '../reusables/Overlay';
import useShow from '../../hooks/useShow';
import Input from '../inputs/Input';

export default function AddItem({ onClose, label, values, setValues }) {
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
              <FaPlus />
              <span>{label}</span>
            </div>

            <FaXmark size={20} onClick={handleClose} className="cursor-pointer"/>
          </div>

          <div className="w-[600px]">
            {Object.entries(values).map(([key, value]) => (
              <Input 
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type={"text"}
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)}...`}
                name={key}
                value={value}
                setValue={setValues} 
                small={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}