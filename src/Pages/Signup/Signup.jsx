import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.profile && data.profile[0]) formData.append('profile', data.profile[0]);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/signup/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Signup successful', responseData);

        localStorage.setItem('access_token', responseData.access_token);
        localStorage.setItem('refresh_token', responseData.refresh_token);

        navigate('/');
      } else {
        const errorData = await response.json();
        setError('api', { message: errorData.message || 'Signup failed. Please try again.' });
      }
    } catch (err) {
      setError('api', { message: 'An error occurred. Please try again.' });
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
            alt="Sample"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            type="text"
            size="lg"
            {...register('username', { required: 'Username is required.' })}
          />
          {errors.username && <p className="text-danger">{errors.username.message}</p>}

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            type="email"
            size="lg"
            {...register('email', {
              required: 'Email is required.',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address.' },
            })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}

          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            type="password"
            size="lg"
            {...register('password', {
              required: 'Password is required.',
              minLength: { value: 6, message: 'Password must be at least 6 characters.' },
            })}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}

          <div className="mb-4">
            <label htmlFor="formControlFile" className="form-label">
              Upload Profile Picture
            </label>
            <input
              className="form-control form-control-lg"
              id="formControlFile"
              type="file"
              {...register('profile')}
            />
          </div>
          {errors.profile && <p className="text-danger">{errors.profile.message}</p>}

          {errors.api && <p className="text-danger">{errors.api.message}</p>}

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" onClick={handleSubmit(handleSignup)}>
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
