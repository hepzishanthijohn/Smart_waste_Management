import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './Login.css';
import { useFormik } from "formik"; // Import Formik hook
import * as Yup from "yup"; // Import Yup for validation
import recycleImage from '../../../assets/images/swmsimg.avif'; // Import the logo image
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios for API call
import {jwtDecode} from 'jwt-decode'; // Import JWT Decode for token

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State for loading indication
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true); // Show loading spinner while making the request
      setErrorMessage(""); // Reset error message

      // Make the API request to authenticate the user
      axios
        .post("http://localhost:5003/auth/login", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;
          localStorage.setItem("userToken", data.token); // Store JWT in localStorage

          // Decode the token and navigate to the dashboard
          const decoded = jwtDecode(data.token);
          console.log("Decoded Token:", decoded);

          // Redirect to the admin dashboard
          navigate("/waste-status");
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response && error.response.status === 400) {
            setErrorMessage("*Invalid email or password"); // Show error message
          } else {
            setErrorMessage("An error occurred. Please try again later.");
          }
        })
        .finally(() => {
          setIsLoading(false); // Hide loading spinner after the request is complete
        });
    },
  });

  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src={recycleImage}
                          style={{ width: "185px" }}
                          alt="Logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                      </div>

                      {/* Show error message if any */}
                      {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                      <h3 className="fw-normal mb-2 pb-4" style={{ fontSize: "19px" }}>Sign into your account</h3>

                      <form onSubmit={formik.handleSubmit}>
                        <p>Please login to your account</p>

                        {/* Display Formik error messages */}
                        {formik.errors.email && formik.touched.email && (
                          <p className="error-message">{formik.errors.email}</p>
                        )}
                        {formik.errors.password && formik.touched.password && (
                          <p className="error-message">{formik.errors.password}</p>
                        )}

                        {/* Email field */}
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Phone number or email address"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="form-label" htmlFor="email">Email</label>
                        </div>

                        {/* Password field */}
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="form-label" htmlFor="password">Password</label>
                        </div>

                        {/* Submit button */}
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                            disabled={formik.isSubmitting || isLoading} // Disable when loading or submitting
                          >
                            {isLoading ? "Loading..." : "Log in"}
                          </button>
                          <a className="text-muted" href="#!">Forgot password?</a>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => navigate("/register")} // Navigate to registration page
                          >
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right side section with additional information */}
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
