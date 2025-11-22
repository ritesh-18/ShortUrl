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

  // return (
  //   <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
  //     <h2 className="font-bold mb-2">Create Short Link</h2>
  //     <input
  //       value={targetUrl}
  //       onChange={e => setTargetUrl(e.target.value)}
  //       placeholder="Target URL"
  //       className="border p-2 w-full mb-2"
  //     />
  //     <input
  //       value={code}
  //       onChange={e => setCode(e.target.value)}
  //       placeholder="Custom code (optional)"
  //       className="border p-2 w-full mb-2"
  //     />
  //     {error && <p className="text-red-600">{error}</p>}
  //     <button disabled={loading}
  //       className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
  //       {loading ? "Creating..." : "Create"}
  //     </button>
  //   </form>
  // );
  return (
  <form
    onSubmit={submit}
    className="max-w-md mx-auto bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-200 transition-all"
  >
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <span className="text-blue-600">🔗</span>
      Create Short Link
    </h2>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Target URL</label>
      <input
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        placeholder="https://example.com"
        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Custom Code (optional)</label>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="my-short-code"
        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
    </div>

    {error && (
      <p className="text-red-600 text-sm mb-3 bg-red-50 p-2 rounded-lg border border-red-200">
        {error}
      </p>
    )}

    <button
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white font-medium px-4 py-3 rounded-lg disabled:opacity-50"
    >
      {loading ? "Creating..." : "Create Short Link"}
    </button>
  </form>
);

}
