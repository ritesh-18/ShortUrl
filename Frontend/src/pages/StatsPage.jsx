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

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Stats for {code}</h2>
      <p><b>URL:</b> {link.target_url}</p>
      <p><b>Clicks:</b> {link.clicks}</p>
      <p><b>Last clicked:</b> {link.last_clicked || "not clicked yet"}</p>
    </div>
  );
}
