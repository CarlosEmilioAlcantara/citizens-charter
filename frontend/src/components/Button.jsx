export default function Button({ 
  label, 
  onClick = null, 
  large = false,
  icon = null,
}) {
  return(
    <button
      onClick={onClick}
      className={`
        flex
        justify-center
        items-center
        gap-2
        w-auto
        ${large ? 'p-2' : 'px-2 py-1'}
        rounded-sm
        bg-accent 
        text-md
        text-background 
        cursor-pointer
        transition-all
        duration-300
        ${large && 'md:text-lg'}
        hover:bg-confirm-hover
        focus:bg-confirm-hover
        active:bg-confirm-hover
      `}
    >
      <span>{icon}</span>
      <p>{label}</p>
    </button>
  );
}