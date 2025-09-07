import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../utility/axios-client";

export default function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axiosClient.get("/user").then((response) => {
      setUsers(response.data.data);
      setLoading(false);
    });
  }

  const onDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    setLoading(true);

    axiosClient.delete(`/user/${id}`).then((response) => {
      getUsers();
    });

    setLoading(false);

    // TODO: success notification
  };

  return (
    <div>
      <h1>Users</h1>

      <Link to="/users/create" className="btn btn-add float-end">
        Create User
      </Link>

      <br />

      <table className="table mt-30 animated fadeInDown">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">
                <div className="row-placeholder"></div>
                <div className="row-placeholder"></div>
                <div className="row-placeholder"></div>
              </td>
            </tr>
          ) : (
            users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/users/${user.id}`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
