import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { Axios } from "axios";
import { FaEdit, FaTrash, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete this user?");
    if (confirm) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((res) => {
          location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-capitalize">List of users</h1>
      <div className="d-flex justify-content-end w-75">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
      </div>
      <div className="w-75 rounded bg-white border shadow p-4">
        <table className="table table-stried">
          <thead className="">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-sm btn-info d-inline-flex justify-content-center
                  align-items-center mx-2 text-light"
                  >
                    <FaBook />
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-primary d-inline-flex justify-content-center
                  align-items-center mx-2"
                  >
                    <FaEdit />
                  </Link>
                  <Link
                    className="btn btn-sm btn-danger d-inline-flex justify-content-center
                  align-items-center"
                    onClick={(e) => handleDelete(d.id)}
                  >
                    <FaTrash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
