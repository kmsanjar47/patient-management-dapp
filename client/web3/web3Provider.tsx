"use client";
import React, { createContext, useContext, useState } from "react";

const Web3Context = createContext(undefined); // Create context

export const useWeb3 = () => useContext(Web3Context); // Custom hook to consume context

export const Web3Provider = ({ children }) => { // Context provider component
    const [currentAccount, setCurrentAccount] = useState(null);

    return (
        <Web3Context.Provider value={{ currentAccount, setCurrentAccount }}> 
            {children}
        </Web3Context.Provider>
    );
};