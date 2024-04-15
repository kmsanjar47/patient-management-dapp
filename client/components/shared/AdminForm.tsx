'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { updateDeadStatus, updateVaccineStatus } from '@/web3/web3Actions';
import toast, { Toaster } from 'react-hot-toast';

const AdminForm = () => {
	const [deathChanged, setDeathChanged] = useState(false);
	const [vaccineChanged, setVaccineChanged] = useState(false);

	async function handleAdminFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: Record<string, any> = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});
		console.log('Form Data From Admin:', data);
		try {
			if (vaccineChanged) await updateVaccineStatus(data.patientId, data.vaccineStatus);
			if (deathChanged) await updateDeadStatus(data.patientId, data.isDead === 'true' ? true : false);
			toast.success('Patient data updated successfully');
		} catch (error) {
			console.error('Error while updating vaccine status or dead status:', error);
			toast.error('Error while updating vaccine status or dead status:');
		}
	}

	useEffect(() => {
		console.log('Admin Form Loaded');
	}, []);

	return (
		<form onSubmit={handleAdminFormSubmit}>
			<div className="flex flex-row gap-3 p-2 justify-center items-center">
				<div className="mb-5 flex flex-col">
					<label htmlFor="patientId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
						PatientID
					</label>
					<input
						type="text"
						id="patientId"
						name="patientId"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
						placeholder="Enter patientId"
						required
					/>
				</div>
				<div className="mb-5 flex flex-col">
					<label htmlFor="isDead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
						Is Dead
					</label>
					<select
						defaultValue="false"
						id="isDead"
						name="isDead"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
						required
						onChange={() => setDeathChanged(true)}>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
				</div>
				<div className="mb-5 flex flex-col">
					<label htmlFor="vaccineStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
						Change Vaccine Status
					</label>
					<select
						defaultValue={0}
						id="vaccineStatus"
						name="vaccineStatus"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
						required
						onChange={() => setVaccineChanged(true)}>
						<option value={0}>Not Vaccinated</option>
						<option value={1}>One Dose</option>
						<option value={2}>Two Dose</option>
					</select>
				</div>

				<button
					type="submit"
					className="ml-6 text-white bg-gray-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-blue-800">
					Submit
				</button>
			</div>
			<Toaster />
		</form>
	);
};
export default AdminForm;
