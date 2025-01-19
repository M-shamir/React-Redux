import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { setUserDetails } from '../../authSlice';

const EditProfile = () => {
    const { access, userDetails } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        profile: null,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null); 

    useEffect(() => {
         if (!access) {
            navigate('/login');
        }
        if (userDetails) {
            setFormData({
                username: userDetails.username,
                email: userDetails.email,
            });
        }
    }, [userDetails, access, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        fetch('http://127.0.0.1:8000/api/auth/profile/edit/', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access}`,
            },
            body: data,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
                return response.json();
            })
            .then((data) => {
                dispatch(setUserDetails(data));
                navigate('/');
            })
            .catch((err) => {
                setError(err.message);
                console.error('Error updating profile:', err);
            });    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <h3 className="mb-4 text-center">Edit Profile</h3>
                        <MDBInput
                            className="mb-3"
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <MDBInput
                            className="mb-3"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <MDBInput
                            type="file"
                            className="mb-3"
                            name="profile"
                            onChange={handleChange}
                        />
                        {error && (
                            <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
                        )}
                        <MDBBtn type="submit" block color="primary">
                            Save Changes
                        </MDBBtn>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default EditProfile;
