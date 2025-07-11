import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEdit = () => {
  const initialState = {
    name: '',
    email: '',
    contact: '',
  };

  const [user, setUser] = useState(initialState);
  const [editing, setEditing] = useState(false);

  const { name, email, contact } = user;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditing(true);
      getUser(id);
    } else {
      setEditing(false);
      setUser(initialState);
    }
  }, [id]);

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user for edit:", error);
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }; // <-- THIS CLOSING BRACE WAS MISSING!

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (editing) {
        const response = await axios.put(`http://localhost:5000/user/${id}`, user);
        if (response.status === 200) {
          alert('User updated successfully!');
          navigate('/');
        }
      } else {
        const response = await axios.post('http://localhost:5000/user', user);
        if (response.status === 200) {
          alert('User added successfully!');
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
      alert('Failed to save user. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="text-center mb-4">{editing ? 'Edit User' : 'Add New User'}</h5>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                value={contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editing ? 'Update User' : 'Add User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}; // <-- THIS CLOSING BRACE FOR THE COMPONENT IS ALSO IMPORTANT

export default AddEdit;