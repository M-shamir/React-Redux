import React, { useState, useEffect } from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    profile: null, // For profile image
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    const token = localStorage.getItem('access');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          ...data,
          profile: null, // Keep profile field null initially
        });
      } else {
        throw new Error(data.detail || 'Failed to fetch user details');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file upload for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((prevState) => ({
      ...prevState,
      profile: file,
    }));
  };

  // Save user details
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('access');

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    if (user.profile) {
      formData.append('profile', user.profile); // Add profile image if uploaded
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send as FormData
      });

      if (response.ok) {
        navigate('/admin-home');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save user details');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <h3 className="text-center">Edit User</h3>
              <form onSubmit={handleSave}>
                <MDBInput
                  label="Username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="mb-4"
                  required
                />
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="mb-4"
                  required
                />
                <div className="mb-4">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="text-center">
                  <MDBBtn type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </MDBBtn>
                  <MDBBtn
                    type="button"
                    color="secondary"
                    className="ms-3"
                    onClick={() => navigate('/admin-home')}
                  >
                    Cancel
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default EditUser;
