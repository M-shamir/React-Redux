import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      navigate('/admin-home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login Successful:', data);
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        navigate('/admin-home');
      } else {
        throw new Error(data.detail || 'Login failed');
      }
    } catch (err) {
      setError("Not correct username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MDBContainer className="p-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
        <MDBCard className="shadow-lg w-100" style={{ maxWidth: '450px' }}>
          <MDBCardBody className="p-5">
            <MDBCardTitle className="text-center mb-4">
              <h3>Admin Login</h3>
            </MDBCardTitle>
            <form onSubmit={handleLogin}>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="form1"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="rounded-pill"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-pill"
              />

              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

              <MDBBtn className="mb-4 w-100 rounded-pill" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </MDBBtn>
     
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default AdminLogin;
