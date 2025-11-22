import axios from "axios";
import { Link } from "react-router-dom";

export default function LinkTable({ links, loading, onDelete }) {
  async function remove(code) {
    await axios.delete(`https://short-url-omega-ashy.vercel.app/api/links/${code}`);
    onDelete();
  }

  if (loading) return <p>Loading...</p>;
  if (!links.length) return <p>No links found.</p>;

  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="p-2">Code</th>
          <th className="p-2">URL</th>
          <th className="p-2">Clicks</th>
          <th className="p-2">Last Clicked</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.map(l => (
          <tr key={l.code} className="border-b">
            <td className="p-2">{l.code}</td>
            <td className="p-2 truncate max-w-xs">{l.targetUrl}</td>
            <td className="p-2">{l.clicks}</td>
            <td className="p-2">{l.lastClicked || "-"}</td>
            <td className="p-2 flex gap-2">
              <Link className="text-blue-600 underline" to={`/code/${l.code}`}>
                Stats
              </Link>
              <button className="text-red-600" onClick={() => remove(l.code)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
