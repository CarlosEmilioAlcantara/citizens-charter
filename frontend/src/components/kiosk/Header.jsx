import { RiLogoutBoxRFill } from "react-icons/ri";

export default function Header({ toggle }) {
  return(
    <header className="
      flex 
      items-center 
      justify-start
      w-screen
      p-2
      bg-accent 
      text-background
    ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/spc-logo.png" 
            className="object-fill w-10 h-10 md:w-12 md:h-12"
          />
          <img 
            src="/bagong-pilipinas.png" 
            className="w-10 h-10 md:w-12 md:h-12"
          />

          <div className="
            flex flex-col text-sm md:text-lg
          ">
            <h1 className="font-bold">Karta ng Mamamayan</h1>
            <p>Lungsod ng San Pablo</p>
          </div>
        </div>

        <RiLogoutBoxRFill 
          onClick={toggle}
          className="
            text-2xl
            cursor-pointer 
            transition-all 
            duration-300 
            md:text-3xl
            hover:text-popup-header
        "/>
      </div>
    </header>
  );
}