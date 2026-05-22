export default function Button({ 
  label, 
  icon = null,
  onClick = null, 
  large = false,
  full = false,
  remove = false,
}) {
  return(
    <button
      onClick={onClick}
      className={`
        flex
        justify-center
        items-center
        gap-2
        ${full ? 'w-full' : 'w-auto'}
        ${large ? 'p-2' : 'px-2 py-1'}
        rounded-sm
        ${remove ? 'bg-danger' : 'bg-accent'}
        text-md
        text-background 
        cursor-pointer
        transition-all
        duration-300
        z-10
        ${large && 'md:text-lg'}
        ${remove ? 'hover:bg-cancel-hover' : 'hover:bg-confirm-hover'}
        ${remove ? 'focus:bg-cancel-hover' : 'focus:bg-confirm-hover'}
        ${remove ? 'active:bg-cancel-hover' : 'active:bg-confirm-hover'}
      `}
    >
      {icon && (<span>{icon}</span>)}
      <p>{label}</p>
    </button>
  );
}