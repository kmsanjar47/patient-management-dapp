// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Admin, Patient

contract PatientManagement {
    address adminAddress;

    uint initialPatientId = 0;

    Patient[] public patientList;

    struct Patient {
        uint256 patientId;
        bytes12 age;
        bytes12 gender; // 1 - male, 2- female;
        VaccineStatus vaccineStatus; // 0, 1, 2
        string district;
        string symptomsDetails;
        bool isDead;
        address patientAddress;
    }
    enum VaccineStatus {
        not_vaccinated,
        one_dose,
        two_dose
    }

    constructor() {
        adminAddress = msg.sender;
    }

    // Storing patient data
    function storePatientData(
        bytes12 _age,
        bytes12 _gender,
        string memory _district,
        string memory _symptomsDetails
    ) public {
        Patient memory tempPatient = Patient(
            initialPatientId + 1,
            _age,
            _gender,
            VaccineStatus.not_vaccinated,
            _district,
            _symptomsDetails,
            false,
            msg.sender
        );

        patientList.push(tempPatient);
        initialPatientId++;
    }

    modifier onlyAdminAccess() {
        require(
            msg.sender != adminAddress,
            "Only admin can access this function"
        );
        _;
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
}
