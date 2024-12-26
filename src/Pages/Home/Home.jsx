import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';

function Home() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      console.error('Access token is missing');
      navigate('/login'); 
      return;
    }

    fetch('http://127.0.0.1:8000/api/auth/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Failed to fetch user data:', response.status);
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUserDetails(data); 
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login'); 
  };

  return (
    <MDBContainer 
      fluid 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f4f6f9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <MDBRow className="w-100">
        <MDBCol md="8" lg="6" xl="4" className="d-flex justify-content-center align-items-center">
          <MDBCard className="w-100 shadow-lg" style={{ borderRadius: '20px' }}>
            <MDBCardBody>
              <MDBTypography tag="h3" className="text-center mb-4 text-primary">Welcome, {userDetails ? userDetails.username : 'User'}</MDBTypography>
              
              {userDetails ? (
                <div className="text-center">
                  {userDetails.profile && (
                    <MDBCardImage 
                      src={`http://127.0.0.1:8000${userDetails.profile}`} 
                      alt="Profile" 
                      className="img-fluid rounded-circle mb-3" 
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                  )}
                  <p><strong>Email:</strong> {userDetails.email}</p>
                </div>
              ) : (
                <div className="text-center mb-4">
                  <p className="text-muted">Loading user details...</p>
                </div>
              )}
              
              <div className="d-flex justify-content-center">
                <MDBBtn onClick={handleLogout} color="danger" className="px-5" style={{ fontSize: '16px', padding: '10px 30px' }}>
                  Logout
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Home;
