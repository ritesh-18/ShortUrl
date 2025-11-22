import { useState } from "react";
import axios from "axios";

export default function AddLinkForm({ onAdded }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("https://short-url-omega-ashy.vercel.app/api/links", { targetUrl, code });
      setTargetUrl("");
      setCode("");
      onAdded();
    } catch (err) {
      setError(err.response?.data?.error || "Failed");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-bold mb-2">Create Short Link</h2>
      <input
        value={targetUrl}
        onChange={e => setTargetUrl(e.target.value)}
        placeholder="Target URL"
        className="border p-2 w-full mb-2"
      />
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Custom code (optional)"
        className="border p-2 w-full mb-2"
      />
      {error && <p className="text-red-600">{error}</p>}
      <button disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
