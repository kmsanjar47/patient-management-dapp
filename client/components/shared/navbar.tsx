"use client";
import { connectMetamask } from '@/web3/web3Actions';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useWeb3 } from '@/web3/web3Provider';

const Navbar = () => {
    const { currentAccount, setCurrentAccount } = useWeb3();
    useEffect(() => {
        console.log(currentAccount);
    }, [currentAccount]);

    async function handleConnectWallet() {
        await connectMetamask()!.then((account) => {
            setCurrentAccount(account);
        });

    }
    function disconnectWalletAndResetAccountState() {
        if (window.ethereum) {
            delete window.ethereum;
        }
        setCurrentAccount(null);
        window.location.reload();
    }
    return (
        <div className='bg-black text-white'>
            <div className='container mx-auto flex justify-between items-center py-4'>
                <div className='text-2xl font-bold'>Patient Management System</div>
                <div className='flex space-x-4 items-baseline'>
                    <Link href='/' className='hover:text-gray-400'>Home </Link>
                    <Link href='/register' className='hover:text-gray-400'>Register</Link>
                    <Link href='/certificate' className='hover:text-gray-400'>Certificate</Link>
                    {currentAccount ? <button className='bg-white text-black px-4 py-2 rounded' onClick={disconnectWalletAndResetAccountState}>Disconnect Wallet</button> : <button className='bg-white text-black px-4 py-2 rounded' onClick={handleConnectWallet}>Connect Wallet</button>}

                </div>
            </div>
        </div>
    );
}

export default Navbar;
