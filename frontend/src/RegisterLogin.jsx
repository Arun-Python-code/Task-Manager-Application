import React from "react";
import { useActionState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import backgroundImage from "./assets/register-background.jpg";

export default function RegisterLogin() {
  const navigate = useNavigate();
  // Action function to handle registration
  async function registerAction(_, formData) {
    const json = Object.fromEntries(formData.entries());

    const res = await fetch("http://127.0.0.1:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });

    const data = await res.json();
    // If registration is successful, store the username and navigate to the dashboard
    if (res.ok) {
      localStorage.setItem("username", data.username);
      navigate("/dashboard");
    }
    return data.message ? "Registration successful" : "Registration failed";
  }

  const [message, formAction, isPending] = useActionState(registerAction, "");

  return (
    <div
      className="bg-light d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="card p-4 shadow rounded-4"
        style={{
          width: "30%",
          borderRadius: "30px",
          backgroundColor: "rgba(20, 20, 20, 0.32)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <h2 className="text-center mb-3 text-white">Sign Up</h2>

        <form action={formAction}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">
              Full Name
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Confirm Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
            />
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary w-100"
          >
            {isPending ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-white">
          Already have an account?{" "}
          <NavLink to="/login" className="text-decoration-none ">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
