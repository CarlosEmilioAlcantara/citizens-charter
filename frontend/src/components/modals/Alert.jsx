import ReactDom from 'react-dom';
import { FaCheckCircle  } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import useTimeout from '../../hooks/useTimeout';

export default function Alert({ success, timeout, message, onClose }) {
  const show = useTimeout({
    onClose: onClose, 
    timeout: timeout !== null ? timeout : 3000
  });

  return ReactDom.createPortal(
    <div
      className={`
        fixed 
        bottom-14
        flex
        items-center
        gap-2
        p-2
        bg-background
        border 
        border-accent
        rounded-sm
        transition-all
        duration-300
        ${success !== null ? 
          (success ? 'border-accent' : 'border-danger') :
          'border-foreground'
        }
        ${show ? 'opacity-100 right-8' : 'opacity-0 -right-15'}
        md:bottom-22
        z-50
    `}>
      {success !== null && (
        <i>
            {success ? (
              <FaCheckCircle className="text-accent"/> ) 
            : (
              <FaCircleXmark className='text-danger'/>
            )}
        </i>
      )}
      <p>{message}</p>
    </div>,
    document.getElementById('portal')
  );
}