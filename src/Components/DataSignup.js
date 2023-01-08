import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const DataSignup = () => {
  const navigate = useNavigate();

  let [userData, setuserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender:""
  });

  var { name, email, phone, gender } = userData;

  let formDataHandling = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  // let submitHandler = (
  // ) => {
  //   e.preventDefault(); // to prevent the page refreshing...

  //   var formData = {
  //     name: `${userData.name}`,
  //     email: `${userData.email}`,
  //     phone: `${userData.phone}`,
  //   };

  //   axios.post(`http://localhost:3005/users`, formData).then(() => {
  //navigate('/user-details);
  //   });
  // };

  const mutation = useMutation({
    mutationFn: (newUser) => {
      return axios
        .post("http://localhost:3005/users", newUser)
        .then(() => {
          window.alert(".....Account Created.....");
          navigate("/user-details");
        })
        .catch((err) => err);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = {
      name: `${userData.name}`,
      email: `${userData.email}`,
      phone: `${userData.phone}`,
      gender:`${userData.gender}`
    };

    mutation.mutate(formData);
  };

  return (
    <>
      <div className="container mt-3">
        <h3
          className="text-primary text-left p-3"
          style={{ marginLeft: "100px" }}
        >
          User Registration Form
        </h3>
        <div className="mb-3 w-50 mx-auto my-5">
          <form onSubmit={submitHandler}>
            <input
              className="form form-control"
              placeholder="Username"
              style={{ width: "80%" }}
              value={name}
              onChange={formDataHandling}
              name="name"
            />
            <br />
            <br />
            <input
              className="form form-control"
              placeholder="Email Id"
              style={{ width: "80%" }}
              value={email}
              onChange={formDataHandling}
              name="email"
            />
            <br /> <br />
            <input
              className="form form-control"
              placeholder="Phone"
              style={{ width: "80%" }}
              value={phone}
              onChange={formDataHandling}
              name="phone"
            />
            <br/><br/>
            <div className="space-x-4 mb-2">
              <span>Gender:</span>
              <label className="form-check-label m-2">
                <input
                  name="gender"
                  type="radio"
                  value={"Male"}
                  onChange={formDataHandling}
                  checked={userData.gender === "Male"}
                  className="form-check-input m-1"
                />
                Male
              </label>
              <label className="form-check-label m-2">
                <input
                  name="gender"
                  type="radio"
                  value={"Female"}
                  onChange={formDataHandling}
                  checked={userData.gender === "Female"}
                  className="form-check-input m-1"
                />
                Female
              </label>
            </div>
            <br /> <br />
            <button
              style={{ marginLeft: "120px" }}
              type="submit"
              className="btn btn-primary p-2"
            >
              Create Account
            </button>
            {/* <br/><br/> <span className='text-primary' style={{marginLeft:"70px"}}>You May Signup using Google Account</span><br/><br/> */}
          </form>
        </div>
      </div>
    </>
  );
};
