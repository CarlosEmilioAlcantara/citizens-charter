export default function Table({ headers, body, hideID = false }) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.entries(body).map(([key, data]) => (
          <tr key={key} className="text-md">
            {Object.entries(data).map(([key, value]) => (
              hideID && key == "id" ? (
                <td className="hidden" key={key}>{value}</td>
              ) : (
                <td key={key}>{value}</td>
              )
            ))}
          </tr>
          )
        )}
      </tbody>
    </table>
  );
}
