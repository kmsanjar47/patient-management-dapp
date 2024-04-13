import Web3, { AbiItem } from "web3";
import PatientManagement from "../../build/contracts/PatientManagement.json";
let web3: Web3;


// Contract address
const contractAddress = '0x61c1216883EA27DA3861B0D1d400192f67F53728'; // Update with your contract address

// Create contract instance
let contract: any;


export function connectMetamask(): Promise<string>|undefined{
    web3 = new Web3(window.ethereum);

    if (window.ethereum) {
        return new Promise((resolve, reject) => {
            web3.eth.requestAccounts().then((accounts) => {
                console.log("Metamask connected successfully");
                console.log(accounts);
                resolve(accounts[0]);
                contract = new web3.eth.Contract(
                    PatientManagement.abi as AbiItem[],
                    contractAddress
                );
            });
        });

    } else {
        Promise.reject("Install Metamask");
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
    await contract.methods
        .storePatientData(age, gender, district, symptomsDetails, vaccineStatus, isDead)
        .send({ from: userAddress });
};

export const storeAdminData = async (
    refAddress: string,
    age: number,
    gender: number,
    district: string,
    
) => {
    // Use Metamask or other provider for user address
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0]; // Get first account from Metamask or provider

    // Send transaction to store admin data
    await contract.methods
        .storeAdminData(refAddress,age, gender, district)
        .send({ from: userAddress });
};

// Function to update vaccine status by admin
export const updateVaccineStatus = async (
    patientId: number,
    vaccineStatus: number
) => {
    // Use Metamask or other provider for admin address
    const accounts = await web3.eth.getAccounts();
    const adminAddress = accounts[0]; // Get first account from Metamask or provider

    // Send transaction to update vaccine status
    await contract.methods
        .updateVaccineStatus(patientId, vaccineStatus)
        .send({ from: adminAddress });
};

// Function to update dead status by admin
export const updateDeadStatus = async (patientId: number, deadStatus: boolean) => {
    // Use Metamask or other provider for admin address
    const accounts = await web3.eth.getAccounts();
    const adminAddress = accounts[0]; // Get first account from Metamask or provider

    // Send transaction to update dead status
    await contract.methods
        .updateDeadStatus(patientId, deadStatus)
        .send({ from: adminAddress });
};

// Function to get patient data list
export const getPatientDataList = async () => {
    // Call contract method to get patient data list
    return await contract.methods.getPatientDataList().call();
};
