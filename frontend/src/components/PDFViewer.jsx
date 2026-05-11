import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { FaXmark } from "react-icons/fa6";
import Overlay from './Overlay';

export default function PDFViewer({ url }) {
  return ReactDom.createPortal(
    <>
      <Overlay show={true} zIndex={40}/>

      <div className="absolute top-[14%] left-[22%] z-50">
        <iframe
          src={url}
          width="800"
          height="600"
        />
      </div>
    </>,
    document.getElementById('portal')
  )
}