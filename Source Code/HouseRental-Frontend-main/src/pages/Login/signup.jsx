  import React, { useContext, useState } from 'react';
  import { Link } from 'react-router-dom';
  import { AuthContext } from '../../context/AuthContext';
  import './SignUp.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.min.js';
  
  
  export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    const { signup } = useContext(AuthContext);
  
    const handleSubmit = (event) => {
      event.preventDefault();

      if (password !== confpassword) {
        alert("Passwords do not match");
        return;
      }

      const userData = {
        name,
        phone,
        email,
        password,
      };
      
      signup(userData);
    };
  
    return (
        <div>
            <div className="mx-auto w-50 p-5 border border-3 mt-5">
                <h2 className="text-center fw-semibold mb-5">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            onChange={(event) => setName(event.target.value)}
                            placeholder="name@example.com"
                            required
                        />
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="phone"
                            name="phone"
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="name@example.com"
                            required
                        />
                        <label for="name">Phone</label>
                    </div>
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
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="name@example.com"
                            required
                        />
                        <label for="name">Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            type="password"
                            class="form-control"
                            id="confpassword"
                            name="confpassword"
                            onChange={(event) =>
                                setConfPassword(event.target.value)
                            }
                            placeholder="name@example.com"
                            required
                        />
                        <label for="name">Confirm Password</label>
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center">
                        Already have an account?{" "}
                        <Link to="/signin">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
  }
  