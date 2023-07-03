import React, { useContext, useState } from 'react';
import NavBar from '../../../components/NavBar-Main/Navbar';
import { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const RaiseComplaint = ({ landlordId,tenantId }) => {

    const {user,tenantUser} = useContext(AuthContext)

  const [data, setData] = useState({
    title:"",
    message:"",
    to:"",
    from:"",
    active:""
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      if (location.state && location.state.to && location.state.from) {
          const to = location.state.to;
          const from = location.state.from;
          setData({
              to: to,
              from: from,
          });
      }
  }, [location.state]);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(
        data.title + ", " + data.message + ", " + data.from + ", " + data.to
    );
    const response = await fetch(
          `https://houserentalapi-production.up.railway.app/api/notice/add`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  title: data.title,
                  content: data.message,
                  to: data.to,
                  from: data.from,
                  active: true,
                }),
            }
    );
    const dataJson = await response.json();
    console.log(dataJson);
    setData({ title: "", content: "", to: "", from: "", active: "" });
    if(user) navigate("/complaints");
    else navigate("/tenant/complaints");
};

  return (
      <div>
          <NavBar />
          <div className="mx-auto w-50 p-5 border border-3 mt-5">
              <h2 className="text-center fw-semibold mb-5">Raise Complaint</h2>
              <form onSubmit={handleSubmit}>
                  <div class="form-floating mb-3">
                      <input
                          type="text"
                          class="form-control"
                          id="title"
                          name="title"
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">Title</label>
                  </div>
                  <div class="form-floating mb-3">
                      <textarea
                          class="form-control"
                          placeholder="Leave a comment here"
                          id="message"
                          name="message"
                          onChange={handleChange}
                          required
                      ></textarea>
                      <label for="floatingTextarea">Comments</label>
                  </div>

                  <div className="form-group">
                      <button
                          type="submit"
                          className="btn btn-primary btn-block"
                      >
                          Send
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
};

export default RaiseComplaint;
