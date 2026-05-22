import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Community from "./pages/Community";
import IssueDetail from "./pages/IssueDetail";
import Report from "./pages/Report";
import Track from "./pages/Track";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/community" element={<Community />} />
        <Route path="/issue/:id" element={<IssueDetail />} />
        <Route path="/report" element={<Report />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
