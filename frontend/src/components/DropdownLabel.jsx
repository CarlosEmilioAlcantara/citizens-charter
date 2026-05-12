export default function DropdownLabel({ icon, label }) {
  return (
    <span className="
      flex 
      items-center 
      justify-center 
      gap-2
      whitespace-nowrap
    ">
      <span className="text-accent">{icon}</span>
      <p>{label}</p>
    </span>
  );
}