import * as React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext"
import { useState } from 'react';

export default function SignIn() {
  
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
        email,
        password
    };

    login(userData);
  };

  return (
      <div>
          <div
              className="mx-auto w-50 p-5 border border-3 mt-5"
          >
              <h2 className="text-center fw-semibold mb-5">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                  <div class="form-floating mb-3">
                      <input
                          type="email"
                          class="form-control"
                          id="email"
                          name="email"
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">Email</label>
                  </div>
                  <div class="form-floating mb-3">
                      <input
                          type="password"
                          class="form-control"
                          id="password"
                          name="password"
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="name@example.com"
                          required
                      />
                      <label for="name">Password</label>
                  </div>
                  <div className="form-group">
                      <button
                          type="submit"
                          className="btn btn-primary btn-block"
                      >
                          Sign In
                      </button>
                  </div>
                  <div className="text-center">
                      Dont have an account? <Link to="/signup">Sign up</Link>
                  </div>
              </form>
          </div>
      </div>
  );
}