import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export default function LinkTable({ links, loading, onDelete }) {
  const [useSample, setUseSample] = useState(false);

  const sampleData = [
    {
      code: "abc123",
      targetUrl: "https://example.com",
      clicks: 42,
      lastClicked: "2024-11-10",
      created_at: "2024-11-01"
    },
    {
      code: "xyz789",
      targetUrl: "https://google.com",
      clicks: 15,
      lastClicked: "2024-11-12",
      created_at: "2024-11-02"
    }
  ];

  async function remove(code) {
    try {
      await axios.delete(
        `https://short-url-omega-ashy.vercel.app/api/links/${code}`
      );

      toast.success("Link deleted successfully!");
      onDelete(); 

    } catch (err) {
      toast.error("Failed to delete link");
    }
  }

  if (loading) return <p>Loading...</p>;

  const dataToShow = useSample ? sampleData : links;

  if (!dataToShow.length) return <p>No links found.</p>;

  return (
    <div className="mt-3 w-full">
      
      {/* SAMPLE DATA BUTTON */}
      <button
        onClick={() => setUseSample(!useSample)}
        className="mb-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black transition"
      >
        {useSample ? "Hide Sample Data" : "Show Sample Data"}
      </button>

      <div className="w-full overflow-x-auto border border-gray-200 rounded-xl shadow-lg bg-white">

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Code</th>
              <th className="p-4 text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[250px]">URL</th>
              <th className="p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Clicks</th>
              <th className="p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Last Clicked</th>
              <th className="p-4 text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[150px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dataToShow.map((l) => (
              <tr
                key={l.code}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{l.code}</td>

                <td className="p-4 max-w-xs truncate text-gray-700 whitespace-nowrap min-w-[250px]">
                  {l.target_url}
                </td>

                <td className="p-4 text-gray-700 whitespace-nowrap">{l.clicks}</td>

                <td className="p-4 text-gray-600 whitespace-nowrap">
                  {l.last_clicked || "Not clicked yet"}
                </td>

                <td className="p-4 flex items-center gap-3 whitespace-nowrap">
                  <Link
                    to={`/code/${l.code}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Stats
                  </Link>

                  {!useSample && (
                    <button
                      onClick={() => remove(l.code)}
                      className="text-red-600 hover:text-red-800 font-medium transition"
                    >
                      Delete
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
