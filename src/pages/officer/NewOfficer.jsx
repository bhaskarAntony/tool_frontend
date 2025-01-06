import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './style.css';

function NewOfficer() {
    const [officerData, setOfficerData] = useState({
        name: '',
        rank: '',
        status: 'returned',
        metalNo: '',
        duty: '',
        phonenumber: '',
        received: '',
        returned: '',
        registerNo: '',
        kgidNo: '',
        role: '',
        remarks: '',
        auditDate: '',
        maintenanceDate: '',
        lastAuditedDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOfficerData({ ...officerData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://tool-backendf.onrender.com/api/officer', officerData)
            .then(response => {
                alert('Officer added successfully!');
                setOfficerData({
                    name: '',
                    rank: '',
                    status: 'returned',
                    metalNo: '',
                    duty: '',
                    phonenumber: '',
                    received: '',
                    returned: '',
                    registerNo: '',
                    kgidNo: '',
                    remarks: '',
                    auditDate: '',
                    maintenanceDate: '',
                    lastAuditedDate: ''
                }); // Reset form
            })
            .catch(error => {
                console.error('Error adding officer:', error);
                alert('Failed to add officer');
            });
    };

    return (
        <Container className="mt-5">
            <h3 className="fs-3">Add New Officer</h3>
            <hr />
            <div className="row">
                <div className="col-md-11 new-weapon m-auto">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Officer/Men Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter officer/men name"
                                        name="name"
                                        value={officerData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formMetalNo">
                                    <Form.Label>Metal Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter metal number"
                                        name="metalNo"
                                        value={officerData.metalNo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            {/* <Col md={6}>
                                <Form.Group controlId="formRank">
                                    <Form.Label>Rank</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter rank"
                                        name="rank"
                                        value={officerData.rank}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col> */}
                            <Col md={6}>
                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone number"
                                        name="phonenumber"
                                        value={officerData.phonenumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formRegisterNo">
                                    <Form.Label>Register Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter register number"
                                        name="registerNo"
                                        value={officerData.registerNo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formKGIDNo">
                                    <Form.Label>KGID Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter KGID number"
                                        name="kgidNo"
                                        value={officerData.kgidNo}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Rank</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="role"
                                        value={officerData.role}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Officers/Men Rank</option>
                                        <option value="type1">PC</option>
                                        <option value="type2">HC</option>
                                        <option value="">ARSI/ASI</option>
                                        <option value="">RSI/PSI</option>
                                        <option value="">RPI/PI</option>
                                        <option value="">AC/DySP</option>
                                        <option value="">DC/Addl.SP</option>
                                        <option value="">Commandant/SP</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDuty">
                                    <Form.Label>Duty</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter duty"
                                        name="duty"
                                        value={officerData.duty}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            {/* <Col md={6}>
                                <Form.Group controlId="formStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="status"
                                        value={officerData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="returned">Returned</option>
                                        <option value="received">Received</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col> */}
                            <Col md={6}>
                                <Form.Group controlId="formRemarks">
                                    <Form.Label>Remarks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter remarks"
                                        name="remarks"
                                        value={officerData.remarks}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formAuditDate">
                                    <Form.Label>Audit/Maintenance Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="auditDate"
                                        value={officerData.auditDate}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formLastAuditedDate">
                                    <Form.Label>Last Audited Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="lastAuditedDate"
                                        value={officerData.lastAuditedDate}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" className="mt-3 red-btn px-5">Submit</Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default NewOfficer;
