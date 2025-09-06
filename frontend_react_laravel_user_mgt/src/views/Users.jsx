import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../utility/axios-client";

export default function Users() {
  const [users, setUsers] = useState();

  useEffect(() => {
    axiosClient.get("/user").then((response) => {
      setUsers(response.data.data);
    });
    
  }, []);

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
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/${user.id}`} className="btn btn-edit">
                  Edit
                </Link>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
