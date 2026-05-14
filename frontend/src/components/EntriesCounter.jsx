export default function EntriesCounter({ total, count }) {
  return (
    <p className="text-xs text-unfocused md:flex-1">
      Showing {total} out of {count} entries
    </p>
  );
}