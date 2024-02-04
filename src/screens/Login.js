import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PORT_URL } from "../url_constant";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    let response;
    try {
      response = await fetch(`${PORT_URL}/api/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("enter valid creds");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);

      navigate("/");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
            style={{ zIndex: "1000 !important" }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">
          New user?
        </Link>
      </form>
    </div>
  );
}
