import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Accept a 'currentMode' prop from the router
const AddEdit = ({ currentMode }) => { // Renamed 'mode' to 'currentMode' to avoid conflict with `editing` state
  const initialState = {
    name: '',
    email: '',
    contact: '',
  };

  const [user, setUser] = useState(initialState);
  const [editing, setEditing] = useState(false); // Still useful for distinguishing POST vs PUT
  const [viewing, setViewing] = useState(false); // New state for view mode

  const { name, email, contact } = user;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Determine mode based on the prop passed from Router
    if (currentMode === 'view') {
      setViewing(true);
      setEditing(false); // Ensure editing is false in view mode
    } else if (currentMode === 'edit') {
      setEditing(true);
      setViewing(false); // Ensure viewing is false in edit mode
    } else { // currentMode === 'add'
      setEditing(false);
      setViewing(false);
      setUser(initialState); // Clear form for add mode
    }

    // Fetch user data if in edit or view mode (i.e., if an ID exists)
    if (id) {
      getUser(id);
    } else {
      setUser(initialState); // Clear form if ID is not present (e.g., /add)
    }
  }, [id, currentMode]); // Re-run effect if ID or currentMode changes

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        toast.error("User not found or error fetching data.");
        navigate('/'); // Redirect if user doesn't exist
      }
    } catch (error) {
      console.error("Error fetching user for edit/view:", error);
      toast.error('Error fetching user data. Please try again.');
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    // Only allow input changes if not in view mode
    if (!viewing) {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // If in view mode, prevent submission (or make this a back button action)
    if (viewing) {
      navigate('/'); // In view mode, clicking submit could just go back
      return;
    }

    // Validation for Add/Edit modes
    if (!name || !email || !contact) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      if (editing) {
        const response = await axios.put(`http://localhost:5000/user/${id}`, user);
        if (response.status === 200) {
          toast.success('User updated successfully!');
          navigate('/');
        } else {
          toast.error("Failed to update user: " + response.statusText);
        }
      } else { // Adding new user
        const response = await axios.post('http://localhost:5000/user', user);
        if (response.status === 200) {
          toast.success("User added successfully!");
          navigate('/');
        } else {
          toast.error("Failed to add user: " + response.statusText);
        }
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
      toast.error('Failed to save user. Please try again.');
    }
  };

  // Determine the title based on the mode
  const formTitle = viewing ? 'User Details' : (editing ? 'Edit User' : 'Add New User');
  // Determine button text/visibility
  const buttonText = viewing ? 'Go Back' : (editing ? 'Update User' : 'Add User');

  return (
    <div className="container mt-4">
      <h5 className="text-center mb-4">{formTitle}</h5>
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
                readOnly={viewing} // Set to readOnly if in view mode
                required={!viewing} // Only required if not in view mode
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
                readOnly={viewing} // Set to readOnly if in view mode
                required={!viewing}
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
                readOnly={viewing} // Set to readOnly if in view mode
                required={!viewing}
              />
            </div>
            <button type="submit" className={`btn ${viewing ? 'btn-secondary' : 'btn-primary'}`}>
              {buttonText}
            </button>
            {viewing && ( // Add a separate back button if you want both "Go Back" and "Edit" functionality in view mode
              <button
                type="button"
                className="btn btn-info ms-2"
                onClick={() => navigate(`/edit/${id}`)}
              >
                Edit Details
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;