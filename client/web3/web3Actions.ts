import Web3 from "web3";
let web3: Web3;

export function connectMetamask() {
    web3 = new Web3(window.ethereum);

    if (window.ethereum) {
        return new Promise((resolve, reject) => {
            web3.eth.requestAccounts().then((accounts) => {
                console.log("Metamask connected successfully");
                console.log(accounts);
                resolve(accounts[0]);
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
