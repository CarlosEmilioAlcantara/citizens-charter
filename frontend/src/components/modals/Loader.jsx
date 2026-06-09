import ReactDom from 'react-dom'
import Overlay from '../reusables/Overlay';

export default function Loader({ show, message }) {
  return ReactDom.createPortal(
    <>
      <Overlay show={show} zIndex={60} />
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
        ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        z-70
      `}>
        <div className="
          relative
          flex
          flex-col
          justify-center
          items-center
          gap-5
          p-11
          rounded-lg
          bg-background
          shadow-lg
          overflow-hidden
        ">
          <div className="
            w-12 
            h-12 
            border-8 
            border-accent 
            rounded-full 
            border-t-transparent 
            animate-spin
          ">
          </div>
          <p className="text-md">{message}</p>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}