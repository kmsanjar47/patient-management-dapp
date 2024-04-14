import Web3, { AbiItem } from 'web3';
import PatientManagement from '../../build/contracts/PatientManagement.json';
let web3: Web3;
if (typeof window !== 'undefined' && window.ethereum) {
	web3 = new Web3(window.ethereum);
} else {
	console.error('Web3 cannot be initialized: window.ethereum is not available');
}

// Contract address
const contractAddress = '0xa4a3e9beB919A6974f77d9a9a9E98011aCDd406c'; // Update with your contract address

// Create contract instance
let contract: any;

export function connectMetamask(): Promise<string> | undefined {
	// web3 = new Web3(window.ethereum);

	if (window.ethereum) {
		return new Promise((resolve, reject) => {
			web3.eth.requestAccounts().then((accounts) => {
				console.log('Metamask connected successfully');
				console.log(accounts);
				resolve(accounts[0]);
				contract = new web3.eth.Contract(PatientManagement.abi as AbiItem[], contractAddress);
			});
		});
	} else {
		Promise.reject('Install Metamask');
	}
}

// function deployContract(){
//     const contract = new web3.eth.Contract(abi);
//     const deploy = contract.deploy({ data: bytecode, arguments: [1] });
//     deploy.send({ from: accounts[0], gas: 1500000, gasPrice: "30000000000000" });
// }

// Function to store patient data
export const storePatientData = async (
	age: number,
	gender: number,
	district: string,
	symptomsDetails: string,
	vaccineStatus: number,
	isDead: boolean
) => {
	// Use Metamask or other provider for user address
	const accounts = await web3.eth.getAccounts();
	const userAddress = accounts[0]; // Get first account from Metamask or provider

	// Send transaction to store patient data
	await contract.methods.storePatientData(age, gender, district, symptomsDetails, vaccineStatus, isDead).send({ from: userAddress });
};

export const storeAdminData = async (refAddress: string, age: number, gender: number, district: string) => {
	// Use Metamask or other provider for user address
	const accounts = await web3.eth.getAccounts();
	const userAddress = accounts[0]; // Get first account from Metamask or provider

	// Send transaction to store admin data
	await contract.methods.storeAdminData(refAddress, age, gender, district).send({ from: userAddress });
};

// Function to update vaccine status by admin
export const updateVaccineStatus = async (patientId: number, vaccineStatus: number) => {
	// Use Metamask or other provider for admin address
	const accounts = await web3.eth.getAccounts();
	const adminAddress = accounts[0]; // Get first account from Metamask or provider

	// Send transaction to update vaccine status
	await contract.methods.updateVaccineStatus(patientId, vaccineStatus).send({ from: adminAddress });
};

// Function to update dead status by admin
export const updateDeadStatus = async (patientId: number, deadStatus: boolean) => {
	// Use Metamask or other provider for admin address
	const accounts = await web3.eth.getAccounts();
	const adminAddress = accounts[0]; // Get first account from Metamask or provider

	// Send transaction to update dead status
	await contract.methods.updateDeadStatus(patientId, deadStatus).send({ from: adminAddress });
};

// Function to get patient data list
export const getPatientDataList = async () => {
	// Call contract method to get patient data list
	const data = await contract.methods.getPatientDataList().call();
	const maxCovidDistrict = findMostFrequentDistrict(data);
	const medianAges = calculateMedianAgeByDistrict(data);
	const agePercentage = calculateAgePercentage(data);
	const averageDeathRate = calculateAverageDeathRate(data);

	return {
		maxCovidDistrict,
		medianAges,
		agePercentage,
		averageDeathRate,
	};
};

function findMostFrequentDistrict(data: any[]) {
	// Create an object to store counts of each district
	const districtCounts = {};

	// Iterate through the array and count occurrences of each district
	data.forEach((item) => {
		const district = item.district;
		districtCounts[district] = (districtCounts[district] || 0) + 1;
	});

	// Find the district with the highest count
	let mostFrequentDistrict;
	let maxCount = 0;
	for (const district in districtCounts) {
		if (districtCounts[district] > maxCount) {
			mostFrequentDistrict = district;
			maxCount = districtCounts[district];
		}
	}

	return mostFrequentDistrict;
}

// Function to calculate median
function calculateMedian(values) {
	const sorted = values.slice().sort((a, b) => {
		if (typeof a === 'bigint' && typeof b === 'bigint') {
			return a < b ? -1 : a > b ? 1 : 0;
		}
		return a - b;
	});
	const mid = Math.floor(sorted.length / 2);
	return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / BigInt(2);
}

// Function to calculate median age by district
function calculateMedianAgeByDistrict(data) {
	const medianAgesByDistrict = [];

	// Group data by district
	const groupedByDistrict = {};
	data.forEach((item) => {
		if (!groupedByDistrict[item.district]) {
			groupedByDistrict[item.district] = [];
		}
		groupedByDistrict[item.district].push(item.age);
	});

	// Calculate median age for each district
	for (const district in groupedByDistrict) {
		const ages = groupedByDistrict[district];
		const medianAge = calculateMedian(ages);
		medianAgesByDistrict.push({ district, medianAge });
	}

	return medianAgesByDistrict;
}

// Function to calculate the percentage of patients in each age group
function calculateAgePercentage(patientData) {
	// Initialize counters for each age group
	let childrenCount = 0;
	let teenagersCount = 0;
	let youngCount = 0;
	let elderCount = 0;

	// Iterate through patient data and count patients in each age group
	patientData.forEach((patient) => {
		const age = patient.age;
		if (age < 13) {
			childrenCount++;
		} else if (age >= 13 && age < 20) {
			teenagersCount++;
		} else if (age >= 20 && age < 50) {
			youngCount++;
		} else {
			elderCount++;
		}
	});

	// Calculate total number of patients
	const totalPatients = patientData.length;

	// Calculate percentage of patients in each age group
	const childrenPercentage = (childrenCount / totalPatients) * 100;
	const teenagersPercentage = (teenagersCount / totalPatients) * 100;
	const youngPercentage = (youngCount / totalPatients) * 100;
	const elderPercentage = (elderCount / totalPatients) * 100;

	// Return percentages as an object
	return {
		children: childrenPercentage,
		teenagers: teenagersPercentage,
		young: youngPercentage,
		elder: elderPercentage,
	};
}

function calculateAverageDeathRate(data) {
	let totalDeathRate = 0;
	data.forEach((item) => {
		if (item.isDead) {
			totalDeathRate++;
		}
	});
	console.log('Total Death Rate:', totalDeathRate);
	return totalDeathRate / data.length;
}
