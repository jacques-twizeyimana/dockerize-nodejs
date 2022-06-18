import { NavLink, useNavigate } from "react-router-dom";
import svg from "../assets/svg.png";
import { useState, useEffect } from "react";
import backend from "../services/apis";
import toast from "react-hot-toast";

function Register() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log(userData);
  //   }, [userData]);

  const handleLogin = (e) => {
    e.preventDefault();

    toast.promise(backend.register(userData), {
      loading: "Registering user ...",
      success: (response) => {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return "User Registered successfully";
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
    <div id="register">
      <div className="flex">
        <div className="centered">
          <form onSubmit={handleLogin}>
            <div className="title">Sign Up</div>
            <div className="subtitle flex">
              Already have an account?
              <NavLink to="/login" className="link">
                Login
              </NavLink>
            </div>
            <div className="input-container">
              <label htmlFor="fname">First name</label>
              <input
                onChange={(e) => {
                  setUserData({ ...userData, firstName: e.target.value });
                }}
                required
                type="text"
                placeholder="Enter first name"
                id="fname"
              />
            </div>
            <div className="input-container">
              <label htmlFor="lname">Last name</label>
              <input
                onChange={(e) => {
                  setUserData({ ...userData, lastName: e.target.value });
                }}
                required
                type="text"
                placeholder="Enter last name"
                id="lname"
              />
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
              <label htmlFor="male">Gender</label>
              <div className="flex">
                <div className="flex">
                  {" "}
                  <input
                    onChange={(e) => {
                      setUserData({ ...userData, gender: e.target.value });
                    }}
                    required
                    value="male"
                    type="radio"
                    name="gender"
                    id="male"
                  />
                  <label className="mt-2" htmlFor="gender">
                    Male
                  </label>
                </div>
                <div className="flex ml-auto">
                  <input
                    required
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    onChange={(e) => {
                      setUserData({ ...userData, gender: e.target.value });
                    }}
                  />
                  <label className="mt-2" htmlFor="gender">
                    Female
                  </label>
                </div>
              </div>
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
              <input type="submit" value="Sign Up" />
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

export default Register;
