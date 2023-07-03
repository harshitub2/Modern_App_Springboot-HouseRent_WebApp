import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import SignUp from "./pages/Login/signup";
import SignIn from "./pages/Login/signin";
import SigninTenant from "./pages/Login/signinTenant";
import Property from "./pages/Property/Property";
import ComplaintsPage from "./pages/Complaint/ComplaintsPage";
import AddProperty from "./pages/Forms/addProperty/addProperty";
import RaiseComplaint from "./pages/Forms/raiseComplaint/raiseComplaint";
import AddTenant from "./pages/Forms/AddTenant/addTenant";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from './pages/Dashboard/Dashboard';
import TenantDashboard from "./pages/Dashboard/tenantDashboard";
import TenantComplaint from './pages/Complaint/tenantComplaint';
import NotLoggedIn from './components/NotLoggedin/NotLoggedIn';


function App() {
  return (
      <>
          <Router>
              <AuthProvider>
                  <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/tenant/dashboard" element={<TenantDashboard />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/tenant/signin" element={<SigninTenant />} />
                      <Route path="/property" element={<Property />} />
                      <Route path="/complaints" element={<ComplaintsPage />} />
                      <Route path="/tenant/complaints" element={<TenantComplaint />} />
                      <Route path="/addproperty" element={<AddProperty />} />
                      <Route path="/loggedout" element={<NotLoggedIn />} />
                      <Route
                          path="/raisecomplaint"
                          element={<RaiseComplaint />}
                      />
                      <Route path="/addtenant" element={<AddTenant />} />
                  </Routes>
              </AuthProvider>
          </Router>
      </>
  );
};


export default App;