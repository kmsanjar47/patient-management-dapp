'use client';
import React, { FormEvent, useState } from 'react';
import PatientManagement from '../../../build/contracts/PatientManagement.json';
import { storePatientData, storeAdminData, checkIfAlreadyPatient } from '@/web3/web3Actions';
import { useWeb3 } from '@/web3/web3Provider';
import toast, { Toaster } from 'react-hot-toast';

const Form = () => {
	const { currentAccount } = useWeb3();

	const [activeTab, setActiveTab] = useState('patient'); // Default active tab is 'patient'

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	const handleFormSubmitForPatient = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: Record<string, any> = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});
		console.log('Form Data:', data);
		// Check if the patient is already registered
		const isPatient = await checkIfAlreadyPatient(currentAccount);
		if (isPatient) {
			console.log('Patient is already registered');
			toast.error('Patient is already registered');
			return;
		}
		await storePatientData(data.age, data.gender, data.district, data.symptomsDetails, data.vaccineStatus, data.isDead === 'true' ? true : false);
		toast.success('Patient registered successfully');
	};
	const handleFormSubmitForAdmin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: Record<string, any> = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});
		console.log('Form Data From Admin:', data);
		await storeAdminData(data.refAdminAddress, data.age, data.gender, data.district);
		toast.success('Admin registered successfully');
	};

	return (
		<div>
			{!currentAccount ? (
				<div className="mx-auto p-3 text-center shadow-md"> Please connect your wallet to register</div>
			) : (
				<>
					<ul className="flex flex-row justify-center text-sm font-medium text-center mt-10 text-gray-500 dark:text-gray-400">
						<li className="me-2">
							<button
								className={`inline-block px-4 py-3 rounded-lg ${
									activeTab === 'patient'
										? 'text-white bg-gray-600'
										: 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
								}`}
								onClick={() => handleTabChange('patient')}>
								Patient Registration
							</button>
						</li>
						<li className="me-2">
							<button
								className={`inline-block px-4 py-3 rounded-lg ${
									activeTab === 'admin'
										? 'text-white bg-gray-600'
										: 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
								}`}
								onClick={() => handleTabChange('admin')}>
								Admin Registration
							</button>
						</li>
					</ul>
					<form className="max-w-sm mx-auto mt-12" onSubmit={activeTab === 'admin' ? handleFormSubmitForAdmin : handleFormSubmitForPatient}>
						{activeTab === 'patient' && (
							<>
								{/* <div className="mb-5">
                            <label htmlFor="patientId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Patient ID</label>
                            <input type="number" id="patientId" name="patientId" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter patient ID" required />
                        </div> */}
								{/* Add more patient registration fields here */}
								<div className="mb-5">
									<label htmlFor="symptomsDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
										Symptoms Details
									</label>
									<textarea
										id="symptomsDetails"
										name="symptomsDetails"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
										placeholder="Enter symptoms details"
										required></textarea>
								</div>
								<div className="mb-5">
									<label htmlFor="isDead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
										Is Dead
									</label>
									<select
										defaultValue="false"
										id="isDead"
										name="isDead"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
										required>
										<option value="true">Yes</option>
										<option value="false">No</option>
									</select>
								</div>
								<div className="mb-5">
									<label htmlFor="vaccineStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
										Vaccine Status
									</label>
									<select
										defaultValue={0}
										id="vaccineStatus"
										name="vaccineStatus"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
										required>
										<option value={0}>Not Vaccinated</option>
										<option value={1}>One Dose</option>
										<option value={2}>Two Dose</option>
									</select>
								</div>
							</>
						)}
						{activeTab === 'admin' && (
							<>
								<div className="mb-5">
									<label htmlFor="refAdminAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
										Referer Admin Address
									</label>
									<input
										type="text"
										id="refAdminAddress"
										name="refAdminAddress"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
										placeholder="Enter admin address"
										required
									/>
								</div>
								{/* Add more admin registration fields here */}
							</>
						)}
						{/* Common fields for both patient and admin */}
						<div className="mb-5">
							<label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
								District
							</label>
							<input
								type="text"
								id="district"
								name="district"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
								placeholder="Enter district"
								required
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
								Age
							</label>
							<input
								type="text"
								id="age"
								name="age"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
								placeholder="Enter age"
								required
							/>
						</div>

						<div className="mb-5">
							<label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
								Gender
							</label>
							<select
								id="gender"
								name="gender"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
								required>
								<option value={1}>Male</option>
								<option value={2}>Female</option>
							</select>
						</div>

						<button
							type="submit"
							className="mb-12 text-white bg-gray-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-blue-800">
							Register
						</button>
					</form>
				</>
			)}
			<Toaster />
		</div>
	);
};

export default Form;
