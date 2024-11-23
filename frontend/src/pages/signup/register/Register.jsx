import React from 'react';
import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik components
import * as Yup from 'yup'; // Import Yup for validation
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API requests

// Validation Schema using Yup
const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name should be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
});

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="vh-100 bg-image" style={{ backgroundImage: "./assets/images/re-bg.avif" }}>
        <div className="mask d-flex align-items-center h-100% gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    {/* Formik form with validation */}
                    <Formik
                      initialValues={{
                        name: '',
                        email: '',
                        password: '',
                      }}
                      validationSchema={RegistrationSchema}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        // Sending the form data to the API
                        axios.post('https://smart-waste-management-3.onrender.com/auth/register', values, {
                          headers: {
                            'Content-Type': 'application/json',
                          }
                        })
                          .then(response => {
                            // Assuming successful registration
                            navigate('/login');
                            setSubmitting(false);
                            resetForm();
                          })
                          .catch(error => {
                            console.error('Error:', error);
                            setSubmitting(false);
                          });
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          {/* Name Field */}
                          <div className="form-outline mb-4">
                            <Field
                              type="text"
                              name="name"
                              className="form-control form-control-lg"
                              placeholder="Enter your name"
                            />
                            <label className="form-label" htmlFor="name">Your Name</label>
                            <ErrorMessage name="name" component="div" className="text-danger" />
                          </div>

                          {/* Email Field */}
                          <div className="form-outline mb-4">
                            <Field
                              type="email"
                              name="email"
                              className="form-control form-control-lg"
                              placeholder="Enter your email"
                            />
                            <label className="form-label" htmlFor="email">Your Email</label>
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </div>

                          {/* Password Field */}
                          <div className="form-outline mb-4">
                            <Field
                              type="password"
                              name="password"
                              className="form-control form-control-lg"
                              placeholder="Enter your password"
                            />
                            <label className="form-label" htmlFor="password">Password</label>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </div>

                          {/* Submit Button */}
                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                              disabled={isSubmitting}
                            >
                              Register
                            </button>
                          </div>

                          {/* Login Redirect */}
                          <p className="text-center text-muted mt-5 mb-0">
                            Have already an account? 
                            <a href="#!" className="fw-bold text-body">
                              <u onClick={() => navigate("/login")}>Login here</u>
                            </a>
                          </p>

                        </Form>
                      )}
                    </Formik>

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

export default Register;
