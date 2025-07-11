// This file remains largely the same as your last correct version
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Homepage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Failed to fetch users: " + response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error('Error fetching users. Please check server.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
          toast.success("User deleted successfully!");
          getUsers();
        } else {
          toast.error("Failed to delete user: " + response.statusText);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="text-center mb-4">User List</h5>
      {data.length > 0 ? (
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th style={{ width: '5%' }}>No.</th>
              <th style={{ width: '25%' }}>Name</th>
              <th style={{ width: '25%' }}>Email</th>
              <th style={{ width: '20%' }}>Contact</th>
              <th style={{ width: '25%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                  <Link to={`/view/${user.id}`} className="btn btn-outline-success btn-sm m-1">View</Link>
                  <Link to={`/edit/${user.id}`} className="btn btn-outline-primary btn-sm m-1">Edit</Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm m-1"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No users found or data is loading...</p>
      )}
    </div>
  );
};

export default Homepage;