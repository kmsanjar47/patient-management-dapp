'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

// Define the type for context value
interface Web3ContextType {
	currentAccount: string | null;
	setCurrentAccount: React.Dispatch<React.SetStateAction<string | null>>;
	isAdmin: boolean;
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
	isVaccinated: boolean;
	setIsVaccinated: React.Dispatch<React.SetStateAction<boolean>>;
	data: Object;
	setData: React.Dispatch<React.SetStateAction<Object>>;
}

// Create context with defined type
const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Custom hook to consume context
export const useWeb3 = () => {
	const context = useContext(Web3Context);
	if (!context) {
		throw new Error('useWeb3 must be used within a Web3Provider');
	}
	return context;
};

// Define props type for Web3Provider component
interface Web3ProviderProps {
	children: ReactNode;
}

// Context provider component
export const Web3Provider = ({ children }: Web3ProviderProps) => {
	const [currentAccount, setCurrentAccount] = useState<string | null>(null);
	const [contract, setContract] = useState<any>(null);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [isVaccinated, setIsVaccinated] = useState<boolean>(false);
	const [data, setData] = useState<Object>({});

	const value: Web3ContextType = {
		currentAccount,
		setCurrentAccount,
		isAdmin,
		setIsAdmin,
		isVaccinated,
		setIsVaccinated,
		data,
		setData,
	};

	return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
