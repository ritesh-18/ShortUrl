import { useEffect, useState } from "react";
import axios from "axios";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await axios.get("http://localhost:3001/api/links");
    setLinks(res.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <AddLinkForm onAdded={load} />
      <LinkTable links={links} loading={loading} onDelete={load} />
    </div>
  );
}
