


// import { useState } from "react";

// export default function WalletConnectModal({ isOpen, onClose }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-[9999]">
//       <div className="bg-white dark:bg-gray-900 rounded-lg w-9/12 sm:w-7/12 md:w-5/12 lg:w-3/12 scale-95 transition-transform duration-300 ease-out shadow-lg">
//         {/* Modal Header */}
//         <div className="border-b border-stone-200 p-4 flex justify-between items-start">
//           <div className="flex flex-col">
//             <h1 className="text-lg text-stone-800 dark:text-white font-semibold">
//               Connect a Wallet
//             </h1>
//             <p className="text-stone-500">Choose which wallet to connect</p>
//           </div>
//           <button onClick={onClose} className="text-stone-500 hover:text-stone-800 dark:hover:text-white">
//             &times;
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="p-4">
//           <p className="text-stone-800 dark:text-white mb-2 font-semibold">Popular</p>
//           <div className="space-y-2">
//             <button className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition">
//               <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="MetaMask" className="h-5 w-5" />
//               <p className="text-stone-700 dark:text-white font-semibold">Connect with MetaMask</p>
//             </button>
//             <button className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition">
//               <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="Coinbase" className="h-6 w-6 rounded" />
//               <p className="text-stone-700 dark:text-white font-semibold">Connect with Coinbase</p>
//             </button>
//           </div>
//           <p className="text-stone-800 dark:text-white mb-2 mt-6 font-semibold">Other</p>
//           <button className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition">
//             <img src="https://docs.material-tailwind.com/icons/trust-wallet.svg" alt="Trust Wallet" className="h-6 w-6 rounded" />
//             <p className="text-stone-700 dark:text-white font-semibold">Connect with Trust Wallet</p>
//           </button>
//         </div>

//         {/* Modal Footer */}
//         <div className="border-t border-stone-200 p-4 flex flex-col items-center">
//           <small className="text-stone-800 dark:text-white text-sm">New to Ethereum wallets?</small>
//           <button className="mt-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";

export default function WalletConnectModal({ isOpen, onClose }) {
  const [account, setAccount] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled()) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]); // Store the connected account
      onClose(); // Close modal after connecting
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-9/12 sm:w-7/12 md:w-5/12 lg:w-3/12 scale-95 transition-transform duration-300 ease-out shadow-lg">
        {/* Modal Header */}
        <div className="border-b border-stone-200 p-4 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-lg text-stone-800 dark:text-white font-semibold">
              {account ? "Wallet Connected" : "Connect a Wallet"}
            </h1>
            <p className="text-stone-500">
              {account ? `Connected: ${account.substring(0, 6)}...${account.slice(-4)}` : "Choose which wallet to connect"}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-800 dark:hover:text-white">
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          <p className="text-stone-800 dark:text-white mb-2 font-semibold">Popular</p>
          <div className="space-y-2">
            <button
              onClick={connectMetaMask}
              className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
            >
              <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="MetaMask" className="h-5 w-5" />
              <p className="text-stone-700 dark:text-white font-semibold">
                {account ? "Connected to MetaMask" : "Connect with MetaMask"}
              </p>
            </button>
            <button className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition">
              <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="Coinbase" className="h-6 w-6 rounded" />
              <p className="text-stone-700 dark:text-white font-semibold">Connect with Coinbase</p>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-stone-200 p-4 flex flex-col items-center">
          <small className="text-stone-800 dark:text-white text-sm">New to Ethereum wallets?</small>
          <button className="mt-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
