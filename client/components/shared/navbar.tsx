"use client";
import { connectMetamask } from '@/web3/web3actions'
import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-black text-white'>
            <div className='container mx-auto flex justify-between items-center py-4'>
                <div className='text-2xl font-bold'>Patient Management System</div>
                <div className='flex space-x-4 items-baseline'>
                    <a href='#' className='hover:text-gray-400'>Home</a>
                    <a href='#' className='hover:text-gray-400'>About</a>
                    <a href='#' className='hover:text-gray-400'>Contact</a>
                    <button className='bg-white text-black px-4 py-2 rounded' onClick={() => connectMetamask()}>Connect Wallet</button>

                </div>
            </div>
        </div>
    )
}

export default Navbar