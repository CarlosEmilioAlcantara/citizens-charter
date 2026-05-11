// TODO; Animate when exiting
export default function Overlay({ show, zIndex = 0 }) {
  return(
    <div
      style={{ zIndex }}
      className={`
        fixed
        inset-0
        ${show ? 'w-screen' : 'w-0'}
        ${show ? 'h-screen' : 'h-0'}
        bg-black/60
        transition-opacity
        duration-300
        ${show ? 'opacity-100' : 'opacity-0'}
    `}>
    </div>
  );
}