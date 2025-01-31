


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import WalletConnectModal from "../components/WalletConnectModal"; // Import modal

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-purple-900 dark:bg-gray-800 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Safe Space</h1>
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-white dark:bg-gray-700 text-purple-900 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600"
//           >
//             Login
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="flex flex-col items-center justify-center text-center py-20 bg-purple-800 dark:bg-gray-700 text-white">
//         <h2 className="text-4xl font-bold">A Safe Space for Women Facing Domestic Violence</h2>
//         <p className="mt-4 text-lg">Anonymous, secure, and blockchain-protected assistance.</p>
//         <div className="mt-6">
//           {/* Open Wallet Modal on Click */}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 mx-2"
//           >
//             Report Abuse
//           </button>
//           <button
//             onClick={() => navigate("/resources")}
//             className="bg-white dark:bg-gray-700 text-purple-900 dark:text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 mx-2"
//           >
//             Get Help
//           </button>
//         </div>
//       </header>

//       {/* Wallet Connect Modal */}
//       <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WalletConnectModal from "../components/WalletConnectModal"; // Ensure this is correctly imported
import "../App.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-purple-900 dark:bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Safe Space</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-white dark:bg-gray-700 text-purple-900 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Login
            </button>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 bg-purple-800 dark:bg-gray-700 text-white">
        <h2 className="text-4xl font-bold">A Safe Space for Women Facing Domestic Violence</h2>
        <p className="mt-4 text-lg">Anonymous, secure, and blockchain-protected assistance.</p>
        <div className="mt-6">
          {/* Report Abuse Button - Opens Wallet Connect Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 mx-2"
          >
            Report Abuse
          </button>

          {/* Get Help Button */}
          <button
            onClick={() => navigate("/resources")}
            className="bg-white dark:bg-gray-700 text-purple-900 dark:text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 mx-2"
          >
            Get Help
          </button>
        </div>
      </header>

      {/* Wallet Connect Modal */}
      {isModalOpen && <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-purple-900 dark:text-white">Why Choose Safe Space?</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Anonymous & Secure</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Your identity remains protected with end-to-end encryption.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Instant Help</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Connect with NGOs, lawyers, and counselors with one click.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Transparent Support</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Donations are managed via blockchain for 100% transparency.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 dark:bg-gray-800 text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} Safe Space. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
