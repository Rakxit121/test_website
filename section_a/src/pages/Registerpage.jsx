import React, { useState } from "react";
import { toast } from "react-toastify";
import { createUserApi } from "../apis/api";

const Registerpage = () => {
  //useState (Setting input value)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useState (Setting error message)
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // validate input value
  const validate = () => {
    var isValid = true;

    // reset error message
    setFnameError("");
    setLnameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (firstName.trim() === "") {
      setFnameError("First Name is required");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLnameError("Last Name is required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Password and Confirm Password must be the same");
      isValid = false;
    }
    return isValid;
  };

  //function for changing input value
  const changeFirstname = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastname = (e) => {
    setLastName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  //function for button
  const handleSubmit = (e) => {
    e.preventDefault();
    //check if input value is available
    console.log(firstName, lastName, email, password);

    //     //check test api
    // testApi().then((res) => {
    //   console.log(res.data);
    // })

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    //makgin api call
    createUserApi(data)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server error");
        console.log(err.message);
      });
  };

  return (
    <div className="justify-content-center align-items-center vh-100">
      <h1 className="m-4">Create your Account!</h1>
      <form className="m-4 w-25">
        <label>First Name : {firstName}</label>
        <input
          onChange={changeFirstname}
          type="text"
          className="form-control mb-2"
          placeholder="Enter your First Name"
        />
        {fnameError && <p className="text-danger">{fnameError}</p>}
        <label>Last Name : {lastName}</label>
        <input
          onChange={changeLastname}
          type="text"
          className="form-control mb-2"
          placeholder="Enter your Last Name"
        />
        {fnameError && <p className="text-danger">{fnameError}</p>}
        <label>Email</label>
        <input
          onChange={changeEmail}
          type="text"
          className="form-control mb-2"
          placeholder="Enter your Email"
        />
        {fnameError && <p className="text-danger">{fnameError}</p>}
        <label>Password</label>
        <input
          onChange={changePassword}
          type="password"
          className="form-control mb-3"
          placeholder="Enter your Password"
        />
        {fnameError && <p className="text-danger">{fnameError}</p>}
        <label>Confirm Password</label>
        <input
          onChange={changeConfirmPassword}
          type="password"
          className="form-control mb-3"
          placeholder="Confirm your Password"
        />
        {confirmPasswordError && (
          <div className="alert alert-danger" role="alert">
            {confirmPasswordError}
          </div>
        )}
        <button onClick={handleSubmit} className="btn btn-danger w-100 mb-2">
          Create an Account
        </button>
        <a href="" className="text-black text-decoration-none">
          Already have an Account ?
        </a>
      </form>
    </div>
  );
};

export default Registerpage;
