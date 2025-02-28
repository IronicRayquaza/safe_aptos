// import "../src/components/init";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/resources" element={<div>Help & Resources Page</div>} />
      </Routes>
    </Router>
  );
}
