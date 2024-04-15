// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// Admin, Patient

contract PatientManagement {
    address public ownerAddress;

    uint internal initialPatientId = 0;

    User[] public patientList;
    mapping(address => uint) isAdmin;
    mapping(address => uint) isAlreadyPatient;
    mapping(address => uint) vaccinationStatus;
    event updatedDeadStatus(uint patientId, bool isDead);
    event updatedVaccineStatus(uint patientId, VaccineStatus vaccineStatus);

    struct User {
        uint256 patientId;
        uint8 age;
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

    modifier validPatientAddress(address _patientAddress) {
        require(
            isAlreadyPatient[_patientAddress] == 0,
            "Patient Already Exists!"
        );
        _;
    }

    constructor() {
        ownerAddress = msg.sender;
        patientList.push(
            User(
                initialPatientId,
                25,
                1,
                VaccineStatus.not_vaccinated,
                "Dhaka",
                "Headache",
                false,
                ownerAddress,
                UserType.admin
            )
        );
        patientList.push(
            User(
                1,
                18,
                2,
                VaccineStatus.one_dose,
                "Chittagong",
                "Cough, Fever, Headache",
                false,
                address(0xD8e9698dbA5dF92882478e5f049b2666b00120d0),
                UserType.patient
            )
        );
        patientList.push(
            User(
                2,
                82,
                2,
                VaccineStatus.one_dose,
                "Chittagong",
                "Fever, Cough",
                false,
                address(0x67A3688404800d48554448853e6e7028EDB8dEF9),
                UserType.patient
            )
        );

        patientList.push(
            User(
                3,
                12,
                1,
                VaccineStatus.two_dose,
                "Rajshahi",
                "Fatigue, Loss of Taste",
                true,
                address(0x232Dccb4f2a2e57d085832aa8151Acd4dA5EC0cc),
                UserType.patient
            )
        );
        patientList.push(
            User(
                4,
                28,
                2,
                VaccineStatus.not_vaccinated,
                "Khulna",
                "Body Aches, Sore Throat",
                false,
                address(0x54a231904E3D11447676BF6025aF240354011228),
                UserType.patient
            )
        );

        patientList.push(
            User(
                5,
                45,
                1,
                VaccineStatus.one_dose,
                "Dhaka",
                "Shortness of Breath, Diarrhea",
                false,
                address(0xA43CaeD907c2987E655E5Fff06800021DCcC356b),
                UserType.patient
            )
        );

        vaccinationStatus[ownerAddress] = 0;

        vaccinationStatus[
            address(0xD8e9698dbA5dF92882478e5f049b2666b00120d0)
        ] = 1;
        vaccinationStatus[
            address(0x67A3688404800d48554448853e6e7028EDB8dEF9)
        ] = 1;
        vaccinationStatus[
            address(0x232Dccb4f2a2e57d085832aa8151Acd4dA5EC0cc)
        ] = 2;
        vaccinationStatus[
            address(0x54a231904E3D11447676BF6025aF240354011228)
        ] = 0;
        vaccinationStatus[
            address(0xA43CaeD907c2987E655E5Fff06800021DCcC356b)
        ] = 1;

        isAdmin[ownerAddress] = 1;
        initialPatientId = 5;
    }

    // Storing patient data
    function storePatientData(
        uint8 _age,
        uint256 _gender,
        string memory _district,
        string memory _symptomsDetails,
        VaccineStatus _vaccineStatus,
        bool _isDead
    ) public validPatientAddress(msg.sender) {
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
        isAlreadyPatient[msg.sender] = 1;
        vaccinationStatus[msg.sender] = uint(_vaccineStatus);
        initialPatientId++;
    }

    function storeAdminData(
        address _refAdminAddress,
        uint8 _age,
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
        patientList[_patientId].vaccineStatus = _vaccineStatus;
        address patientAddress = patientList[_patientId].patientAddress;
        vaccinationStatus[patientAddress] = uint(_vaccineStatus);
        emit updatedVaccineStatus(_patientId, _vaccineStatus);
    }

    function updateDeadStatus(
        uint _patientId,
        bool _deadStatus
    ) public onlyAdminAccess {
        patientList[_patientId].isDead = _deadStatus;
        emit updatedDeadStatus(_patientId, _deadStatus);
    }

    function getPatientDataList() public view returns (User[] memory) {
        return patientList;
    }

    function checkIfAdmin(address _adminAddress) public view returns (bool) {
        if (isAdmin[_adminAddress] == 1) {
            return true;
        }
        return false;
    }

    function checkIfFullyVaccinated(
        address _userAddress
    ) public view returns (bool) {
        if (vaccinationStatus[_userAddress] == 2) {
            return true;
        }
        return false;
    }

    function checkIfAlreadyPatient(
        address _patientAddress
    ) public view returns (bool) {
        if (isAlreadyPatient[_patientAddress] == 1) {
            return true;
        }
        return false;
    }
}
