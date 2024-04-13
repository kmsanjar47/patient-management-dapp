// requiring the contract
var PatientManagement = artifacts.require("PatientManagement");

// exporting as module
module.exports = function (deployer) {
  deployer.deploy(PatientManagement);
};
