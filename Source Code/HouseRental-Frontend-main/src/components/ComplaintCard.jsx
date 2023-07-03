import React from "react";
import "../pages/Complaint/ComplaintsPage.css";


const ComplaintCard = ({ complaintId, title, message, status, from, to }) => {
    const noticeResolved = (e, id) => {
        e.preventDefault();
        console.log(id);
        let apiUrl = `https://houserentalapi-production.up.railway.app/api/notice/inactive/${id}`;
        return fetch(apiUrl, {
            method: "GET",
        })
    };
    return (
        <div
            className={`card mb-3 border-2 ${
                !status ? "border-success" : "border-danger"
            }`}
        >
            <div className="card-header d-flex align-items-start">
                <h3 className="card-title mb-0 text-start">{title}</h3>
                {status ? (
                    <button
                        className="btn btn-success btn-sm"
                        onClick={(e) => noticeResolved(e, complaintId)}
                    >
                        Mark as Resolved
                    </button>
                ) : (
                    <>
                            <button
                                className="btn btn-success btn-sm mx-2"
                                disabled
                            >
                                Resolved
                            </button>
                    </>
                )}
            </div>
            <div className="card-body">
                <div className="metadata">
                    <div className="metadata">
                        <span>From:</span>
                        <span className="from">{from}</span>
                    </div>
                    <div className="metadata">
                        <span>To:</span>
                        <span className="to">{to}</span>
                    </div>
                </div>
                <div className="message">{message}</div>
            </div>
        </div>
    );
};

export default ComplaintCard;
