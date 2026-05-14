export default function EntriesCounter({ count }) {
  return (
    <p className="text-xs text-unfocused md:flex-1">
      Showing 10 out of {count} entries
    </p>
  );
}