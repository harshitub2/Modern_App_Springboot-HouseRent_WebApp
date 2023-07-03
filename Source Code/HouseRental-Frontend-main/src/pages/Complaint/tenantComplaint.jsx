import React, { useState, useEffect, useContext } from "react";
import "./ComplaintsPage.css";
import ComplaintCard from "../../components/ComplaintCard";
import NavBar from "../../components/NavBar-Main/Navbar";
import { AuthContext } from "../../context/AuthContext";

const TenantComplaint = () => {
    const [activeTab, setActiveTab] = useState("incoming");
    const { tenantUser } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [landlord, setLandlord] = useState([]);

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
    const fetchLandLord = () => {
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/landlord/${tenantUser.landlordId}`;
        return fetch(apiUrl, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((d) => setLandlord(d))
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        fetchInfo();
        fetchLandLord();
    },[data]);

    if (tenantUser) {
        return (
            <div>
            <NavBar />
            <div className="main-content">
                <h2 className="px-5 pt-5">Complaints</h2>
                <div className="complaints-page">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === "incoming" ? "active" : ""
                                }`}
                            onClick={() => handleTabClick("incoming")}
                        >
                            Incoming
                        </button>
                        <button
                            className={`tab ${activeTab === "outgoing" ? "active" : ""
                                }`}
                            onClick={() => handleTabClick("outgoing")}
                        >
                            Outgoing
                        </button>
                    </div>
                    <div className="complaints-container">
                        {activeTab === "incoming" &&
                            data.map((complaint) =>
                                complaint.to === tenantUser.id &&
                                    tenantUser.id ? (
                                    <ComplaintCard
                                        key={complaint.id}
                                        title={complaint.title}
                                        message={complaint.content}
                                        status={complaint.active}
                                        from={
                                            landlord.name
                                        }
                                        to={tenantUser.name}
                                    />
                                ) : null
                            )}
                        {activeTab === "outgoing" &&
                            data.map((complaint) =>
                                complaint.from === tenantUser.id &&
                                    tenantUser.id ? (
                                    <ComplaintCard
                                        key={complaint.id}
                                        title={complaint.title}
                                        message={complaint.content}
                                        from={tenantUser.name}
                                        to={landlord.name}
                                        status={complaint.active}
                                    />
                                ) : null
                            )}
                    </div>
                </div>
            </div>
        </div>
        );
    } else {
        return <h1>Sign In</h1>;
    }
};

export default TenantComplaint;
