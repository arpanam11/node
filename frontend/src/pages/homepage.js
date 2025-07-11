import React from 'react'; 
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
const Homepage = () => {
  const [data, setData] = useState([]); 
  useEffect(() => {
    getUsers();
  }, []); 
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      if (response.status === 200) {
        setData(response.data); 
      }
    } catch (error) {
      console.error("Error fetching users:", error); 
    }
  }; 
  return (
    <div className="container mt-4"> 
      <h5 className="text-center mb-4">User List</h5> 
      {data.length > 0 ? (
        <table className="table table-striped table-bordered table-hover"> 
          <thead className="table-light"> 
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
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
                 <Link to={`/view/${user.id}`}><button type="button" class="btn btn-outline-success m-1">View</button></Link>
                  <Link to={`/edit/${user.id}`}><button type="button" class="btn btn-outline-primary m-1">Edit</button></Link>
                  <Link to={`/delete/${user.id}`}><button type="button" class="btn btn-outline-danger m-1">Delete</button></Link>
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
}; // <-- Missing closing brace for the Homepage component

export default Homepage; // Export the corrected component name