import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    axios.get(`https://short-url-omega-ashy.vercel.app/api/links/${code}`).then(res => setLink(res.data));
  }, [code]);

  if (!link) return <p>Loading...</p>;

  // return (
  //   <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
  //     <h2 className="text-xl font-bold mb-4">Stats for {code}</h2>
  //     <p><b>URL:</b> {link.target_url}</p>
  //     <p><b>Clicks:</b> {link.clicks}</p>
  //     <p><b>Last clicked:</b> {link.last_clicked || "not clicked yet"}</p>
  //   </div>
  // );

return (
  <div className="max-w-lg mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-6 mt-10">
    
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <span className="text-blue-600 text-3xl">📊</span>
        Stats for "{code}"
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Detailed analytics of your short link
      </p>
    </div>

    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-gray-50 border flex flex-col">
        <span className="text-sm text-gray-500">Target URL</span>
        <span className="font-medium text-gray-800 break-all">
          {link.target_url}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-gray-50 border">
          <span className="text-sm text-gray-500">Clicks</span>
          <div className="text-2xl font-semibold text-gray-900">{link.clicks}</div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 border">
          <span className="text-sm text-gray-500">Last Clicked</span>
          <div className="text-lg font-medium text-gray-800">
            {link.last_clicked || "Not clicked yet"}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
