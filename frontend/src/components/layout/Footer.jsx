export default function Footer() {
  return (
    <div 
      className="
        fixed
        bottom-0 
        flex 
        justify-between 
        items-center
        w-full
        p-1
        px-2
        bg-confirm-hover
        md:p-2
        md:px-12
      ">
      <img className="w-8 md:w-12" src="/spc-logo.png"/>

      <div 
        className="
          flex 
          flex-col 
          text-xs 
          items-center 
          font-bold 
          text-background
          tracking-wider 
          md:flex-row
          md:text-lg
          md:gap-1
          lg:text-xl
        ">
        <p>Citizen's Charter System</p>
        <span className="hidden md:block">-</span> 
        <p>Lungsod ng San Pablo</p>
      </div>

      <img className="w-8 md:w-12" src="/bagong-pilipinas.png"/>
    </div>
  );
}