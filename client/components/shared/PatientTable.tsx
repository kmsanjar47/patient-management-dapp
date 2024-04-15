import React from 'react';
import { getContract } from '@/web3/web3Actions';
// Define the User type with only required fields
interface User {
	patientId: number;
	age: number;
	gender: number;
	vaccineStatus: number;
	district: string;
	symptomsDetails: string;
	isDead: boolean;
}

// Define the props type for the Table component
interface TableProps {
	users: User[];
}

function vaccineStatusToString(data: any) {
	if (data.vaccineStatus == 0) {
		return 'Not Vaccinated';
	} else if (data.vaccineStatus == 1) {
		return 'One Dose';
	} else {
		return 'Two Dose';
	}
}

// Table component
const PatientTable: React.FC<TableProps> = ({ users }) => {
	const [patients, setPatients] = React.useState<User[]>([]);

	React.useEffect(() => {
		setPatients(users);
	}, [users]);

	const contract = getContract();

	try {
		contract.events.updatedDeadStatus().on('data', function (event) {
			console.log('Data Updated:', event.returnValues);
			const patient = patients.find((p) => p.patientId == event.returnValues.patientId);
			patient.isDead = event.returnValues.isDead;
			let newPatients = patients.filter((p) => p.patientId != event.returnValues.patientId);
			newPatients.push(patient);
			setPatients([...newPatients]);
		});

		contract.events.updatedVaccineStatus().on('data', function (event) {
			console.log('Data Updated:', event.returnValues);
			const patient = patients.find((p) => p.patientId == event.returnValues.patientId);
			patient.vaccineStatus = event.returnValues.vaccineStatus;
			let newPatients = patients.filter((p) => p.patientId != event.returnValues.patientId);
			newPatients.push(patient);
			setPatients([...newPatients]);
		});
	} catch (error) {
		console.error('Error while updating vaccine status or dead status:', error);
	}

	// Check if users array is undefined or null
	if (!users) {
		return <div>No data available</div>;
	}

	return (
		<div className="relative overflow-x-auto m-3">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Patient ID
						</th>
						<th scope="col" className="px-6 py-3">
							Age
						</th>
						<th scope="col" className="px-6 py-3">
							Gender
						</th>
						<th scope="col" className="px-6 py-3">
							Vaccine Status
						</th>
						<th scope="col" className="px-6 py-3">
							District
						</th>
						<th scope="col" className="px-6 py-3">
							Symptoms Details
						</th>
						<th scope="col" className="px-6 py-3">
							Is Dead
						</th>
					</tr>
				</thead>
				<tbody>
					{patients.map((user) => (
						<tr key={user.patientId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<td className="px-6 py-4 whitespace-nowrap dark:text-white">{user.patientId.toString()}</td>
							<td className="px-6 py-4">{user.age.toString()}</td>
							<td className="px-6 py-4">{user.gender == 1 ? 'Male' : 'Female'}</td>
							<td className="px-6 py-4">{vaccineStatusToString(user)}</td>
							<td className="px-6 py-4">{user.district}</td>
							<td className="px-6 py-4">{user.symptomsDetails === '' ? 'N/A' : user.symptomsDetails}</td>
							<td className="px-6 py-4">{user.isDead ? 'Yes' : 'No'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PatientTable;
