

// "use client"; // Needed for Next.js

// import React, { useState, useEffect } from "react";
// import Web3 from "web3";

// export default function WalletConnectModal({ isOpen, onClose }) {
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [walletConnectProvider, setWalletConnectProvider] = useState(null);
//   const [coinbaseWalletSDK, setCoinbaseWalletSDK] = useState(null);

//   // ✅ Use `import()` instead of `require()`
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       import("@walletconnect/web3-provider").then((module) =>
//         setWalletConnectProvider(new module.default({ rpc: { 1: process.env.NEXT_PUBLIC_INFURA_KEY || "https://mainnet.infura.io/v3/YOUR_INFURA_KEY" } }))
//       );
//       import("@coinbase/wallet-sdk").then((module) =>
//         setCoinbaseWalletSDK(new module.default({ appName: "My App" }))
//       );
//     }
//   }, []);

//   // ✅ Connect MetaMask
//   const handleConnectMetaMask = async () => {
//     if (typeof window !== "undefined" && window.ethereum) {
//       const web3 = new Web3(window.ethereum);
//       try {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const accounts = await web3.eth.getAccounts();
//         setWalletAddress(accounts[0]);
//         setProvider("MetaMask");
//       } catch (error) {
//         console.error("MetaMask connection failed:", error);
//       }
//     } else {
//       alert("MetaMask is not installed.");
//     }
//   };

//   // ✅ Connect Coinbase Wallet
//   const handleConnectCoinbase = async () => {
//     if (!coinbaseWalletSDK) return;
//     try {
//       const provider = coinbaseWalletSDK.makeWeb3Provider();
//       const addresses = await provider.request({ method: "eth_requestAccounts" });

//       if (addresses.length > 0) {
//         setWalletAddress(addresses[0]);
//         setProvider("Coinbase");
//       } else {
//         console.error("No accounts found in Coinbase Wallet.");
//       }

//       provider.on("accountsChanged", (accounts) => {
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//         } else {
//           handleDisconnect();
//         }
//       });

//       provider.on("disconnect", () => {
//         handleDisconnect();
//       });
//     } catch (error) {
//       console.error("Coinbase connection failed:", error);
//     }
//   };

//   // ✅ Connect WalletConnect
//   const handleConnectWalletConnect = async () => {
//     if (!walletConnectProvider) return;
//     try {
//       await walletConnectProvider.enable();
//       const web3 = new Web3(walletConnectProvider);
//       const accounts = await web3.eth.getAccounts();
//       setWalletAddress(accounts[0]);
//       setProvider("WalletConnect");

//       walletConnectProvider.on("disconnect", () => {
//         handleDisconnect();
//       });
//     } catch (error) {
//       console.error("WalletConnect connection failed:", error);
//     }
//   };

//   // ✅ Connect Petra Wallet (Aptos)
//   const handleConnectPetra = async () => {
//     if (typeof window === "undefined" || !window.aptos) {
//       alert("Petra Wallet is not installed. Install it from https://petra.app/");
//       return;
//     }

//     try {
//       const result = await window.aptos.connect();
//       if (result) {
//         const accountInfo = await window.aptos.account();
//         setWalletAddress(accountInfo.address);
//         setProvider("Petra");
//       }

//       window.aptos.on("accountChange", (newAccount) => {
//         setWalletAddress(newAccount.address);
//       });

//       window.aptos.on("disconnect", () => {
//         handleDisconnect();
//       });
//     } catch (error) {
//       console.error("Petra Wallet connection failed:", error);
//     }
//   };

//   // ✅ Disconnect from Wallet
//   const handleDisconnect = () => {
//     setWalletAddress(null);
//     setProvider(null);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-[9999]">
//       <div className="bg-white dark:bg-gray-900 rounded-lg w-9/12 sm:w-7/12 md:w-5/12 lg:w-3/12 scale-95 transition-transform duration-300 ease-out shadow-lg">
        
//         {/* Modal Header */}
//         <div className="border-b border-stone-200 p-4 flex justify-between items-start">
//           <div className="flex flex-col">
//             <h1 className="text-lg text-stone-800 dark:text-white font-semibold">Connect a Wallet</h1>
//             <p className="text-stone-500">Choose which wallet to connect</p>
//           </div>
//           <button onClick={onClose} className="text-stone-500 hover:text-stone-800 dark:hover:text-white">
//             &times;
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="p-4">
//           {walletAddress ? (
//             <div className="text-center">
//               <p className="text-stone-800 dark:text-white mb-2 font-semibold">Connected Wallet:</p>
//               <p className="text-stone-700 dark:text-white text-sm font-medium truncate">{walletAddress}</p>
//               <button
//                 onClick={handleDisconnect}
//                 className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
//               >
//                 Disconnect
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <button
//                 onClick={handleConnectMetaMask}
//                 className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
//               >
//                 Connect with MetaMask
//               </button>
//               <button
//                 onClick={handleConnectCoinbase}
//                 className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
//               >
//                 Connect with Coinbase
//               </button>
//               <button
//                 onClick={handleConnectWalletConnect}
//                 className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
//               >
//                 Connect with WalletConnect
//               </button>
//               <button
//                 onClick={handleConnectPetra}
//                 className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
//               >
//                 Connect with Petra Wallet
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import Web3 from "web3";

export default function WalletConnectModal({ isOpen, onClose }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [walletConnectProvider, setWalletConnectProvider] = useState(null);
  const [coinbaseWalletSDK, setCoinbaseWalletSDK] = useState(null);

  // ✅ Dynamic Import for Vercel
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@walletconnect/web3-provider").then((module) =>
        setWalletConnectProvider(new module.default({ rpc: { 1: process.env.NEXT_PUBLIC_INFURA_KEY || "https://mainnet.infura.io/v3/YOUR_INFURA_KEY" } }))
      );
      import("@coinbase/wallet-sdk").then((module) =>
        setCoinbaseWalletSDK(new module.default({ appName: "My App" }))
      );
    }
  }, []);

  // ✅ Wallet Icons
  const walletIcons = {
    metamask: "https://upload.wikimedia.org/wikipedia/en/3/36/MetaMask_Fox.svg",
    coinbase: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Coinbase.svg/120px-Coinbase.svg.png",
    walletconnect: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/WalletConnect-Logo.png/120px-WalletConnect-Logo.png",
    petra: "https://petra.app/favicon.ico",
  };

  // ✅ Connect MetaMask
  const handleConnectMetaMask = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        setProvider("MetaMask");
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  // ✅ Connect Coinbase Wallet
  const handleConnectCoinbase = async () => {
    if (!coinbaseWalletSDK) return;
    try {
      const provider = coinbaseWalletSDK.makeWeb3Provider();
      const addresses = await provider.request({ method: "eth_requestAccounts" });

      if (addresses.length > 0) {
        setWalletAddress(addresses[0]);
        setProvider("Coinbase");
      }

      provider.on("disconnect", () => {
        handleDisconnect();
      });
    } catch (error) {
      console.error("Coinbase connection failed:", error);
    }
  };

  // ✅ Connect WalletConnect
  const handleConnectWalletConnect = async () => {
    if (!walletConnectProvider) return;
    try {
      await walletConnectProvider.enable();
      const web3 = new Web3(walletConnectProvider);
      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
      setProvider("WalletConnect");

      walletConnectProvider.on("disconnect", () => {
        handleDisconnect();
      });
    } catch (error) {
      console.error("WalletConnect connection failed:", error);
    }
  };

  // ✅ Connect Petra Wallet (Aptos)
  const handleConnectPetra = async () => {
    if (typeof window === "undefined" || !window.aptos) {
      alert("Petra Wallet is not installed. Install it from https://petra.app/");
      return;
    }

    try {
      const result = await window.aptos.connect();
      if (result) {
        const accountInfo = await window.aptos.account();
        setWalletAddress(accountInfo.address);
        setProvider("Petra");
      }
    } catch (error) {
      console.error("Petra Wallet connection failed:", error);
    }
  };

  // ✅ Disconnect from Wallet
  const handleDisconnect = () => {
    setWalletAddress(null);
    setProvider(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-9/12 sm:w-7/12 md:w-5/12 lg:w-3/12 scale-95 transition-transform duration-300 ease-out shadow-lg">
        
        {/* Modal Header */}
        <div className="border-b border-stone-200 p-4 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-lg text-stone-800 dark:text-white font-semibold">Connect a Wallet</h1>
            <p className="text-stone-500">Choose which wallet to connect</p>
          </div>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-800 dark:hover:text-white">
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {walletAddress ? (
            <div className="text-center">
              <p className="text-stone-800 dark:text-white mb-2 font-semibold">Connected Wallet:</p>
              <p className="text-stone-700 dark:text-white text-sm font-medium truncate">{walletAddress}</p>
              <button
                onClick={handleDisconnect}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={handleConnectMetaMask}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src={walletIcons.metamask} alt="MetaMask" className="h-6 w-6" />
                Connect with MetaMask
              </button>
              <button
                onClick={handleConnectCoinbase}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src={walletIcons.coinbase} alt="Coinbase" className="h-6 w-6" />
                Connect with Coinbase
              </button>
              <button
                onClick={handleConnectWalletConnect}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src={walletIcons.walletconnect} alt="WalletConnect" className="h-6 w-6" />
                Connect with WalletConnect
              </button>
              <button
                onClick={handleConnectPetra}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src={walletIcons.petra} alt="Petra" className="h-6 w-6" />
                Connect with Petra Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
