import {useState} from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
   
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profile) formData.append('profile', profile);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/signup/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful', data);
        
      
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        
        
        navigate('/');
      } else {
        const errorData = await response.json();
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-3 my-5 h-custom d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <MDBRow className="w-100" style={{ maxWidth: '900px' }}>
        <MDBCol col="10" md="6" className="d-flex justify-content-center align-items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="formControlUsername"
            type="text"
            size="lg"
            onChange={(e) => setUsername(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formControlEmail"
            type="email"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlPassword"
            type="password"
            size="lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-4">
            <label htmlFor="formControlFile" className="form-label">
              Upload Profile Picture
            </label>
            <input
              className="form-control form-control-lg"
              id="formControlFile"
              type="file"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" onClick={handleSignup}>
              Register
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              You have an account?{' '}
              <Link to="/login" className="link-danger">Login</Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
