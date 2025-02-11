

import React, { useState } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider"; // Correct import for WalletConnect
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

export default function WalletConnectModal({ isOpen, onClose }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);

  const handleConnectMetaMask = async () => {
    if (window.ethereum) {
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

  const handleConnectCoinbase = async () => {
    try {
      // Initialize Coinbase SDK
      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: "My App",
      });
  
      // Create a web3 provider
      const provider = coinbaseWallet.makeWeb3Provider();
  
      // Request account connection
      const addresses = await provider.request({ method: "eth_requestAccounts" });
  
      if (addresses.length > 0) {
        setWalletAddress(addresses[0]); // Store connected wallet address
        setProvider("Coinbase");
      } else {
        console.error("No accounts found in Coinbase Wallet.");
      }
  
      // Handle provider events
      provider.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          handleDisconnect(); // Disconnect if no accounts remain
        }
      });
  
      provider.on("disconnect", (error) => {
        console.error("Coinbase Wallet disconnected:", error);
        handleDisconnect();
      });
  
    } catch (error) {
      console.error("Coinbase connection failed:", error);
    }
  };
  
 
  
  
      
  

  const handleConnectWalletConnect = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: { 1: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY" }, // Infura RPC for WalletConnect
      });

      await walletConnectProvider.enable();
      const web3 = new Web3(walletConnectProvider);
      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
      setProvider("WalletConnect");

      // Disconnect event listener
      walletConnectProvider.on("disconnect", () => {
        handleDisconnect();
      });
    } catch (error) {
      console.error("WalletConnect connection failed:", error);
    }
  };

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
                <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="MetaMask" className="h-6 w-6" />
                <p className="text-stone-700 dark:text-white font-semibold">Connect with MetaMask</p>
              </button>
              <button
                onClick={handleConnectCoinbase}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="Coinbase" className="h-6 w-6 rounded" />
                <p className="text-stone-700 dark:text-white font-semibold">Connect with Coinbase</p>
              </button>
              <button
                onClick={handleConnectWalletConnect}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src="https://docs.material-tailwind.com/icons/trust-wallet.svg" alt="Trust Wallet" className="h-6 w-6 rounded" />
                <p className="text-stone-700 dark:text-white font-semibold">Connect with WalletConnect</p>
                
              </button>
            </div>
          )}
        </div>
        

    
        {/* <div className="p-4">
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
            <>
              <button
                onClick={handleConnectMetaMask}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="MetaMask" className="h-5 w-5" />
                <p className="text-stone-700 dark:text-white font-semibold">Connect with MetaMask</p>
              </button>
              <button
                onClick={handleConnectCoinbase}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="Coinbase" className="h-6 w-6 rounded" />
                <p className="text-stone-700 dark:text-white font-semibold">Connect with Coinbase</p>
              </button>
              <button
                onClick={handleConnectWalletConnect}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src="https://docs.material-tailwind.com/icons/trust-wallet.svg" alt="Trust Wallet" className="h-6 w-6 rounded" />
                <p className="text-stone-700 dark:text-white font-semibold">Connect with WalletConnect</p>
              </button>
            </>
          )}
        </div> */}

        {/* <div className="border-t border-stone-200 p-4 flex flex-col items-center">
          <small className="text-stone-800 dark:text-white text-sm">New to Ethereum wallets?</small>
          <button className="mt-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition">
            Learn More
          </button>
        </div>
        </div>
      </div> */}

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
