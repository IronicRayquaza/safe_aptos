import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/report" element={<div>Anonymous Reporting Page</div>} />
        <Route path="/resources" element={<div>Help & Resources Page</div>} />
      </Routes>
    </Router>
  );
}
