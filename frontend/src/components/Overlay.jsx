export default function Overlay({ show }) {
  return(
    <div
      style={{ transition: "opacity 0.5s ease, opacity 0.5s ease" }} 
      className={`
        fixed
        inset-0
        ${show ? 'w-screen' : 'w-0'}
        ${show ? 'h-screen' : 'h-0'}
        bg-black/60
        transform 
        transition-transform
        ${show ? 'opacity-100' : 'opacity-0'}
    `}>
    </div>
  );
}