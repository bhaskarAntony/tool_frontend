import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Tab, Tabs } from 'react-bootstrap'; // For modal popups (Success/Error)
import './style.css'
import Loading from '../../components/loading/Loading';
// import Loading from '../../components/loading/Loading';

function MainIssue() {
 
  const [officers, setOfficers] = useState([]); // List of officers
  const [weapons, setWeapons] = useState([]); // List of weapons
  const [selectedWeapons, setSelectedWeapons] = useState([]); // List of selected weapon IDs
  const [searchOfficer, setSearchOfficer] = useState(""); // Search query for officers
  const [searchWeapon, setSearchWeapon] = useState(""); // Search query for weapons
  const [selectedOfficer, setSelectedOfficer] = useState(null); // Selected officer
  const [showModal, setShowModal] = useState(false); // Show success/error modal
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [modalVariant, setModalVariant] = useState("success"); // Success or error modal variant
  const [officerId, setOfficerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch officers and weapons from the backend
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:4000/api/officer')
      .then(response => {
        setIsLoading(false);
        setOfficers(response.data)
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching officers:', error)
      });

    axios.get('http://localhost:4000/api/weapons')
      .then(response =>{
        setIsLoading(false);
        setWeapons(response.data)
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching weapons:', error)
      });
  }, []);

  // Handle search query changes for officers
  const handleOfficerSearch = (e) => {
    setSearchOfficer(e.target.value);
  };

  // Handle search query changes for weapons
  const handleWeaponSearch = (e) => {
    setSearchWeapon(e.target.value);
  };

  // Filter officers based on search query
  const filteredOfficers = officers.filter(officer =>
    officer.name.toLowerCase().includes(searchOfficer.toLowerCase()) ||
    officer.metalNo.toLowerCase().includes(searchOfficer.toLowerCase()) ||
    officer.rank.toLowerCase().includes(searchOfficer.toLowerCase())
  );

  // Filter weapons based on search query
  const filteredWeapons = weapons.filter(weapon =>
    weapon.type.toLowerCase().includes(searchWeapon.toLowerCase()) ||
    weapon.registerNumber.toLowerCase().includes(searchWeapon.toLowerCase()) ||
    weapon.buttno.toLowerCase().includes(searchWeapon.toLowerCase())
  );

  // Handle checkbox selection of weapons
  const handleCheckboxChange = (weaponId) => {
    setSelectedWeapons(prevState =>
      prevState.includes(weaponId)
        ? prevState.filter(id => id !== weaponId)
        : [...prevState, weaponId]
    );
  };

  // Handle selecting an officer
  const handleOfficerSelect = (officer) => {
    setSelectedOfficer(officer);
  };

  // Handle form submission to issue selected weapons to the officer
  const handleIssueWeapons = () => {
    setIsLoading(true);
    if (!selectedOfficer) {
      setModalMessage("Please select an officer.");
      setModalVariant("danger");
      setShowModal(true);
      return;
    }

    if (selectedWeapons.length === 0) {
      setModalMessage("Please select at least one weapon to issue.");
      setModalVariant("danger");
      setShowModal(true);
      return;
    }

    // Send the request to issue the weapons
    axios.post('http://localhost:4000/api/transactions/issue', {
        officerId: selectedOfficer._id,  // Pass the officerId correctly
        weaponIds: selectedWeapons       // List of selected weapon IDs
      })
      .then(response => {
        setModalMessage('Weapons issued successfully!');
        setModalVariant("success");
        setIsLoading(false);
        setShowModal(true);
        navigate('/manage/officers')
      })
      .catch(error => {
        console.error('Error issuing weapons:', error);
        setModalMessage('Failed to issue weapons.');
        setModalVariant("danger");
        setIsLoading(false);
        setShowModal(true);
      });
  };


  if(isLoading){
    return <Loading/>
  }
  return (
    <div className="container-fluid p-3">
      {/* <h3 className="text-white mb-4 border-bottom border-light pb-3">Issue Weapons to Officer</h3> */}

      <div className="row">
        {/* Left Column: Search Officers */}
        <div className="col-md-6">
         <div className="weapon-card">
         <h4 className='fs-5'>Search Officers</h4>
         <hr />
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, metal number, or rank"
            value={searchOfficer}
            onChange={handleOfficerSearch}
          />
            {filteredOfficers.map(officer => (
              <div
                key={officer._id}
                className="main-btn p-3 mt-2"
                style={{ cursor: 'pointer' }}
                onClick={() => handleOfficerSelect(officer)}
              >
                {officer.name} ({officer.rank})
              </div>
            ))}
         </div>
        </div>

        {/* Right Column: Search Weapons */}
        <div className="col-md-6">
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Armoury">
      <div className="search-weapons">
          <h4 className='fs-5'>Search Armoury</h4>
          <hr />
          <input
            type="text"
            className="form-control"
            placeholder="Search by weapon type, register number, or butt number"
            value={searchWeapon}
            onChange={handleWeaponSearch}
          />
          <table className="mt-3">
            <thead>
              <tr>
                <th>Weapon Name</th>
                <th>Weapon Register No</th>
                <th>Status</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeapons.map((weapon) => {
                const isUnavailable =
                  weapon.status === "issued" ||
                  (weapon.fixedToOfficer &&
                    (weapon.fixedToOfficer.rank !== "" ||
                      weapon.fixedToOfficer.officername !== "" ||
                      weapon.fixedToOfficer.metalno !== ""));

                return (
                  <tr key={weapon._id}>
                    <td>{weapon.type}</td>
                    <td>{weapon.registerNumber}</td>
                    <td>{weapon.status == 'issued' ? <span className="px-3 p-1 small  rounded text-danger">Unavailable</span> : <span className="px-3 p-1 small  rounded text-success">Available</span>}</td>
                    <td>
                      {!isUnavailable && (
                        
                        <input
                          type="checkbox"
                          id={weapon._id}
                          onChange={() => handleCheckboxChange(weapon._id)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
      </Tab>
      <Tab eventKey="profile" title="Ammunition">
      <div className="search-weapons">
          <h4 className='fs-5'>Search Ammunition</h4>
          <hr />
          <input
            type="text"
            className="form-control"
            placeholder="Search by weapon type, register number, or butt number"
            value={searchWeapon}
            onChange={handleWeaponSearch}
          />
          <table className="mt-3">
            <thead>
              <tr>
                <th>Weapon Name</th>
                <th>Weapon Register No</th>
                <th>Status</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeapons.map((weapon) => {
                const isUnavailable =
                  weapon.status === "issued" ||
                  (weapon.fixedToOfficer &&
                    (weapon.fixedToOfficer.rank !== "" ||
                      weapon.fixedToOfficer.officername !== "" ||
                      weapon.fixedToOfficer.metalno !== ""));

                return (
                  <tr key={weapon._id}>
                    <td>{weapon.type}</td>
                    <td>{weapon.registerNumber}</td>
                    <td>{weapon.status == 'issued' ? <span className="px-3 p-1 small  rounded text-danger">Unavailable</span> : <span className="px-3 p-1 small  rounded text-success">Available</span>}</td>
                    <td>
                      {!isUnavailable && (
                        
                        <input
                          type="checkbox"
                          id={weapon._id}
                          onChange={() => handleCheckboxChange(weapon._id)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
      </Tab>
      <Tab eventKey="contact" title="Munition" >
      <div className="search-weapons">
          <h4 className='fs-5'>Search Munition</h4>
          <hr />
          <input
            type="text"
            className="form-control"
            placeholder="Search by weapon type, register number, or butt number"
            value={searchWeapon}
            onChange={handleWeaponSearch}
          />
          <table className="mt-3">
            <thead>
              <tr>
                <th>Weapon Name</th>
                <th>Weapon Register No</th>
                <th>Status</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeapons.map((weapon) => {
                const isUnavailable =
                  weapon.status === "issued" ||
                  (weapon.fixedToOfficer &&
                    (weapon.fixedToOfficer.rank !== "" ||
                      weapon.fixedToOfficer.officername !== "" ||
                      weapon.fixedToOfficer.metalno !== ""));

                return (
                  <tr key={weapon._id}>
                    <td>{weapon.type}</td>
                    <td>{weapon.registerNumber}</td>
                    <td>{weapon.status == 'issued' ? <span className="px-3 p-1 small  rounded text-danger">Unavailable</span> : <span className="px-3 p-1 small  rounded text-success">Available</span>}</td>
                    <td>
                      {!isUnavailable && (
                        
                        <input
                          type="checkbox"
                          id={weapon._id}
                          onChange={() => handleCheckboxChange(weapon._id)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
      </Tab>
    </Tabs>
         
        </div>
      </div>

      {/* Officer Card */}
     <div className="row selection p-3 p-md-5">
      <div className="col-md-4 mb-3">
              <div className="card p-3 h-100">
                <h1 className="fs-5">Selected Officer</h1>
                <hr />
                {selectedOfficer ? (
        <div className="card bg-white p-3  mt-4">
          <div className="card-body">
            <p><strong>Name:</strong> {selectedOfficer.name}</p>
            <p><strong>Rank:</strong> {selectedOfficer.rank}</p>
            <p><strong>Metal No:</strong> {selectedOfficer.metalNo}</p>
          </div>
        </div>
      ):(
       <div className="card p-3 text-center">
        <img src="https://thumbs.dreamstime.com/b/sad-document-no-data-file-icon-white-334021734.jpg" alt="" className="w-75 d-block m-auto" />
        <h1 className="fs-5">No Officer Selected</h1>
       </div>
      )}
              </div>
      </div>
      <div className="col-md-8 mb-3">
        <div className="card p-3 h-100">
          <h1 className="fs-5">Selected Weapons</h1>
          <hr />
          {selectedWeapons.length > 0 ? (
        <div className="mt-4 p-3">
            {weapons.filter(weapon => selectedWeapons.includes(weapon._id)).map(weapon => (
              <div key={weapon._id} className="main-btn p-3">
                {weapon.type} - {weapon.registerNumber}
              </div>
            ))}
        </div>
      ):(

        <div className="card p-3 text-center h-100">
        <img src="https://thumbs.dreamstime.com/b/sad-document-no-data-file-icon-white-334021734.jpg" alt="" className="w-25 d-block m-auto" />
        <h1 className="fs-5">No Weapons Selected</h1>
       </div>
      )}
        </div>
      </div>
     </div>

      {/* Selected Weapons */}
     
    
      {/* Issue Button */}
      <button
        className="red-btn mt-3"
        onClick={handleIssueWeapons}
      >
        Issue Selected Weapons
      </button>

      {/* Success/Error Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalVariant === "success" ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MainIssue;
