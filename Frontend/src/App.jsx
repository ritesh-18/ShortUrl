import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/code/:code" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
