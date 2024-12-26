import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful', data);
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-3 my-5 h-custom d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <MDBRow className="w-100" style={{ maxWidth: '900px' }}>
        <MDBCol col='10' md='6' className="d-flex justify-content-center align-items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <form onSubmit={handleLogin}>
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="formControlLg"
              type="text"
              size="lg"
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-danger">{error}</p>}

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-4 px-5" size="lg">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{' '}
                <Link to='/signup' className="link-danger">Register</Link>
              </p>
              <MDBBtn
                className="mb-4 px-5 mt-3"
                size="lg"
                color="dark"
                onClick={() => navigate('/admin-login')}
              >
                Admin Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
