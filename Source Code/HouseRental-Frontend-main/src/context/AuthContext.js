import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [tenantUser, setTenantUser] = useState(() => {
        const storedTenant = localStorage.getItem("tenant");
        return storedTenant ? JSON.parse(storedTenant) : null;
    });

    const navigate = useNavigate();


     const login = (userData) => {
         fetch(
             "https://houserentalapi-production.up.railway.app/api/landlord/login",
             {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(userData),
             }
         )
             .then((response) => {
                 if (response.ok) {
                     return response.json();
                 } else {
                     throw new Error("Login failed");
                 }
             })
             .then((data) => {
                 localStorage.setItem("user", JSON.stringify(data));
                 setUser(data);
                 console.log("Login successful!", data);
                 localStorage.setItem("tenant", null);
                 tenantLogout();
                 navigate("/dashboard");

             })
             .catch((error) => {
                 console.error("Error:", error);
             });
     };
     const signup = (userData) => {
        fetch(
            "https://houserentalapi-production.up.railway.app/api/landlord/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse the response body as JSON
                } else {
                    throw new Error("Registration failed");
                }
            })
            .then((data) => {
                console.log("Registration successful!", data);
                navigate("/signin");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        
    }
    const tenantLogin = (userData) => {
        fetch(
            "https://houserentalapi-production.up.railway.app/api/tenant/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Login failed");
                }
            })
            .then((tenant) => {
                localStorage.setItem("tenant", JSON.stringify(tenant));
                setTenantUser(tenant);
                console.log("Login successful!", tenant);
                localStorage.setItem("user",null);
                logout();
                navigate("/tenant/dashboard");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const tenantLogout = () => {
        // Perform logout logic here and clear the user data
         localStorage.setItem("tenant", null);
        setTenantUser(null);

    };
     const logout = () => {
         // Perform logout logic here and clear the user data
         localStorage.setItem("user", null);
         setUser(null);
     };
     return (
         <AuthContext.Provider value={{ user, tenantUser, login, signup, logout, tenantLogin, tenantLogout }}>
             {children}
         </AuthContext.Provider>
     );
}