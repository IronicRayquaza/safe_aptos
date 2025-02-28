// import "./init";
import React, { useState } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import { PetraWallet } from "@aptos-labs/wallet-adapter-petra"; // Import Petra Wallet for Aptos
import { BCS, TxnBuilderTypes } from "aptos"; // Import Aptos SDK

export default function WalletConnectModal({ isOpen, onClose }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);

  // ✅ Connect MetaMask
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

  // ✅ Connect Coinbase Wallet
  const handleConnectCoinbase = async () => {
    try {
      const coinbaseWallet = new CoinbaseWalletSDK({ appName: "My App" });
      const provider = coinbaseWallet.makeWeb3Provider();
      const addresses = await provider.request({ method: "eth_requestAccounts" });

      if (addresses.length > 0) {
        setWalletAddress(addresses[0]);
        setProvider("Coinbase");
      } else {
        console.error("No accounts found in Coinbase Wallet.");
      }

      provider.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          handleDisconnect();
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

  // ✅ Connect WalletConnect
  const handleConnectWalletConnect = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: { 1: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY" },
      });

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
    try {
      if (!window.aptos) {
        alert("Petra Wallet is not installed. Install it from https://petra.app/");
        return;
      }

      // Connect to Petra
      const result = await window.aptos.connect();
      if (result) {
        const accountInfo = await window.aptos.account();
        setWalletAddress(accountInfo.address);
        setProvider("Petra");
      }

      // Listen for account changes
      window.aptos.on("accountChange", (newAccount) => {
        setWalletAddress(newAccount.address);
      });

      window.aptos.on("disconnect", () => {
        handleDisconnect();
      });
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
              <button
                onClick={handleConnectPetra}
                className="w-full flex gap-2 items-center justify-center border text-sm py-2 px-4 rounded-lg bg-stone-200 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 transition"
              >
                <img src="https://petra.app/favicon.ico" alt="Petra Wallet" className="h-6 w-6 rounded" />
                <p className="text-stone-700 dark:text-white font-semibold">Connect with Petra Wallet</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

