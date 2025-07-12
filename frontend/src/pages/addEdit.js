import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddEditUser = () => { // Renamed from AddUser to AddEditUser
  const initialState = {
    name: '',
    email: '',
    contact: '',
  };

  const [user, setUser] = useState(initialState);
  const { name, email, contact } = user;

  const navigate = useNavigate();
  const { id } = useParams(); // Get the 'id' from the URL parameters

  // useEffect to fetch user data if 'id' is present (for editing)
  useEffect(() => {
    if (id) { // Only fetch if an ID exists in the URL (means we are in edit mode)
      const getSingleUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/user/${id}`);
          if (response.status === 200) {
            // Set the form state with the fetched user data
            setUser(response.data[0]); // Assuming response.data is the single user object
          } else {
            toast.error("Failed to fetch user data for editing.");
          }
        } catch (error) {
          console.error("Error fetching single user:", error);
          toast.error('Error fetching user data. Please check server is running.');
        }
      };
      getSingleUser();
    } else {
      // If no ID, ensure the form is cleared for adding a new user
      setUser(initialState);
    }
  }, [id]); // Rerun this effect whenever the 'id' parameter changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      if (id) {
        // EDIT existing user
        const response = await axios.put(`http://localhost:5000/user/${id}`, user);
        if (response.status === 200) {
          toast.success("User updated successfully!");
          navigate('/');
        } else {
          toast.error("Failed to update user: " + response.statusText);
        }
      } else {
        // ADD new user
        const response = await axios.post('http://localhost:5000/user', user);
        if (response.status === 200) {
          toast.success("User added successfully!");
          navigate('/');
        } else {
          toast.error("Failed to add user: " + response.statusText);
        }
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error('Failed to save user. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="text-center mb-4">{id ? 'Edit User' : 'Add New User'}</h5>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            {/* Name Input Field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name} // This will be pre-filled
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Email Input Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email} // This will be pre-filled
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Contact Input Field */}
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                value={contact} // This will be pre-filled
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              {id ? 'Update User' : 'Add User'} {/* Button text changes */}
            </button>
            <Link to="/" className="btn btn-secondary ms-2">Cancel</Link> {/* Add a cancel button */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditUser; // Export the new component name