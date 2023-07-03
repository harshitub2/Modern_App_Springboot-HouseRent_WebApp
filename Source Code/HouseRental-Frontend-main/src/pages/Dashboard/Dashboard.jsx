import NavBar from "../../components/NavBar-Main/Navbar";
import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { FaHouseCircleCheck, FaPeopleRoof, FaMoneyBillTransfer, FaHouseCircleXmark, FaMoneyBills } from "react-icons/fa6";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Dashboard.css"

function Dashboard() {

    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState([]);
    const [tenant, setTenant] = useState([]);
    const [rentLeft, setRentLeft] = useState([]);

    const fetchProperty = async () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/landlord/get/properties/${user.id}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setProperty(d))
            .catch((error) => {
                console.error("Error fetching data:", error);
                // Retry after a delay
                setTimeout(fetchProperty, 2000); // Retry after 2 seconds
            });
    }

    const fetchTenant = async () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/landlord/get/tenants/${user.id}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setTenant(d));
    }

    const fetchRentLeft = async () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/landlord/totalrent/${user.id}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setRentLeft(d));
    }
    useEffect(() => {
        fetchProperty();
        fetchTenant();
        fetchRentLeft();
    }, []);

    return (
        <>
            <NavBar />
            <React.Fragment>
                <h2 className='text-center my-5'>Dashboard</h2>
                <div className="contain">
                    <Row>
                        <Col md={6} lg={4} className="col-sm-12" >
                            <Card style={{ width: '100%', backgroundColor: "#FA8072" }}>

                                <Card.Body>
                                    <div className="icon ms-auto">
                                        <FaPeopleRoof size={50} marginLeft={40} className="icon justify-content-center align-items-center ml-auto" />
                                    </div>
                                    <Card.Title style={{ color: 'white' }}>Tenants</Card.Title>
                                    <h4 className="number">
                                        {Object.keys(tenant).length}
                                    </h4>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4} className="col-sm-12" >
                            <Card style={{ width: '100%', backgroundColor: "#00CED1" }}>

                                <Card.Body>
                                    <div className="icon ms-auto">
                                        <FaHouseCircleCheck size={50} marginLeft={40} className="icon justify-content-center align-items-center ml-auto" />
                                    </div>
                                    <Card.Title style={{ color: 'white' }}>Houses</Card.Title>
                                    <h4 className="number">
                                        {Object.keys(property).length}
                                    </h4>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4} className="col-sm-12" >
                            <Card style={{ width: '100%', backgroundColor: "#F4A460" }}>

                                <Card.Body>
                                    <div className="icon ms-auto">
                                        <FaMoneyBillTransfer size={50} marginLeft={40} className="icon justify-content-center align-items-center ml-auto" />
                                    </div>
                                    <Card.Title style={{ color: 'white' }}>Payments Left</Card.Title>
                                    <h4 className="number">{rentLeft}</h4>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div className="contain">
                    <Row>
                        <Col md={6} lg={4} className="col-sm-12">
                            <Card style={{ width: '100%', backgroundColor: "#9370DB" }}>

                                <Card.Body>
                                    <div className="icon ms-auto">
                                        <FaMoneyBills size={50} marginLeft={40} className="icon justify-content-center align-items-center ml-auto" />
                                    </div>
                                    <Card.Title style={{ color: 'white' }}>Unpaid Rent</Card.Title>
                                    <h4 className="number">
                                        {
                                            Object.values(tenant).filter(
                                                (tenant) => !tenant.rentPaid
                                            ).length
                                        }
                                    </h4>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4} className="col-sm-12" >
                            <Card style={{ width: '100%', backgroundColor: "#00BFFF"  }}>

                                <Card.Body>
                                    <div className="icon ms-auto">
                                        <FaHouseCircleXmark size={50} marginLeft={40} className="icon justify-content-center align-items-center ml-auto" />
                                    </div>
                                    <Card.Title style={{ color: 'white' }}>Vacanices</Card.Title>
                                    <h4 className="number">
                                        {
                                            Object.values(property).filter(
                                                (property) => !property.tenantId
                                            ).length
                                        }
                                    </h4>
                                </Card.Body>
                            </Card>
                        </Col>
                       
                    </Row>
                </div>
            </React.Fragment >
            
        </>
    );

};
export default Dashboard