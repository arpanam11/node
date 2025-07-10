import React from 'react'; // Renamed `react` to `React` for clarity, though it works either way
import axios from 'axios';
import { useState, useEffect } from 'react';

// Component names should start with an uppercase letter (PascalCase)
const Homepage = () => {
  const [data, setData] = useState([]); // State to hold the fetched data

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    getUsers();
  }, []); // The empty dependency array ensures this runs only once on mount

  // Function to fetch users from the API
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      if (response.status === 200) {
        setData(response.data); // Update the state with the fetched data
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Log any errors
      // You might want to set an error state here to display a message to the user
    }
  }; // <-- Missing closing brace for getUsers function was here

  // The component's return statement, defining what it renders
  return (
    <div className="container mt-4"> {/* Added Bootstrap container and margin-top */}
      <h1 className="text-center mb-4">User List</h1> {/* Centered heading with margin-bottom */}

      {/* Conditional rendering: Show table if data exists, otherwise a message */}
      {data.length > 0 ? (
        <table className="table table-striped table-bordered table-hover"> {/* Bootstrap table classes */}
          <thead className="table-dark"> {/* Dark header background */}
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Action</th>
              {/* Add more table headers if your user objects have more properties */}
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id || index}> {/* Use user.id if available, otherwise index (less ideal for unique keys) */}
               
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                  <button type="button" class="btn btn-success">View</button>
                  <button type="button" class="btn btn-primary">Edit</button>
                  <button type="button" class="btn btn-danger">Delete</button>
                </td>
                {/* Add more table data cells for other properties */}
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