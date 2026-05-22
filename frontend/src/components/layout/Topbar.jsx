import { GiHamburgerMenu } from "react-icons/gi";

export default function Topbar({ state, toggle }) {
  return(
    <div className={`
      fixed
      top-0
      flex
      justify-between 
      items-center 
      p-2 
      border-b
      w-screen 
      bg-background 
      border-accent
    text-accent
      md:hidden
      ${state ? 'z-10' : 'z-30'}
    `}>
      <div className="flex items-center gap-2 md:flex-col">
        <img src="/spc-logo.png" className="w-10"/>
        <img src="/bagong-pilipinas.png" className="w-10"/>

        <div 
          className="
            flex 
            flex-col 
            text-[10px]
            font-bold 
            tracking-wider 
            md:hidden
        ">
          <p>Citizen's Charter System</p>
          <span className="hidden md:block">-</span> 
          <p>Lungsod ng San Pablo</p>
        </div>
      </div>
  
      <i onClick={toggle} className="cursor-pointer">
        <GiHamburgerMenu size={24}/>
      </i>

      <div
        className="hidden p-2 text-2xl transition-all duration-500 md:block"
      >
      </div>
    </div>
  );
}