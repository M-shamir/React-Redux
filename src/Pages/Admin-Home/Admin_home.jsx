import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBContainer,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Admin_home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem('access');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/users/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('access');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (err) {
      setError(err.message);
    }
  };


  const handleEditUser = (userId) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };


  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/admin-login');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">Admin - User Management</h1>
      
    
      <div className="text-end mb-4">
        <MDBBtn color="danger" onClick={handleLogout}>
          Logout
        </MDBBtn>
      </div>

      <div className="mb-4 w-50 mx-auto">
        <MDBInput
          label="Search users"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by username or email"
          className="mb-3 shadow-sm"
        />
      </div>

      <MDBTable striped bordered hover responsive className="shadow-lg">
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <MDBBtn
                  size="sm"
                  color="primary"
                  onClick={() => handleEditUser(user.id)}
                  className="me-2"
                >
                  Edit
                </MDBBtn>
                <MDBBtn
                  size="sm"
                  color="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default Admin_home;
