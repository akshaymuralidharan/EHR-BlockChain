pragma solidity ^0.5.0;

contract ehr{

    //declaring state variables
    address admin;
    enum gender {male, female, other}

    // crearting constructor
    constructor() public{
        admin = msg.sender;
    }
    
    // creating the structure patient
    struct patient{
        string name;
        string DOB;
        string addrs;
        string email;
        gender myGender;
        string emergencycontact;
        uint emergno;
    }
    
    //creating a mapping named person
    mapping(uint => patient) public person;
    
    
    
    //function for entering the mobileno of the person and the structure details of that person
    function setPatient(uint _mobileno, string memory _name, string memory _DOB, string memory _addrs, string memory _email, gender _myGender, string memory _emergencycontact, uint _emergno) public {
        person[_mobileno] = patient(_name, _DOB, _addrs, _email, _myGender, _emergencycontact, _emergno);
    }
    
    // function for viewing the patient using the mobile number
    function getPatient(uint _mobileno) public view returns (string memory _name, string memory _DOB, string memory _addrs, string memory _email, gender _myGender, string memory _emergencycontact, uint _emergno){

        _name = person[_mobileno].name;
        _DOB = person[_mobileno].DOB;
        _addrs = person[_mobileno].addrs;
        _email = person[_mobileno].email;
        _myGender = person[_mobileno].myGender;
        _emergencycontact = person[_mobileno].emergencycontact;
        _emergno = person[_mobileno].emergno;
    }

    // creating the structure doctor
    struct doctor{
        address publickey;
        string name;
        string DOB;
        string addrs;
        string email;
        gender myGender;
        string hospitalname;
        string qualifications;
    }
    
    //creating a mapping named dctr for the doctor
    mapping(uint => doctor) public dctr;

//function for entering the id of the dctr and the structure details of that doctor
    function setDoctor(uint _id,address _publickey, string memory _name, string memory _DOB, string memory _addrs, string memory _email, gender _myGender, string memory _hospitalname, string memory _qualifications) public {
        dctr[_id] = doctor(_publickey, _name, _DOB, _addrs, _email, _myGender, _hospitalname, _qualifications);
    }    

// function for viewing the doctor using the id
    function getDoctor(uint _id) public view returns (address _publickey, string memory _name, string memory _DOB, string memory _addrs, string memory _email, gender _myGender, string memory _hospitalname, string memory _qualifications){

        _publickey = dctr[_id].publickey;
        _name = dctr[_id].name;
        _DOB = dctr[_id].DOB;
        _addrs = dctr[_id].addrs;
        _email = dctr[_id].email;
        _myGender = dctr[_id].myGender;
        _hospitalname = dctr[_id].hospitalname;
        _qualifications = dctr[_id].qualifications;
    }

    //cerating structure for hospital
    struct hospital{
        address publickey;
        string name;
        string email;
        uint phone;
        string ownership;
        string state;
        string place;
        string haddress;
    }

    //creating mapping for hospital
    mapping(uint => hospital) public hospitaldetails;

    //creating modifier for owner only condition
    modifier only_owner(){
        require(msg.sender == admin);
        _;
    }

    //function to set the hospital with the with the mapping hospital id
    function setHospital(uint _id, address _publickey, string memory _name, string memory _email, uint  _phone, string memory _ownership, string memory _state, string memory _place, string memory _haddress) public only_owner returns (bool){
        hospitaldetails[_id] = hospital(_publickey, _name, _email, _phone, _ownership, _state, _place, _haddress);
    } 

    //function to get the hospital details with the hospital id
    function getHospital(uint _id) public view returns (address _publickey, string memory _name, string memory _email, uint  _phone, string memory _ownership, string memory _state, string memory _place, string memory _haddress){

        _publickey= hospitaldetails[_id].publickey;
        _name = hospitaldetails[_id].name;
        _email = hospitaldetails[_id].email;
        _phone = hospitaldetails[_id].phone;
        _ownership = hospitaldetails[_id].ownership;
        _state = hospitaldetails[_id].state;
        _place = hospitaldetails[_id].place;
        _haddress = hospitaldetails[_id].haddress;
    }

    //creating structure to insert the medical certificates
    struct medicalcertificates{
        string record;
    }

}