import { useEffect, useState } from "react";

export default function Welcome({ isOpen, toggle }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const enter = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(enter);
    } else {
      const leave = setTimeout(() => setShow(false));
      return () => clearTimeout(leave);
    }
  }, [isOpen]);

  return(
    <div
      onClick={toggle} 
      className={`
        fixed
        inset-0
        bg-accent
        text-background
        transition-opacity
        duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        z-50
    `}>
      <div className="
        flex 
        flex-col
        justify-center 
        items-center 
        gap-6
        w-screen 
        h-screen 
      ">
        <div className={`
          flex 
          flex-col 
          items-center 
          gap
          overflow-hidden
          transition-all
          duration-500
          ${show ? 'opacity-100 translatey-y-0' : 'opacity-0 -translate-y-10'}
        `}>
          <p className="font-bold text-2xl md:text-4xl">Karta ng Mamamayan</p>
          <p className="text-lg md:text-2xl">Lungsod ng San Pablo</p>
        </div>

        <img 
          src="/mayor-mascot.png" 
          className={`
            w-72 
            transition-all 
            duration-1000
            ${show ? 'opacity-100' : 'opacity-0'}
        `}/>

        <div className={`
          flex 
          flex-col 
          items-center 
          gap-4
          text-center
          overflow-hidden
          transition-all
          duration-500
          ${show ? 'opacity-100 translatey-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <div className="font-bold text-xl md:text-3xl">
            <p >
              Tuloy po kayo!
            </p>
            <p>
              Sa bagong San Pablo!
            </p>
          </div>
          <p className="text-xs animate-pulse md:text-md">Click Anywhere...</p>
        </div>
      </div>
    </div>
  );
}