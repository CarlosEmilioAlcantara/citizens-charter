import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { FaXmark } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa";
import Overlay from './Overlay';
import useShow from '../utils/useShow';

export default function PDFViewer({ url, onClose }) {
  const [show, handleClose] = useShow({initialValue: false, onClose: onClose});

  return ReactDom.createPortal(
    <>
      <Overlay show={show} zIndex={40} />

      <div className={`
        fixed 
        top-0
        left-0
        flex
        justify-center
        items-center
        w-screen
        h-screen
        transition-opacity 
        duration-300 
        ${show ? 'opacity-100' : 'opacity-0'}
        z-50
      `}>
        <div className="
          relative
          flex
          flex-col
          pt-8
          p-4
          rounded-lg
          bg-background
          overflow-hidden
        ">
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

            <FaXmark size={20} onClick={handleClose} className="cursor-pointer"/>
          </div>

          <iframe
            src={url}
            className="
              mt-3 
              md:w-[600px] 
              md:h-[400px] 
              lg:w-[800px] 
              lg:h-[600px]
          "/>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}