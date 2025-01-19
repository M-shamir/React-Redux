import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState(null); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('access');
    console.log("token",token);
    
    if(!token){
      navigate('/admin-login'); 
      return;
    }
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const token = localStorage.getItem('access');
    

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profile) {
      formData.append('profile', profile); 
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/users/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/admin-home'); 
      } else {
        const data = await response.json();
        setError(data.detail || 'Failed to add user');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">Add New User</h1>

      <form onSubmit={handleSubmit}>
        <MDBInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3"
          required
        />
        <MDBInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
          required
        />
        <MDBInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
          required
        />
        <div className="mb-3">
          <label htmlFor="profile">Profile Image</label>
          <input
            id="profile"
            type="file"
            onChange={(e) => setProfile(e.target.files[0])}
            className="form-control"
            accept="image/*"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="text-center">
          <MDBBtn type="submit" color="success">
            Add User
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}

export default AddUser;
