import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const ProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userPassword, setUserPassword] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('fullName');
    const uname = localStorage.getItem('username');
    const uemail = localStorage.getItem('uemail');
    const img = localStorage.getItem('profileImage');
    const password = localStorage.getItem('userPassword');
    if (name) setFullName(name);
    if (uname) setUsername(uname);
    if (uemail) setUserEmail(uemail);
    if (img) setProfileImage(img);
    if (password) setUserPassword(password);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
  };

  const handleSaveChanges = () => {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('username', username);
    localStorage.setItem('uemail', userEmail);
    localStorage.setItem('userPassword', userPassword);
    setAlertMessage('Profile updated successfully!');
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '90vh',
          marginTop: '-4px',
          color: '#fff',
        }}
      >
        {/* Profile Info Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Profile Picture */}
          <Avatar
            src={profileImage || 'https://via.placeholder.com/150'}
            alt="Profile Picture"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              marginRight: '20px',
            }}
          />

          {/* Profile Info */}
          <div
            style={{
              color: '#ddd',
              textAlign: 'left',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {fullName || 'Your Name'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {username || 'Your Username'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userEmail || 'Your Email'}
            </Typography>
          </div>
        </div>

        {/* Image Upload/Delete */}
        <div style={{ marginBottom: '20px' }}>
          <input
            accept="image/*"
            id="profile-image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <label htmlFor="profile-image-upload">
            <Button
              variant="text"
              component="span"
              sx={{
                color: '#007bff',
                '&:hover': { textDecoration: 'underline' },
                fontSize: '0.9rem',
              }}
            >
              Upload Image
            </Button>
          </label>
          {profileImage && (
            <Button
              variant="text"
              color="error"
              onClick={handleImageDelete}
              sx={{
                marginLeft: '10px',
                color: '#d9534f',
                '&:hover': { textDecoration: 'underline' },
                fontSize: '0.9rem',
              }}
            >
              Delete Image
            </Button>
          )}
        </div>

        {/* Editable Profile Fields */}
        <div style={{ width: '70%' }}>
          <TextField
            fullWidth
            label="Change Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{
              marginBottom: '20px', // Space between fields
              borderRadius: '20px', // Arc-like curve
              input: { color: '#ddd' },
              label: { color: '#ccc' },
              backgroundColor: '#333',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Arc-like curve
                '& fieldset': {
                  border: 'none', // Remove default border
                },
              },
              '& .MuiInputBase-input': {
                borderRadius: '20px', // Ensure input itself has arc
                padding: '10px',
              },
            }}
          />
          <TextField
            fullWidth
            label="Change Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              marginBottom: '20px', // Space between fields
              borderRadius: '20px', // Arc-like curve
              input: { color: '#ddd' },
              label: { color: '#ccc' },
              backgroundColor: '#333',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Arc-like curve
                '& fieldset': {
                  border: 'none', // Remove default border
                },
              },
              '& .MuiInputBase-input': {
                borderRadius: '20px', // Ensure input itself has arc
                padding: '10px',
              },
            }}
          />
          <TextField
            fullWidth
            label="Change Email"
            variant="outlined"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            sx={{
              marginBottom: '20px', // Space between fields
              borderRadius: '20px', // Arc-like curve
              input: { color: '#ddd' },
              label: { color: '#ccc' },
              backgroundColor: '#333',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Arc-like curve
                '& fieldset': {
                  border: 'none', // Remove default border
                },
              },
              '& .MuiInputBase-input': {
                borderRadius: '20px', // Ensure input itself has arc
                padding: '10px',
              },
            }}
          />
          <TextField
            fullWidth
            label="Change Password"
            variant="outlined"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            sx={{
              marginBottom: '20px', // Space between fields
              borderRadius: '20px', // Arc-like curve
              input: { color: '#ddd' },
              label: { color: '#ccc' },
              backgroundColor: '#333',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Arc-like curve
                '& fieldset': {
                  border: 'none', // Remove default border
                },
              },
              '& .MuiInputBase-input': {
                borderRadius: '20px', // Ensure input itself has arc
                padding: '10px',
              },
            }}
          />
        </div>

        <Button
          variant="contained"
          onClick={handleSaveChanges}
          sx={{
            backgroundColor: '#007bff',
            color: '#fff',
            '&:hover': { backgroundColor: '#0056b3' },
            width: 'auto',
            padding: '10px 20px',
            marginTop: '20px',
          }}
        >
          Save Changes
        </Button>

        {/* Snackbar Alert */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          message={alertMessage}
        >
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default ProfilePage;
