import React, { useState } from 'react';
import '../AddTenant/AddTenant.css';
import NavBar from '../../../components/NavBar-Main/Navbar';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [data, setData] = useState({
      name: "",
      type: "",
      city: "",
      address: "",
      rent: "",
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(data.name+data.type+data.city+data.address+data.rent+user.id);
    const response = await fetch(
        `https://houserentalapi-production.up.railway.app/api/property/add`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                type: data.type,
                city: data.city,
                address: data.address,
                rent: data.rent,
                ownerId: user.id,
            }),
        }
    );
        const dataJson = await response.json();
        console.log(dataJson);
        setData({ name: "", type: "", city: "", address: "", rent: "" });
        navigate("/property");   
  };

  return (
      <div>
          <NavBar />
          <div className="mx-auto w-50 p-5 border border-3 mt-5">
              <h2 className="text-center fw-semibold mb-5">Add Property</h2>
              <form onSubmit={handleSubmit} className="my-form">
                  <div class="form-floating mb-3">
                      <input
                          type="text"
                          class="form-control"
                          id="name"
                          name="name"
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">Name</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input
                          type="text"
                          class="form-control"
                          id="type"
                          name="type"
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">Type</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input
                          type="text"
                          class="form-control"
                          id="city"
                          name="city"
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">City</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input
                          type="text"
                          class="form-control"
                          id="address"
                          name="address"
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">Address</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input
                          type="number"
                          class="form-control"
                          id="rent"
                          name="rent"
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">Rent</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                      Submit
                  </button>
              </form>
          </div>
      </div>
  );
};

export default AddProperty;
