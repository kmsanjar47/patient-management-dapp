// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// Admin, Patient

contract PatientManagement {
    address public ownerAddress;

    uint internal initialPatientId = 0;

    User[] public patientList;
    mapping(address => uint) isAdmin;

    struct User {
        uint256 patientId;
        uint256 age;
        uint256 gender; // 1 - male, 2- female;
        VaccineStatus vaccineStatus; // 0, 1, 2
        string district;
        string symptomsDetails;
        bool isDead;
        address patientAddress;
        UserType userType;
    }
    enum VaccineStatus {
        not_vaccinated,
        one_dose,
        two_dose
    }
    enum UserType {
        admin,
        patient
    }

    modifier onlyAdminAccess() {
        require(
            isAdmin[msg.sender] == 1,
            "Only admin can access this function"
        );
        _;
    }

    modifier validRefAdminAddress(address _refAddress) {
        require(isAdmin[_refAddress] == 1, "Invalid reference address!");
        _;
    }

    constructor() {
        ownerAddress = msg.sender;
        patientList.push(
            User(
                1,
                25,
                1,
                VaccineStatus.not_vaccinated,
                "admin",
                "admin",
                false,
                ownerAddress,
                UserType.admin
            )
        );
        isAdmin[ownerAddress] = 1;
    }

    // Storing patient data
    function storePatientData(
        uint256 _age,
        uint256 _gender,
        string memory _district,
        string memory _symptomsDetails,
        VaccineStatus _vaccineStatus,
        bool _isDead
    ) public {
        User memory tempPatient = User(
            initialPatientId + 1,
            _age,
            _gender,
            _vaccineStatus,
            _district,
            _symptomsDetails,
            _isDead,
            msg.sender,
            UserType.patient
        );

        patientList.push(tempPatient);
        isAdmin[msg.sender] = 0;
        initialPatientId++;
    }

    function storeAdminData(
        address _refAdminAddress,
        uint256 _age,
        uint256 _gender,
        string memory _district
    ) public validRefAdminAddress(_refAdminAddress) {
        User memory tempPatient = User(
            initialPatientId + 1,
            _age,
            _gender,
            VaccineStatus.not_vaccinated,
            _district,
            "",
            false,
            msg.sender,
            UserType.admin
        );

        patientList.push(tempPatient);
        isAdmin[msg.sender] = 1;
        initialPatientId++;
    }

    function updateVaccineStatus(
        uint _patientId,
        VaccineStatus _vaccineStatus
    ) public onlyAdminAccess {
        patientList[_patientId - 1].vaccineStatus = _vaccineStatus;
    }

    function updateDeadStatus(
        uint _patientId,
        bool _deadStatus
    ) public onlyAdminAccess {
        patientList[_patientId - 1].isDead = _deadStatus;
    }

    function getPatientDataList() public view returns (User[] memory) {
        return patientList;
    }
}
