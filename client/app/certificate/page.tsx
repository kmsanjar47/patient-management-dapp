"use client";
import React from "react";
import { checkIfFullyVaccinated } from "@/web3/web3Actions";
import { useEffect, useState } from "react";
import { useWeb3 } from "@/web3/web3Provider";

const Certificate = () => {
    const { currentAccount, isVaccinated } = useWeb3();

    return (
        <div>
            <div className="flex flex-col text-center justify-center align-middle mt-40">
                <h2 className="font-semibold text-3xl mb-2">Certificate of Vaccination</h2>
                <p>This is to certify that</p>
                <h3>The user with the address {currentAccount}</h3>
                {isVaccinated ? (
                    <>
                        <p className="mb-2">has received two doses of the COVID-19 vaccine.</p>
                        <p className="font-extrabold text-4xl text-green-700">Congratulations!</p>
                    </>
                ) : (
                    <p className="text-red-600">has not received the required number of doses for vaccination.</p>
                )}
            </div>
        </div>
    );
};

export default Certificate;
