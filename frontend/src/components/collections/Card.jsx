export default function Card({ label, number }) {
  return(
    <div className="
      flex 
      flex-col 
      gap-2 
      p-3
      bg-popup-header 
      border
      border-fg 
      rounded-sm
      text-center
    ">
      <span>{label}</span>
      <span className="text-accent font-bold">
        {number}
      </span>
    </div>
  );
}