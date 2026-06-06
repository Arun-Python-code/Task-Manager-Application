import React, { useEffect } from "react";
import { useActionState } from "react";
import cloud from "./assets/cloud.jpg";
import appleLogo from "./assets/apple-logo.png";
import googleIcon from "./assets/google-icon.png";
import linkedinIcon from "./assets/linkedin-icon.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import backgroundImage from "./assets/background.jpg";
import { NavLink, useNavigate } from "react-router-dom";

export default function Loginpage() {
  async function LoginCheck(_, fromData) {
    const json = Object.fromEntries(fromData.entries());
    const res = await fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(json),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("username", data.username);
    }
    return data.message ? "login successful" : "Login failed";
  }

  const [message, fromaction, isPending] = useActionState(LoginCheck, "");
  const navigate = useNavigate();
  useEffect(() => {
    if (message === "login successful") {
      navigate("/dashboard");
    }
  }, [message]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(20, 20, 20, 0.32)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      <div
        className="container col-4"
        style={{
          padding: "30px",
          borderRadius: "30px",
          backgroundColor: "rgba(20, 20, 20, 0.32)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div className="row">
          <header
            className="col-12 d-flex justify-content-center"
            style={{ color: "white" }}
          >
            Welcome back
          </header>

          <div className="d-flex justify-content-center text-white">
            <p>Please enter your details to sign in</p>
          </div>
        </div>

        <div className="d-flex justify-content-between gap-1">
          <a
            href=""
            className="btn col-4"
            style={{
              border: "1px solid rgba(238, 229, 229, 0.2)",
              borderRadius: "30px",
              backgroundColor: "rgba(17, 17, 17, 0)",
            }}
          >
            <img src={appleLogo} alt="" style={{ width: "30px" }} />
          </a>

          <a
            href=""
            className="btn col-4"
            style={{
               border: "1px solid rgba(238, 229, 229, 0.2)",
              borderRadius: "30px",
              backgroundColor: "rgba(15, 12, 12, 0.07)",
            }}
          >
            <img src={googleIcon} alt="" style={{ width: "30px" }} />
          </a>

          <a
            href=""
            className="btn col-4"
            style={{
              border: "1px solid rgba(238, 229, 229, 0.2)",
              borderRadius: "30px",
              backgroundColor: "rgba(15, 12, 12, 0.07)",
            }}
          >
            <img src={linkedinIcon} alt="" style={{ width: "30px" }} />
          </a>
        </div>

        <div className="d-flex align-items-center" style={{ color: "white" }}>
          <hr className="flex-grow-1" />
          <p className="mx-2 mt-3">OR</p>
          <hr className="flex-grow-1" />
        </div>

        <form className="mt-2" action={fromaction}>
          <div className="form-group" style={{ color: "white" }}>
            <label htmlFor="username">User Name</label>

            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="username"
              name="username"
            />
          </div>

          <div className="form-group" style={{ color: "white" }}>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password@123"
              name="password"
            />
          </div>

          <div className="d-flex justify-content-between">
            <div style={{ color: "white" }}>
              <input type="checkbox" id="remember" />

              <label htmlFor="remember">Remember me</label>
            </div>

            <div>
              <a
                href=""
                className="text-decoration-none"
                style={{ color: "white" }}
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="btn bg-primary mt-2 col-12 text-white"
          >
            {isPending ? "logging in..." : "Login"}
          </button>

          <div className="d-flex justify-content-center text-white">
            <p>Don't have an account yet?&nbsp;&nbsp;&nbsp;</p>

            <NavLink
              to="/"
              className="text-decoration-none"
              style={{ color: "rgb(11, 124, 245)" }}
            >
              Sign up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
