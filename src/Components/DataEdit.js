import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export const DataEdit = () => {
  const navigate = useNavigate();

  let [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  let { idno } = useParams(); // get parameter values with destructuring..

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3005/users/${idno}`)
  //     .then((result) => setUserData(result.data));
  // }, []);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      {axios.get(`http://localhost:3005/users/${idno}`).then((res) => setUserData(res.data));}
  });

  let formDataHandling = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // let submitHandler = (e) => {
  //   e.preventDefault(); // to prevent the page refreshing...

  //   var formData = {
  //     name: `${userData.name}`,
  //     email: `${userData.email}`,
  //     phone: `${userData.phone}`,
  //   };

  //   // for redirection to other page after submission..
  //   axios
  //     .put(`http://localhost:3005/users/${idno}`, formData)
  //     .then(() => {
  //       window.alert(".....Update Successful.....");
  //       navigate("/user-details");
  //     })
  //     .catch((err) => err);
  // };

  const mutation = useMutation({
    mutationFn: (updateUser) => {
      return axios
        .post(`http://localhost:3005/users/${idno}`, updateUser)
        .then(() => {
          window.alert(".....Update Successful.....");
          navigate("/user-details");
        })
        .catch((err) => err);
    },
  });

  const submitHandler = (e) => {
    // setUserData(data)
    e.preventDefault();
    let formData = {
      name: `${userData.name}`,
      email: `${userData.email}`,
      phone: `${userData.phone}`,
    };

    mutation.mutate(formData);
  };

  // destructuring
  var { name, email, phone } = userData;
  return (
    <>
      <br />
      &nbsp;&nbsp;
      <Link to="/user-details" className="btn btn-primary"> Go Back </Link>
      &nbsp;
      <h1 className="text-primary py-3 text-center">Update User Details</h1>
      <div className="container p-5">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            {/* <label className="form-label">Id</label>
        <input type="number" className="form-control" value={id} /><br/> */}
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={formDataHandling}
              name="name"
            />
            <br />
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={formDataHandling}
              name="email"
            />
            <br />
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={formDataHandling}
              name="phone"
            />
            <br />
            <button type="submit" className="btn btn-warning mb-3">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
