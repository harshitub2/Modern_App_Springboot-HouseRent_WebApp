import React from "react";
import NavBar from "../../components/NavBar-Main/Navbar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandLord from '../../Assets/LandLord.png';
import PropertyImg from '../../Assets/PropertyImg.png';
import { FaUser, FaHome, FaMoneyBillAlt } from 'react-icons/fa';
import './tenantDash.css';
import { useNavigate } from "react-router-dom";


const TenantDashboard = () => {
    const { tenantUser, tenantLogout } = useContext(AuthContext);

    const handleLogout = () => {
        tenantLogout();
    };

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [propertyDet, setProperty] = useState([]);
    const [tenant, setTenant] = useState([]);

    const fetchInfo = () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/property/${tenantUser.propertyId}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setProperty(d))
            .catch((error) => {
                console.error("Error fetching data:", error);
                // Retry after a delay
                setTimeout(fetchInfo, 2000); // Retry after 2 seconds
            });
    };

    const fetchLandLord = () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/landlord/${tenantUser.landlordId}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setData(d));
    };

    const fetchTenant = () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/tenant/${tenantUser.id}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setTenant(d));
    };


    const handleAddComplaint = (e) => {
        e.preventDefault();
        navigate("/raiseComplaint", { state: { to: tenantUser.landlordId, from: tenantUser.id } });
    }

    useEffect(() => {
        fetchInfo();
        fetchLandLord();
        fetchTenant();
    }, [tenant.rentPaid]);
    if (tenantUser) {
        return (
            <div>
                <NavBar />
                <div className="container-fluid bg-light py-3">
                    <h1 className="fw-bold ms-5 my-4">Dashboard</h1>
                    <div className="row justify-content-center gx-0">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-6 mb-4">
                                    <div className="card border-0 shadow">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <FaMoneyBillAlt className="icon" />
                                                <span>Rent Due</span>
                                            </h5>
                                            <hr className="my-4" />
                                            {tenant.rentPaid ? (
                                                <p className="text-success">Rent is up to date</p>
                                            ) : (
                                                <p className="text-danger">Rent due: {tenant.rentDue}</p> 
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-4">
                                    <div className="card border-0 shadow">
                                        {/* <img src={LandLord} className="card-img-top" alt="Landlord" /> */}
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <FaUser className="icon" />
                                                Landlord Details</h5>
                                            <hr className="my-4" />
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <p>{data.name}</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <p>{data.email}</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Phone</label>
                                                <p>{data.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow">
                                {/* <img src={PropertyImg} className="card-img-top" alt="Property" /> */}

                                <div className="card-body" >
                                    <h5 className="card-title">
                                        <FaHome className="icon" />
                                        Property Details</h5>
                                    <hr className="my-4" />

                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <p>{propertyDet.name}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Type</label>
                                        <p>{propertyDet.type}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Rent</label>
                                        <p>{propertyDet.rent}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <p>{propertyDet.city}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <p>{propertyDet.address}</p>
                                    </div>
                                    <button className="btn btn-warning" onClick={(e) =>
                                        handleAddComplaint(e)
                                    }>Raise Complaint</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Sign In</h1>;
    }
};

export default TenantDashboard;


