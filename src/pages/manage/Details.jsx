import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Details({id}) {
    const [weaponDetails, setWeaponDetails] = useState(null); // State to hold weapon details
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`https://tool-backendf.onrender.com/api/weapons/single/${id}`);
                setWeaponDetails(res.data); // Save fetched data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weapon details:', error);
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]); // Dependency array includes 'id'

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!weaponDetails) {
        return <p>No details found for this weapon.</p>;
    }

    return (
        <section className="container-fluid bg-light p-3" style={{minHeight:'100vh'}}>
            <div className="details-top p-3 bg-white mt-3">
              <h3 className="fs-3 d-flex align-items-center gap-2">{weaponDetails.type} <p className="badge text-bg-success">{weaponDetails.category}</p>  <div className="icon">
              <Link to="/manage/armoury" className="text-secondary" title="Edit email">
                  <i className="bi bi-pencil-fill fs-6"></i>
                </Link></div></h3>
              <hr />
            </div>
            <div className="row mt-3">
                <div className="col-md-4">
                    <div className="card p-3 rounded-0">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="fs-6" style={{textTransform:'capitalize'}}><b>{weaponDetails.category} Name</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.type}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6"><b>Category</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.category}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6"><b>Company</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.coy}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6"><b>Availability</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.status}</p>
                            </div>

                            <div className="col-md-6">
                                <p className="fs-6"><b>Upcoming Maintainance Date</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.upcomingMaintenanceDate?weaponDetails.upcomingMaintenanceDate:'N/A'}</p>
                            </div>

                            <div className="col-md-6">
                                <p className="fs-6"><b>Register Number</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.registerNumber?weaponDetails.registerNumber:'N/A'}</p>
                            </div>

                            <div className="col-md-6">
                                <p className="fs-6"><b>Rack Number</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.rackNumber?weaponDetails.rackNumber:'N/A'}</p>
                            </div>

                            <div className="col-md-6">
                                <p className="fs-6"><b>last Audited By</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.lastAuditBy?weaponDetails.lastAuditBy:'N/A'}</p>
                            </div>

                            <div className="col-md-6">
                                <p className="fs-6"><b>Butt Number</b></p>
                            </div>
                            <div className="col-md-6">
                                <p className="fs-6">{weaponDetails.buttno?weaponDetails.buttno:'N/A'}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    {
                        weaponDetails.history.length>0?(
                            null
                        ):(
                            <div className="row p-3 p-md-5 h-100 bg-white">
                                <div className="col-md-6 text-center m-auto">
                                <i class="bi bi-ban display-5"></i>
                                        <h1 className="fs-4 mt-3 fw-bold">No History</h1>
                                        <p className="fs-6 text-secondary">No History available about this {weaponDetails.category}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default Details;
