import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { FaXmark } from "react-icons/fa6";
import Overlay from './Overlay';

export default function PDFViewer({ url }) {
  return ReactDom.createPortal(
    <>
      <Overlay />
      <iframe
        src={url}
        width="800"
        height="600"
      />
    </>,
    document.getElementById('portal')
  )
}