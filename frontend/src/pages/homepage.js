import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Homepage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewedUser, setViewedUser] = useState([]);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);

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
      toast.error('Error fetching users. Please check server is running.');
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        
        setViewedUser(response.data[0]); 
        setShowViewModal(true);       
      } else {
        toast.error("User not found or error fetching data.");
      }
    } catch (error) {
      console.error("Error fetching user for view modal:", error);
      toast.error('Error fetching user data for view. Please try again.');
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewedUser(null); 
  };

  const handleDeleteClick = (id) => {
    setUserToDeleteId(id);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (userToDeleteId) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/${userToDeleteId}`);
        if (response.status === 200) {
          toast.success("User deleted successfully!");
          getUsers(); 
        } else {
          toast.error("Failed to delete user: " + response.statusText);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error('Failed to delete user. Please try again.');
      } finally {
        setShowDeleteConfirmModal(false); 
        setUserToDeleteId(null); 
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setUserToDeleteId(null);
  };

  return (
    <div className="container mt-4">
      <h5 className="text-center mb-4">User List</h5>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add" className="btn btn-success">Add New User</Link>
      </div>

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
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm m-1"
                    onClick={() => handleView(user.id)}
                  >
                    View
                  </button>
                  <Link to={`/edit/${user.id}`} className="btn btn-outline-primary btn-sm m-1">Edit</Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm m-1"
                    onClick={() => handleDeleteClick(user.id)}
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

      {showViewModal && viewedUser && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-lg shadow-lg">
              <div className="modal-header bg-primary text-white rounded-t-lg">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCloseViewModal}></button>
              </div>
              <div className="modal-body p-4">
                <p><strong>ID:</strong> {viewedUser.id}</p>
                <p><strong>Name:</strong> {viewedUser.name}</p>
                <p><strong>Email:</strong> {viewedUser.email}</p>
                <p><strong>Contact:</strong> {viewedUser.contact}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseViewModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-lg shadow-lg">
              <div className="modal-header bg-warning text-dark rounded-t-lg">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body p-4">
                <p>Are you sure you want to delete this user?</p>
                <p>This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
