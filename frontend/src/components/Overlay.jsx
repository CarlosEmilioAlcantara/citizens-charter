export default function Overlay({ show, toggle, zIndex = 0 }) {
  return(
    <div
      onClick={toggle}
      style={{ zIndex }}
      className={`
        fixed
        inset-0
        bg-black/60
        transition-opacity
        duration-300 
        ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
    </div>
  );
}