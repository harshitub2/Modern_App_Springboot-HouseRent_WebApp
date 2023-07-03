import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import NavBar from "../../components/NavBar-Main/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext,useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Property = () => {

    const [data, setData] = useState([]);
    const [tenant, setTenant] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchInfo = () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/landlord/get/properties/${user.id}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setData(d))
            .catch((error) => {
                console.error("Error fetching data:", error);
                // Retry after a delay
                setTimeout(fetchInfo, 2000); // Retry after 2 seconds
            });
    };

    const fetchTenant = () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/landlord/get/tenants/${user.id}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setTenant(d));
    };
    
    const handleAddTenant = (e, propertyIdForTenant) =>{
        e.preventDefault();
        navigate("/addtenant", { state: { propertyId: propertyIdForTenant } });
    }

    const handleAddComplaint=(e,tenantId)=>{
        e.preventDefault();
        navigate("/raiseComplaint", { state: { to: tenantId, from:user.id } });
    }

    const handleDeleteTenant=(e,tenantId)=>{
        e.preventDefault();
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/tenant/delete/${tenantId}`;
        return fetch(apiUrl, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((d) => setTenant(d));

    }
    const handlePayRent = (e, tenantId) => {
        e.preventDefault();
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/tenant/paid/${tenantId}`;
        return fetch(apiUrl, {
            method: "POST",
        })
            .then((res) => res.json());
    };

    const handleRemoveProperty=(e, propertyId)=>{
        e.preventDefault();
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/property/delete/${propertyId}`;
        return fetch(apiUrl, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((d) => setData(d));
    }

    useEffect(() => {
        fetchInfo();
        fetchTenant();
    }, [data, tenant]);

    return (
        <div >
      <NavBar />
        <>
                <h2 className="px-5 pt-5">Properties</h2>
                <div className="row px-4 gx-0">
                {data.length > 0 ? (
                    <>
                    {data.map((dataObj,index)=>{
                        return (
                            <>
                                <div className="col-sm-12 col-md-6 col-lg-4 mb-3 my-3">
                                    <div className="px-2">
                                    <div className="card">
                                        <div
                                            className="card-header d-flex"
                                            key={index}
                                        >
                                            Property No : {index + 1}
                                            {dataObj.tenantId ? (
                                                <div className="badge text-bg-success ms-auto">
                                                    Rented
                                                </div>
                                            ) : (
                                                <div className="badge text-bg-danger ms-auto">
                                                    Not Rented
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title text-black fw-bold">
                                                {dataObj.name
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    dataObj.name.slice(1)}{" "}
                                                - {dataObj.type}
                                            </h4>
                                            <h5 className="fw-semibold">
                                                Current Rent:{" "}
                                                <span className="text-success">
                                                    {dataObj.rent}
                                                </span>
                                            </h5>
                                            <h6 className="fw-semibold">
                                                Address:{" "}
                                            </h6>
                                            <p className="card-text">
                                                {dataObj.city
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    dataObj.city.slice(1)}
                                                ,{" "}
                                                {dataObj.address
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    dataObj.address.slice(1)}
                                            </p>
                                            <hr />
                                            <h5 className="fw-semibold">
                                                Tenant Details
                                            </h5>
                                            {dataObj.tenantId ? (
                                                <>
                                                    {tenant
                                                        .filter(
                                                            (tenantObj) =>
                                                                tenantObj.propertyId ===
                                                                dataObj.id
                                                        )
                                                        .map(
                                                            (
                                                                filteredTenant,
                                                                index2
                                                            ) => (
                                                                <>
                                                                    <p className="card-text m-0">
                                                                        Name:{" "}
                                                                        <span className="fw-semibold">{filteredTenant.name
                                                                            .charAt(0).toUpperCase() +
                                                                            filteredTenant.name.slice(1)}
                                                                        </span>
                                                                    </p>
                                                                    <p className="card-text m-0">
                                                                        Email:{" "}
                                                                        <span className="">{filteredTenant.email}
                                                                        </span>
                                                                    </p>
                                                                    <p className="card-text m-0">
                                                                        Phone:{" "}
                                                                        <span className="">{filteredTenant.phone}
                                                                        </span>
                                                                    </p>
                                                                    <p className="card-text m-0">
                                                                        Rent Paid:{" "}
                                                                        <span className="fw-semibold">
                                                                            {filteredTenant.rentPaid ? (
                                                                                <span className="text-success">
                                                                                    Yes
                                                                                </span>
                                                                            ) : (
                                                                                <span className="text-danger">
                                                                                    No
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </p>
                                                                    <p className="card-text m-0">
                                                                        Rent Due:{" "}
                                                                        <span className="fw-semibold">
                                                                            {filteredTenant.rentPaid ? (
                                                                                <span className="text-success">
                                                                                    0
                                                                                </span>
                                                                            ) : (
                                                                                <span className="text-danger">
                                                                                    {filteredTenant.rentDue}
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </p>
                                                                    {filteredTenant.rentPaid ? (
                                                                        <button
                                                                            className="btn btn-warning m-2"
                                                                            onClick={(e) =>
                                                                                handlePayRent(e,dataObj.tenantId)
                                                                            }
                                                                        >
                                                                            Reset Rent Status
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="btn btn-success m-2"
                                                                            onClick={(e) =>
                                                                                handlePayRent(e,dataObj.tenantId)
                                                                            }
                                                                        >
                                                                            Mark Rent as Paid
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )
                                                        )}
                                                    <button
                                                        className="btn btn-warning m-2"
                                                        onClick={(e) =>
                                                            handleAddComplaint(e,dataObj.tenantId)
                                                        }
                                                    >
                                                        Raise Complaint
                                                    </button>
                                                    <button
                                                        className="btn btn-danger m-2"
                                                        onClick={(e) =>
                                                            handleDeleteTenant(e,dataObj.tenantId)}
                                                    >
                                                        Remove Tenant
                                                    </button>
                                                    <button
                                                        className="btn btn-danger m-2"
                                                        onClick={(e) =>
                                                            handleRemoveProperty(e,dataObj.id)
                                                        }
                                                    >
                                                        Remove Property
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        onClick={(e) =>
                                                            handleAddTenant(e,dataObj.id)
                                                        }
                                                        className="btn btn-primary m-2"
                                                    >
                                                        Add Tenant here
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger m-2"
                                                        onClick={(e) =>
                                                            handleRemoveProperty(e,dataObj.id)
                                                        }
                                                    >
                                                        Remove Property
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </>
                        );
                    })}
                </>):
                (
                    <h3>No properties yet</h3>
                )}
                </div>
        </>
        </div>
    );
};

export default Property;
