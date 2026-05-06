import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { FaCheckCircle  } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import useTimeout from '../utils/useTimeout';

export default function Alert({ success, message, timeout = 3000, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setShow(true), 10);
    const exit = setTimeout(() => setShow(false), timeout);
    const remove = setTimeout(() => onClose?.(), timeout + 300);
    
    return () => {
      clearTimeout(enter);
      clearTimeout(exit);
      clearTimeout(remove);
    }
  }, [timeout, onClose]);

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
        ${success ? 'border-accent' : 'border-danger'}
        ${show ? 'opacity-100 right-8' : 'opacity-0 -right-15'}
        md:bottom-22
        z-50
    `}>
      <i>
          {success ? (
            <FaCheckCircle className="text-accent"/> ) 
          : (
            <FaCircleXmark className='text-danger'/>
          )}
      </i>
      <p className={`${success ? 'text-accent' : 'text-danger'}`}>
        {message}
      </p>
    </div>,
    document.getElementById('portal')
  );
}