import { useNavigate } from "react-router-dom";
// @import "tailwindcss";
import "../App.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-purple-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Safe Space</h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-purple-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 bg-purple-800 text-white">
        <h2 className="text-4xl font-bold">A Safe Space for Women Facing Domestic Violence</h2>
        <p className="mt-4 text-lg">Anonymous, secure, and blockchain-protected assistance.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/report")}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 mx-2"
          >
            Report Abuse
          </button>
          <button
            onClick={() => navigate("/resources")}
            className="bg-white text-purple-900 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 mx-2"
          >
            Get Help
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-purple-900">Why Choose Safe Space?</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">Anonymous & Secure</h4>
            <p className="mt-2 text-gray-600">Your identity remains protected with end-to-end encryption.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">Instant Help</h4>
            <p className="mt-2 text-gray-600">Connect with NGOs, lawyers, and counselors with one click.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">Transparent Support</h4>
            <p className="mt-2 text-gray-600">Donations are managed via blockchain for 100% transparency.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} Safe Space. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
