export default function DropdownItem({ icon, label, remove = false }) {
  return (
    <span className="
      flex 
      items-center 
      justify-center 
      gap-2
      whitespace-nowrap
    ">
      <span className={`${remove ? 'text-danger' : 'text-accent'}`}>
        {icon}
      </span>
      <p>{label}</p>
    </span>
  );
}