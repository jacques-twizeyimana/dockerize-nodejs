import { NavLink, useNavigate } from "react-router-dom";
import svg from "../assets/svg.png";
import { useState, useEffect } from "react";
import backend from "../services/apis";
import toast from "react-hot-toast";

function Login() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log(userData);
  //   }, [userData]);

  const handleLogin = (e) => {
    e.preventDefault();

    toast.promise(backend.login(userData), {
      loading: "Logging in ...",
      success: (response) => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
        return "Loggined successfully";
      },
      error: (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return message;
      },
    });
  };

  return (
    <div id="Login">
      <div className="flex">
        <div className="centered">
          <form onSubmit={handleLogin}>
            <div className="title">Login</div>
            <div className="subtitle flex">
              Don't have an account?
              <NavLink to="/register" className="link">
                Register
              </NavLink>
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
                required
                type="email"
                placeholder="Enter email"
                id="email"
              />
            </div>
            <div className="input-container">
              <label htmlFor="pswd">Password</label>
              <input
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                required
                type="password"
                placeholder="Enter password"
                id="pswd"
              />
            </div>
            <div className="input-container">
              <input type="submit" value="Signin" />
            </div>
          </form>
        </div>
        <div className="img-container">
          <img className="auth-img" src={svg} />
        </div>
      </div>
    </div>
  );
}

export default Login;
