import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ userAddress }) {
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted:", complaint);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-purple-900 dark:bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Safe Space</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm">
              Connected: {userAddress ? `${userAddress.substring(0, 6)}...${userAddress.slice(-4)}` : "Not Connected"}
            </p>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-16 bg-purple-800 dark:bg-gray-700 text-white">
        <h2 className="text-3xl font-bold">Submit a Complaint Anonymously</h2>
        <p className="mt-3 text-lg">Your privacy is protected through blockchain security.</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Submit Your Complaint</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            If you're facing any issues, please describe your situation. Your identity will remain anonymous.
          </p>

          {submitted ? (
            <div className="text-green-600 dark:text-green-400 font-semibold">
              ✅ Your complaint has been submitted successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                rows="5"
                placeholder="Describe your issue here... (e.g. domestic violence, harassment)"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                required
              ></textarea>

              <button
                type="submit"
                className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Submit Complaint
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 dark:bg-gray-800 text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} Safe Space. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
