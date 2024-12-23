import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import { Dropdown, Offcanvas } from 'react-bootstrap';
import NewArmoury from '../../components/Newarmary/NewArmoury';
import Edit from './Edit';
import Details from './Details';

function Ammunition() {
  const [weapons, setWeapons] = useState([]);
  const [filteredWeapons, setFilteredWeapons] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [AddType, setAddType] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    category: '',
    createdOn: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://tool-backendf.onrender.com/api/items')
      .then((response) => {
        setIsLoading(false);
        const fixedWeapons = response.data;
        setWeapons(fixedWeapons);
        setFilteredWeapons(fixedWeapons);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching weapons:', error);
      });
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = weapons.map((weapon) => weapon.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = weapons.filter((weapon) => {
      return (
        (!filters.type || weapon.type === filters.type) &&
        (!filters.status || weapon.status === filters.status) &&
        (!filters.category || weapon.category === filters.category) &&
        (!filters.createdOn || weapon.createdOn === filters.createdOn)
      );
    });
    setFilteredWeapons(filtered);
  };

  const handleActionSelect = (action) => {
    switch (action) {
      case 'delete':
        console.log('Delete selected rows:', selectedRows);
        break;
      case 'export':
        console.log('Export selected rows:', selectedRows);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  if (isLoading) {
    return <Loading />;
  }

  const openCanvasHandler = (type, id) =>{
    setAddType(type);
    setUpdateId(id)
    setShowCanvas(true)
}
const closeCanvasHanlder = () =>{
    setShowCanvas(false);
    setAddType('');
}

const handleDelete = async (weaponId) => {
    try {
        await axios.delete(`https://tool-backendf.onrender.com/api/weapons/${weaponId}`);
        setWeapons(prevWeapons => prevWeapons.filter(w => w.id !== weaponId));
        alert('Weapon deleted successfully.');
    } catch (error) {
        console.error('Error deleting weapon:', error);
        alert('Failed to delete weapon.');
    }
};
  return (
    <section className="container-fluid p-3 p-md-5">
      <h1 className="fs-3 fw-normal">Manage Armoury</h1>
      <hr />
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex align-items-center justify-content-between">
            <div className="search">
              <input type="text" placeholder="Search Armoury" />
              <button>
                <i className="bi bi-search"></i>
              </button>
            </div>
            <select
              name="actions"
              id="actions"
              className="main-btn hover"
              onChange={(e) => handleActionSelect(e.target.value)}
              disabled={selectedRows.length === 0}
            >
              <option value="" disabled selected>
                Actions
              </option>
              <option value="delete">Delete</option>
              <option value="export">Export</option>
            </select>
          </div>
          <div className="main-btn mt-3 filter d-flex gap-2 align-items-center justify-content-between p-2">
            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="type">Type</label>
              <select name="type" id="type" onChange={handleFilterChange}>
                <option value="">Select Armoury Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </select>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="status">Status</label>
              <select name="status" id="status" onChange={handleFilterChange}>
                <option value="">Select Armoury Status</option>
                <option value="available">Available</option>
                <option value="issued">Issued</option>
              </select>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="category">Category</label>
              <select name="category" id="category" onChange={handleFilterChange}>
                <option value="">Select Armoury Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="createdOn">Created on</label>
              <input type="date" name="createdOn" onChange={handleFilterChange} />
            </div>
          </div>
          <table width="100%" className="table">
            <thead>
              <tr className="main-btn">
                <th className="d-flex gap-2 align-items-center">
                 
                  title
                </th>
                <th>Description</th>
                {/* <th>Reg. no</th>
                <th>Coy</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeapons.length > 0 ? (
                filteredWeapons.map((item) => (
                  <tr key={item.id}>
                    <td className='d-flex gap-2 align-ietms-center'>
                     
                      {item.title}
                    </td>
                    <td>{item.description}</td>
                    {/* <td>{item.registerNumber}</td>
                    <td>{item.coy}</td> */}
                    <td className="text-center">
                      <Dropdown>
                        <Dropdown.Toggle variant="link" className="text-dark p-0">
                          <i className="bi bi-gear-fill" style={{ cursor: 'pointer' }}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=>openCanvasHandler('edit', item._id)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={()=>handleDelete(item._id)}>Delete</Dropdown.Item>
                          <Dropdown.Item  onClick={()=>openCanvasHandler('view', item._id)}>View Details</Dropdown.Item>
                          <Dropdown.Item>History</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No weapons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <button  className="red-btn w-100 text-start px-3" onClick={()=>openCanvasHandler('armoury')}>
            <i className="bi bi-plus-lg"></i> Add new Armoury
          </button>
        </div>
      </div>
      <Offcanvas show={showCanvas} onHide={closeCanvasHanlder} placement='bottom'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{textTransform:'capitalize'}}>{AddType}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {
                AddType=='armoury'?(<NewArmoury C_type={'armoury'}/>):AddType=='edit'?(<Edit id={updateId}/>):AddType=='view'?(<Details id={updateId}/>):(null)
            }
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
}

export default Ammunition;
