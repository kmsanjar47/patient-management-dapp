'use client';
import Table from '@/components/ui/Table';
import PatientTable from '@/components/shared/PatientTable';
import { useWeb3 } from '@/web3/web3Provider';
import { getPatientDataList, checkIfFullyVaccinated } from '@/web3/web3Actions';
import { useState, useEffect } from 'react';
import AdminForm from '@/components/shared/AdminForm';
import { Toaster } from 'react-hot-toast';

const Page = () => {
	// const [data, setData] = useState([]);
	const { currentAccount, isAdmin, isVaccinated, setIsVaccinated, data, setData } = useWeb3();

	useEffect(() => {
		if (!currentAccount) {
			return;
		}

		getPatientDataList().then((result: any) => {
			console.log(result);
			setData(result);
			console.log('For Patient Table:', result);
		});
		checkIfFullyVaccinated(currentAccount).then((result) => {
			setIsVaccinated(result);
			console.log('For Certificate:', result);
		});
	}, [currentAccount]);

	return (
		<div className="flex flex-col">
			<Table />
			{isAdmin && (
				<div className="flex flex-col">
					<h1 className="font-bold text-2xl text-center mt-2 mb-2">Admin Panel</h1>
					<PatientTable />
					<AdminForm />
				</div>
			)}
		</div>
	);
};

export default Page;
