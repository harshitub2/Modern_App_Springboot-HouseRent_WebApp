import React, { useState, useEffect, useContext } from "react";
import "./ComplaintsPage.css";
import ComplaintCard from "../../components/ComplaintCard";
import NavBar from "../../components/NavBar-Main/Navbar";
import { AuthContext } from "../../context/AuthContext";
import NotLoggedIn from "../../components/NotLoggedin/NotLoggedIn";

const ComplaintPage = () => {
    const [activeTab, setActiveTab] = useState("incoming");
    const { user, tenantUser } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [tenant, setTenant] = useState([]);

    const fetchInfo = () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/notice/getall`;
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
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/tenant/getall`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setTenant(d));
    };

    const findTenantById = (id) => {
        return tenant.find((tenantObj) => tenantObj.id === id);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        fetchInfo();
        fetchTenant();
    }, [data, tenant]);
    if (user) {

        return (
            <div>
                <NavBar />
                <div className="main-content">
                    <h2 className="px-5 pt-5">Complaints</h2>
                    <div className="complaints-page">
                        <div className="tabs">
                            <button
                                className={`tab ${
                                    activeTab === "incoming" ? "active" : ""
                                }`}
                                onClick={() => handleTabClick("incoming")}
                            >
                                Incoming
                            </button>
                            <button
                                className={`tab ${
                                    activeTab === "outgoing" ? "active" : ""
                                }`}
                                onClick={() => handleTabClick("outgoing")}
                            >
                                Outgoing
                            </button>
                        </div>
                        <div className="complaints-container">
                            {activeTab === "incoming" &&
                                data.map((complaint) =>
                                    complaint.to === user.id &&
                                    findTenantById(complaint.from) ? (
                                        <>
                                            <ComplaintCard
                                                key={complaint.id}
                                                complaintId={complaint.id}
                                                title={complaint.title}
                                                message={complaint.content}
                                                status={complaint.isActive}
                                                from={
                                                    findTenantById(
                                                        complaint.from
                                                    ).name
                                                }
                                                to={user.name}
                                            />
                                        </>
                                    ) : null
                                )}
                            {activeTab === "outgoing" &&
                                data.map((complaint) =>
                                    complaint.from === user.id &&
                                    findTenantById(complaint.to) ? (
                                        <>
                                            <ComplaintCard
                                                key={complaint.id}
                                                complaintId={complaint.id}
                                                title={complaint.title}
                                                message={complaint.content}
                                                status={complaint.active}
                                                from={user.name}
                                                to={
                                                    findTenantById(complaint.to)
                                                        .name
                                                }
                                            />
                                        </>
                                    ) : null
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else{
        <NotLoggedIn/>
    }
};

export default ComplaintPage;
