export default function Overlay({ show }) {
  return(
    <div
      style={{ transition: "all 1s ease, all 1s ease" }} 
      className={`
        ${show ? 'fixed': 'hidden'}
        inset-0
        w-screen 
        h-screen 
        bg-black/60
        transform 
        transition-transform
        ${show ? 'opacity-100' : 'opacity-0'}
    `}>
    </div>
  );
}