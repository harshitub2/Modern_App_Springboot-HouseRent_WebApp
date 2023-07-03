import React, { useContext } from 'react';
import Logo from "../../Assets/Logo.png";
import Profile from "../../Assets/Profile.png";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css'; // Import the CSS file for NavBar styles
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
    const { user, logout, tenantUser, tenantLogout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.pathname='/';
    }
    const handleTenantLogout = () => {
        tenantLogout();
        window.location.pathname='/';
    }

    if (user) {
        return (

            <Navbar expand="lg" className="slim-navbar">
                <Navbar.Brand href="/dashboard">
                    <img
                        src={Logo}
                        width="150"
                        height="0"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/property">Property</Nav.Link>
                        <Nav.Link href="/complaints">Complaint</Nav.Link>
                        <NavDropdown
                            title={<div>
                                <img src={Profile} alt="Profile" width="40" />
                                <span className="profile-name">{user.name}</span>
                            </div>}
                            id="basic-nav-dropdown"
                            alignRight
                            className="profile-dropdown">
                            <NavDropdown.Item href="/addProperty">Add Property</NavDropdown.Item>
                            {/* <NavDropdown.Item href="/raiseComplaint">Raise Complaint</NavDropdown.Item> */}
                            <NavDropdown.Item href="/reset-password">Reset Password</NavDropdown.Item>
                            <NavDropdown.Item><button onClick={handleLogout} className='btn btn-danger'>Logout</button></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else if (tenantUser) {
        return (
            <Navbar expand="lg" className="slim-navbar">
                <Navbar.Brand href="/dashboard">
                    <img
                        src={Logo}
                        width="150"
                        height="0"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="/tenant/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/tenant/complaints">Complaint</Nav.Link>
                        <NavDropdown
                            title={
                                <div>
                                    <img
                                        src={Profile}
                                        alt="Profile"
                                        width="40"
                                    />
                                    <span className="profile-name">
                                        {tenantUser.name}
                                    </span>
                                </div>
                            }
                            id="basic-nav-dropdown"
                            alignRight
                            className="profile-dropdown"
                        >
                            {/* <NavDropdown.Item href="/raiseComplaint">
                                Raise Complaint
                            </NavDropdown.Item> */}
                            <NavDropdown.Item href="/reset-password">
                                Reset Password
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <button
                                    onClick={handleTenantLogout}
                                    className="btn btn-danger"
                                >
                                    Logout
                                </button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    // else {
    //     return (
    //         <Navbar expand="lg" className="slim-navbar">
    //             <Navbar.Brand href="/dashboard">
    //                 <img
    //                     src={Logo}
    //                     width="150"
    //                     height="0"
    //                     className="d-inline-block align-top"
    //                     alt="Logo"
    //                 />
    //             </Navbar.Brand>
    //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //             <Navbar.Collapse id="basic-navbar-nav">
    //                 <Nav className="ml-auto">
    //                     <Nav.Link href='/signup'><button className='btn btn-outline-primary'>SignUp</button></Nav.Link>
    //                     <Nav.Link href='/signin'><button className='btn btn-primary'>Login</button></Nav.Link>
    //                 </Nav>
    //             </Navbar.Collapse>
    //         </Navbar>
    //     );
    // }
};

export default NavBar;
