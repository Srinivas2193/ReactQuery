import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../Services/API/UserData/UserData";
import { QueryKeys } from "../helpers/QueryKeys/QueryKeys";
import { useFormik } from "formik";
import { api } from "../Services/API";

export const UserDetails = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filter, setFilter] = useState({});

  const formik = useFormik({
    initialValues: {
      status: "",
      gender: "",
    },
  });
  // Using Query ....
  const { isLoading, error, data, isFetching, isError } = useQuery({
    queryKey: [QueryKeys.ProfilesGet, pagination, filter],
    queryFn: () =>
      getUsers(pagination.page, pagination.limit, filter).then(
        (res) => res.data
      ),
    keepPreviousData: true,
  });

  const deletePost = useMutation((id) => {
    if (window.confirm(`Delete the Selected Record ${id}`)) {
      return api.delete(`/users/${id}`);
    }
    // isFetching();
    data();
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // let DeleteHandler = (id) => {
  //   if (window.confirm(`Delete the Selected Record ${id}`)) {
  //     //delete the selcted record
  //     // axios.delete(`http://localhost:3005/users/${id}`);
  //     // // fetch the rest of the data..
  //     // isFetching();
  //     // // data();
  //     deleteUsers(`/users/${id}}`);
  //     isFetching();
  //   }
  // };

  const handleApplyFilter = () => {
    const status = formik.values.status;
    const gender = formik.values.gender;
    const filterData = {};
    if (status) {
      filterData.status = status;
    }
    if (gender) {
      filterData.gender = gender;
    }
    setFilter(filterData);
  };

  const handleClearFilter = () => {
    setFilter({});
    formik.resetForm();
  };

  if (isError) {
    return <div>something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="container p-5">
          <div>{isFetching ? "Updating..." : ""}</div>
          <h1 className="text-center text-secondary">
            FETCH RESTAPI DATA FROM GLOBAL URL/ CLIENT{" "}
          </h1>
          {/* <div className="mt-3 d-flex flex-row justify-content-center gap-3 p-3 ml-5">
            <input
              type="text"
              className="form form-control w-50"
              name="search"
              value={search}
              onChange={formDataHandling}
            />
            <button type="button" onClick={searchHandler} className="btn btn-primary">search</button>
          </div> */}
          <div className="mb-4">
            <p className="mb-2">Profiles Filters</p>
            <div className="space-x-4 mb-2">
              <span>Status:</span>
              <label className="form-check-label m-2">
                <input
                  name="status"
                  type="radio"
                  value={"Unverified"}
                  onChange={formik.handleChange("status")}
                  checked={formik.values.status === "Unverified"}
                  className="form-check-input m-1"
                />
                InActive
              </label>
              <label className="form-check-label m-2">
                <input
                  name="status"
                  type="radio"
                  value={"Under Review"}
                  onChange={formik.handleChange("status")}
                  checked={formik.values.status === "Under Review"}
                  className="form-check-input m-1"
                />
                Under Review
              </label>
              <label className="form-check-label m-2">
                <input
                  name="status"
                  type="radio"
                  value={"Active"}
                  onChange={formik.handleChange("status")}
                  checked={formik.values.status === "Active"}
                  className="form-check-input m-1"
                />
                Active
              </label>
              <label className="form-check-label m-2">
                <input
                  name="status"
                  type="radio"
                  value={"Terminated"}
                  onChange={formik.handleChange("status")}
                  checked={formik.values.status === "Terminated"}
                  className="form-check-input m-1"
                />
                Terminated
              </label>
            </div>
            <div className="mb-2">
              <span>Gender:</span>
              <label className="form-check-label m-2">
                <input
                  name="gender"
                  type="radio"
                  value={"Male"}
                  onChange={formik.handleChange("gender")}
                  checked={formik.values.gender === "Male"}
                  className="form-check-input m-1"
                />
                Male
              </label>
              <label className="form-check-label m-2">
                <input
                  name="gender"
                  type="radio"
                  value={"Female"}
                  onChange={formik.handleChange("gender")}
                  checked={formik.values.gender === "Female"}
                  className="form-check-input m-1"
                />
                Female
              </label>
            </div>
            <button className="btn btn-primary" onClick={handleApplyFilter}>
              Apply Filter
            </button>
            <button className="btn btn-primary m-1" onClick={handleClearFilter}>
              Clear Filter
            </button>
          </div>
          <table className="table table-dark table-bordered my-2">
            <thead className="table table-light">
              <tr>
                <th>Sno</th>
                <th>User Id</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>Gender</th>
                <th>Status</th>
                <th colSpan="3" className="text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((res, i) => {
                return (
                  <tr key={i}>
                    <td> {i + 1} </td>
                    <td> U - {res.id} </td>
                    <td> {res.name} </td>
                    <td> {res.email} </td>
                    <td> {res.phone} </td>
                    <td> {res.gender} </td>
                    <td> {res.status} </td>

                    <td>
                      <Link
                        to={`/user-details/view/${res.id}`}
                        className="btn btn-primary "
                      >
                        View
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/user-details/edit/${res.id}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => deletePost.mutate(res.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-flex flex-row justify-content-start g-3">
            <span className="m-2">Rows Per Page</span>
            <select
              className="form-select m-2"
              onChange={(e) =>
                setPagination((old) => ({ ...old, limit: e.target.value }))
              }
              value={pagination.limit}
              style={{ width: "10px", height: "26px" }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
            <button
              className="page-item btn btn-warning m-2"
              onClick={() =>
                setPagination((old) => ({
                  ...old,
                  page: Math.max(old.page - 1, 1),
                }))
              }
            >
              previous
            </button>
            <button
              className="page-item btn btn-primary m-2"
              onClick={() =>
                setPagination((old) => ({ ...old, page: old.page + 1 }))
              }
            >
              next
            </button>
          </div>
        </div>
      )}
    </>
  );
};
